import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Factory3D({
  isNightMode,
  setIsNightMode,
  selectedTarget,
  setSelectedTarget,
  onRobotPickEvent
}) {
  const mountRef = useRef(null);
  const [cameraView, setCameraView] = useState('ISOMETRIC'); // ISOMETRIC | FOLLOW_AMR | OVERVIEW | SHELF_BAY
  const [robotStatus, setRobotStatus] = useState({
    mode: 'PATROLLING',
    target: 'Zone A - Chemical Rack 1',
    battery: 88,
    speed: '0.8 m/s',
    pickedCount: 14,
    nlosAlert: false
  });
  const [fallenBoxActive, setFallenBoxActive] = useState(false);
  const [showCCTVPIP, setShowCCTVPIP] = useState(true);

  const sceneStateRef = useRef({
    robot: null,
    radarWave: null,
    radarLight: null,
    ceilingLights: [],
    fallenBoxMesh: null,
    targetPosition: new THREE.Vector3(0, 0, 0),
    isMoving: true,
    pathIndex: 0,
    armMesh: null,
    waypoints: [
      new THREE.Vector3(-6, 0.4, -4),
      new THREE.Vector3(-6, 0.4, 4),
      new THREE.Vector3(0, 0.4, 4),
      new THREE.Vector3(0, 0.4, -4),
      new THREE.Vector3(6, 0.4, -4),
      new THREE.Vector3(6, 0.4, 4),
    ],
    camera: null,
    controls: {
      isDragging: false,
      prevMouse: { x: 0, y: 0 },
      spherical: { radius: 28, theta: Math.PI / 4, phi: Math.PI / 3 },
      target: new THREE.Vector3(0, 0, 0)
    }
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isNightMode ? 0x050811 : 0xd8e2ec);
    scene.fog = new THREE.FogExp2(isNightMode ? 0x050811 : 0xd8e2ec, 0.015);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(20, 18, 20);
    camera.lookAt(0, 0, 0);
    sceneStateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- 2. LIGHTING (INDUSTRIAL FACTORY) ---
    const ambientLight = new THREE.AmbientLight(
      isNightMode ? 0x0a1428 : 0xffffff,
      isNightMode ? 0.3 : 0.75
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, isNightMode ? 0.15 : 1.2);
    dirLight.position.set(25, 40, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 120;
    const d = 25;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // Factory Overhead High-Bay Lamps
    const ceilingLights = [];
    const lampPositions = [
      [-8, 12, -6], [0, 12, -6], [8, 12, -6],
      [-8, 12, 6],  [0, 12, 6],  [8, 12, 6]
    ];
    lampPositions.forEach(([lx, ly, lz]) => {
      const pLight = new THREE.PointLight(0xfff0dd, isNightMode ? 0.05 : 0.8, 22);
      pLight.position.set(lx, ly, lz);
      pLight.castShadow = !isNightMode;
      scene.add(pLight);
      ceilingLights.push(pLight);

      // Lamp fixture mesh
      const fixtureGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.3, 16);
      const fixtureMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 });
      const fixture = new THREE.Mesh(fixtureGeo, fixtureMat);
      fixture.position.set(lx, ly, lz);
      scene.add(fixture);
    });
    sceneStateRef.current.ceilingLights = ceilingLights;

    // --- 3. FACTORY FLOOR & YELLOW GUIDELINES ---
    // Floor
    const floorGeo = new THREE.PlaneGeometry(48, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x121722 : 0x8f9ba8,
      roughness: 0.4,
      metalness: 0.15
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Factory Walls
    const wallMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x0b111b : 0xadb8c4,
      roughness: 0.6
    });
    // Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(48, 14, 0.5), wallMat);
    backWall.position.set(0, 7, -18);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 14, 36), wallMat);
    leftWall.position.set(-24, 7, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Yellow Floor Walkways & Guidelines (Like real factory photo)
    const createFloorLine = (x, z, w, h) => {
      const lineGeo = new THREE.PlaneGeometry(w, h);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xffcc00, side: THREE.DoubleSide });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, 0.02, z);
      scene.add(line);
    };

    // Main central aisle lines
    createFloorLine(0, 0, 0.25, 30);
    createFloorLine(-6, 0, 0.15, 30);
    createFloorLine(6, 0, 0.15, 30);
    createFloorLine(0, 0, 18, 0.2);
    createFloorLine(0, -10, 18, 0.2);
    createFloorLine(0, 10, 18, 0.2);

    // Overhead Yellow Crane Gantry Structure (Like factory photo)
    const craneBeamGeo = new THREE.BoxGeometry(46, 0.8, 1.2);
    const craneMat = new THREE.MeshStandardMaterial({ color: 0xeb9800, roughness: 0.3, metalness: 0.6 });
    const craneBeam = new THREE.Mesh(craneBeamGeo, craneMat);
    craneBeam.position.set(0, 11, -4);
    craneBeam.castShadow = true;
    scene.add(craneBeam);

    // --- 4. WAREHOUSE STORAGE RACKS & CHEMICAL SHELVES ---
    const rackGroup = new THREE.Group();
    const rackLocations = [
      { x: -11, z: -8, label: 'ZONE A (REAGENTS)' },
      { x: -11, z: 0, label: 'ZONE A (CHEMICALS)' },
      { x: -11, z: 8, label: 'ZONE A (SOLVENTS)' },
      { x: 11, z: -8, label: 'ZONE B (PHARMA)' },
      { x: 11, z: 0, label: 'ZONE B (VACCINE)' },
      { x: 11, z: 8, label: 'ZONE B (CRYO)' },
    ];

    const metalFrameMat = new THREE.MeshStandardMaterial({ color: 0x1d4e89, metalness: 0.7, roughness: 0.3 });
    const shelfWoodMat = new THREE.MeshStandardMaterial({ color: 0x9c7a5b, roughness: 0.8 });

    rackLocations.forEach((rackLoc) => {
      const rack = new THREE.Group();
      rack.position.set(rackLoc.x, 0, rackLoc.z);

      // 4 Upright Pillars
      const pillarGeo = new THREE.BoxGeometry(0.25, 6, 0.25);
      [[-2, -1], [2, -1], [-2, 1], [2, 1]].forEach(([px, pz]) => {
        const pillar = new THREE.Mesh(pillarGeo, metalFrameMat);
        pillar.position.set(px, 3, pz);
        pillar.castShadow = true;
        rack.add(pillar);
      });

      // 3 Shelf Levels
      [1.5, 3.2, 4.8].forEach((levelY) => {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.15, 2.2), shelfWoodMat);
        plank.position.set(0, levelY, 0);
        plank.castShadow = true;
        plank.receiveShadow = true;
        rack.add(plank);

        // Add chemical containers & boxes on shelves
        for (let bx = -1.5; bx <= 1.5; bx += 0.8) {
          const isBottle = (bx + levelY) % 2 === 0;
          let itemMesh;
          if (isBottle) {
            const bottleGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.5, 12);
            const bottleMat = new THREE.MeshStandardMaterial({
              color: levelY > 3 ? 0x00e676 : 0x00b0ff,
              roughness: 0.1,
              metalness: 0.1,
              transparent: true,
              opacity: 0.85
            });
            itemMesh = new THREE.Mesh(bottleGeo, bottleMat);
            itemMesh.position.set(bx, levelY + 0.3, (Math.random() - 0.5) * 0.5);
          } else {
            const boxGeo = new THREE.BoxGeometry(0.55, 0.45, 0.6);
            const boxMat = new THREE.MeshStandardMaterial({
              color: 0xc28e53,
              roughness: 0.7
            });
            itemMesh = new THREE.Mesh(boxGeo, boxMat);
            itemMesh.position.set(bx, levelY + 0.28, (Math.random() - 0.5) * 0.4);
          }
          itemMesh.castShadow = true;
          itemMesh.receiveShadow = true;
          rack.add(itemMesh);
        }
      });

      rackGroup.add(rack);
    });
    scene.add(rackGroup);

    // Industrial Machines & Workbenches (From Real Photo Reference)
    const machineMat = new THREE.MeshStandardMaterial({ color: 0x2b4c6f, roughness: 0.4, metalness: 0.5 });
    const machinePositions = [
      { x: -18, z: -10, w: 4, h: 3.5, d: 3 },
      { x: -18, z: 0, w: 3.5, h: 4, d: 3.5 },
      { x: -18, z: 10, w: 4, h: 2.8, d: 3 },
      { x: 18, z: -10, w: 3.5, h: 2.5, d: 3 },
      { x: 18, z: 6, w: 5, h: 3, d: 3.5 },
    ];
    machinePositions.forEach((m) => {
      const machine = new THREE.Mesh(new THREE.BoxGeometry(m.w, m.h, m.d), machineMat);
      machine.position.set(m.x, m.h / 2, m.z);
      machine.castShadow = true;
      machine.receiveShadow = true;
      scene.add(machine);

      // Machine control panel screen
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.8, 0.6),
        new THREE.MeshBasicMaterial({ color: 0x00e676 })
      );
      screen.position.set(m.x + m.w / 2 + 0.02, m.h - 0.6, m.z);
      screen.rotation.y = Math.PI / 2;
      scene.add(screen);
    });

    // --- 5. ECO-VISION ROBOT (AMR UNIT) ---
    const robotGroup = new THREE.Group();
    robotGroup.position.set(-6, 0.4, -4);

    // Chassis Base
    const chassisGeo = new THREE.BoxGeometry(1.6, 0.4, 1.2);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x111c26,
      metalness: 0.8,
      roughness: 0.2
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.castShadow = true;
    robotGroup.add(chassis);

    // Glowing Neon Bumper Edges
    const bumperGeo = new THREE.BoxGeometry(1.65, 0.08, 1.25);
    const bumperMat = new THREE.MeshBasicMaterial({ color: 0x00e676 });
    const bumper = new THREE.Mesh(bumperGeo, bumperMat);
    bumper.position.y = -0.12;
    robotGroup.add(bumper);

    // Wheels (4 Rubber Wheels)
    const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.15, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    [[-0.6, -0.15, -0.6], [0.6, -0.15, -0.6], [-0.6, -0.15, 0.6], [0.6, -0.15, 0.6]].forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      wheel.castShadow = true;
      robotGroup.add(wheel);
    });

    // Robot Upper Body / Payload Tray
    const trayGeo = new THREE.BoxGeometry(1.2, 0.35, 0.9);
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x223344, metalness: 0.5 });
    const tray = new THREE.Mesh(trayGeo, trayMat);
    tray.position.y = 0.35;
    tray.castShadow = true;
    robotGroup.add(tray);

    // Robot Robotic Arm Mast
    const armMast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12),
      new THREE.MeshStandardMaterial({ color: 0x00b0ff, metalness: 0.8 })
    );
    armMast.position.set(0.3, 0.75, 0);
    robotGroup.add(armMast);

    const gripper = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.1, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x00e676 })
    );
    gripper.position.set(0.3, 1.15, 0);
    robotGroup.add(gripper);
    sceneStateRef.current.armMesh = gripper;

    // 360 mmWave Radar & LiDAR Sensor Dome
    const domeGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.15, 16);
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x00e676, metalness: 0.9, roughness: 0.1 });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.set(-0.35, 0.6, 0);
    robotGroup.add(dome);

    // 4K Vision Camera Sensor Mount
    const camMount = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.15, 0.25),
      new THREE.MeshStandardMaterial({ color: 0xff1744 })
    );
    camMount.position.set(0.8, 0.25, 0);
    robotGroup.add(camMount);

    // AMR Headlights (Spotlights illuminating warehouse floor)
    const headlight = new THREE.SpotLight(0xdffff4, isNightMode ? 3.5 : 1.2, 14, Math.PI / 4, 0.4);
    headlight.position.set(0.85, 0.25, 0);
    headlight.target.position.set(5, 0, 0);
    robotGroup.add(headlight);
    robotGroup.add(headlight.target);

    // Glowing mmWave Radar Pulse Wave Cone (Hologram Visualizer)
    const radarWaveGeo = new THREE.RingGeometry(0.5, 4.5, 32);
    const radarWaveMat = new THREE.MeshBasicMaterial({
      color: 0x00e676,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });
    const radarWave = new THREE.Mesh(radarWaveGeo, radarWaveMat);
    radarWave.rotation.x = -Math.PI / 2;
    radarWave.position.set(0, 0.1, 0);
    robotGroup.add(radarWave);
    sceneStateRef.current.radarWave = radarWave;

    scene.add(robotGroup);
    sceneStateRef.current.robot = robotGroup;

    // --- 6. INTERACTIVE ORBIT CONTROLS VIA MOUSE ---
    const s = sceneStateRef.current.controls.spherical;
    const updateCameraFromSpherical = () => {
      camera.position.x = sceneStateRef.current.controls.target.x + s.radius * Math.sin(s.phi) * Math.sin(s.theta);
      camera.position.y = sceneStateRef.current.controls.target.y + s.radius * Math.cos(s.phi);
      camera.position.z = sceneStateRef.current.controls.target.z + s.radius * Math.sin(s.phi) * Math.cos(s.theta);
      camera.lookAt(sceneStateRef.current.controls.target);
    };
    updateCameraFromSpherical();

    const handleMouseDown = (e) => {
      sceneStateRef.current.controls.isDragging = true;
      sceneStateRef.current.controls.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!sceneStateRef.current.controls.isDragging) return;
      const dx = e.clientX - sceneStateRef.current.controls.prevMouse.x;
      const dy = e.clientY - sceneStateRef.current.controls.prevMouse.y;

      s.theta -= dx * 0.006;
      s.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, s.phi - dy * 0.006));

      sceneStateRef.current.controls.prevMouse = { x: e.clientX, y: e.clientY };
      updateCameraFromSpherical();
    };

    const handleMouseUp = () => {
      sceneStateRef.current.controls.isDragging = false;
    };

    const handleWheel = (e) => {
      s.radius = Math.max(8, Math.min(55, s.radius + e.deltaY * 0.03));
      updateCameraFromSpherical();
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel);

    // --- 7. ANIMATION LOOP ---
    let animFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Pulse Radar Wave animation
      if (sceneStateRef.current.radarWave) {
        const scale = 1 + (Math.sin(elapsed * 4) + 1) * 0.35;
        sceneStateRef.current.radarWave.scale.set(scale, scale, 1);
        sceneStateRef.current.radarWave.material.opacity = 0.2 + Math.cos(elapsed * 4) * 0.2;
      }

      // Robot Arm micro-idle animation
      if (sceneStateRef.current.armMesh) {
        sceneStateRef.current.armMesh.position.y = 1.15 + Math.sin(elapsed * 3) * 0.04;
      }

      // Autonomous AMR Navigation Along Waypoints
      const robot = sceneStateRef.current.robot;
      const waypoints = sceneStateRef.current.waypoints;
      let pathIdx = sceneStateRef.current.pathIndex;

      if (robot && waypoints.length > 0) {
        const targetWp = waypoints[pathIdx];
        const dir = new THREE.Vector3().subVectors(targetWp, robot.position);
        const dist = dir.length();

        if (dist > 0.15) {
          dir.normalize();
          robot.position.addScaledVector(dir, 2.2 * delta);

          // Rotate robot smoothly towards travel direction
          const targetAngle = Math.atan2(-dir.z, dir.x);
          robot.rotation.y = targetAngle;
        } else {
          // Reached waypoint -> move to next
          sceneStateRef.current.pathIndex = (pathIdx + 1) % waypoints.length;
        }

        // Update camera position if in FOLLOW_AMR view
        if (cameraView === 'FOLLOW_AMR') {
          sceneStateRef.current.controls.target.copy(robot.position);
          updateCameraFromSpherical();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isNightMode, cameraView]);

  // Trigger Spawning a Fallen Box Anomaly on Floor
  const handleToggleFallenBox = () => {
    setFallenBoxActive(!fallenBoxActive);
    setRobotStatus((prev) => ({
      ...prev,
      nlosAlert: !fallenBoxActive,
      target: !fallenBoxActive ? '⚠️ ANOMALY: Fallen Box at Aisle 2' : 'Zone A - Chemical Rack 1'
    }));
  };

  const handlePickChemical = (rackName) => {
    setRobotStatus((prev) => ({
      ...prev,
      mode: 'DISPATCH_PICK',
      target: rackName,
      pickedCount: prev.pickedCount + 1
    }));
    if (onRobotPickEvent) onRobotPickEvent(rackName);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 3D Three.js WebGL Container */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {/* TOP FLOATING BRAND & HUD BAR */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 100
      }}>
        {/* Brand */}
        <div className="glass-panel" style={{
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'auto',
          background: 'rgba(8, 14, 22, 0.85)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--tech-cyan), var(--eco-green))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            🤖
          </div>
          <div>
            <h1 style={{
              fontSize: '1.1rem',
              fontWeight: '800',
              letterSpacing: '0.06em',
              background: 'linear-gradient(90deg, #fff, var(--eco-green))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              ECO-VISION 3D
            </h1>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              AUTONOMOUS FACTORY DIGITAL TWIN
            </div>
          </div>
        </div>

        {/* Camera Views Preset Switcher */}
        <div className="glass-panel" style={{
          padding: '6px 10px',
          display: 'flex',
          gap: '6px',
          pointerEvents: 'auto',
          background: 'rgba(8, 14, 22, 0.85)'
        }}>
          {[
            { id: 'ISOMETRIC', label: '📐 ISOMETRIC' },
            { id: 'FOLLOW_AMR', label: '🤖 FOLLOW AMR' },
            { id: 'OVERVIEW', label: '🏭 OVERVIEW' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setCameraView(v.id)}
              style={{
                background: cameraView === v.id ? 'var(--eco-green)' : 'rgba(255,255,255,0.05)',
                color: cameraView === v.id ? '#000' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 10px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Day / Night Sleep Mode Toggle */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className={`btn-cyber ${isNightMode ? 'btn-cyber-primary' : ''}`}
            style={{ fontSize: '0.8rem', padding: '8px 14px' }}
          >
            {isNightMode ? '🌙 NIGHT SLEEP (85% SAVED)' : '☀️ DAY SHIFT LIGHTS ON'}
          </button>
        </div>
      </div>

      {/* FLOATING MINI CCTV PIP (PICTURE-IN-PICTURE) AT BOTTOM-RIGHT */}
      {showCCTVPIP && (
        <div className="glass-panel" style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          width: '280px',
          padding: '12px',
          zIndex: 100,
          background: 'rgba(6, 12, 20, 0.9)',
          border: '1px solid var(--border-cyan)',
          boxShadow: '0 0 25px rgba(0, 176, 255, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="status-pulse red"></span>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#fff', letterSpacing: '0.04em' }}>
                AMR ONBOARD CCTV [4K HDR]
              </span>
            </div>
            <button
              onClick={() => setShowCCTVPIP(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              ✕
            </button>
          </div>

          {/* Simulated Front-Cam Live Screen */}
          <div style={{
            height: '140px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #0a1724, #040910)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 230, 118, 0.3)'
          }}>
            <div className="scanline-overlay"></div>

            {/* AI Object Bounding Box in front cam */}
            <div style={{
              width: '80px',
              height: '70px',
              border: robotStatus.nlosAlert ? '2px solid var(--danger-red)' : '2px solid var(--eco-green)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2px',
              boxShadow: robotStatus.nlosAlert ? '0 0 10px var(--danger-red)' : '0 0 10px var(--eco-green)'
            }}>
              <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: robotStatus.nlosAlert ? 'var(--danger-red)' : 'var(--eco-green)' }}>
                {robotStatus.nlosAlert ? 'OBSTACLE [98%]' : 'CLEAR_PATH [99%]'}
              </span>
              <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                60GHz NLOS
              </span>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '6px',
              left: '8px',
              fontSize: '0.62rem',
              color: 'var(--eco-green)',
              fontFamily: 'var(--font-mono)'
            }}>
              ● REC 5-10s SNIPPET BUFFER
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM-LEFT INTERACTIVE 3D ACTION BAR */}
      <div className="glass-panel" style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        padding: '14px 18px',
        zIndex: 100,
        background: 'rgba(8, 14, 22, 0.9)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Robot Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(0, 230, 118, 0.15)',
            border: '2px solid var(--eco-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            ⚡
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.92rem', color: '#fff' }}>
                SENTINEL AMR-01
              </span>
              <span className="hud-badge hud-badge-green" style={{ fontSize: '0.65rem' }}>
                {robotStatus.mode}
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Target: {robotStatus.target} • Battery: {robotStatus.battery}% • Picks: {robotStatus.pickedCount}
            </div>
          </div>
        </div>

        <div style={{ width: '1px', height: '32px', background: 'var(--border-subtle)' }}></div>

        {/* Quick 3D Demo Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handlePickChemical('Zone A - Chemical Rack 1')}
            className="btn-cyber btn-cyber-primary"
            style={{ fontSize: '0.78rem', padding: '8px 12px' }}
          >
            🧪 DISPATCH PICK (ZONE A)
          </button>

          <button
            onClick={handleToggleFallenBox}
            className="btn-cyber"
            style={{
              fontSize: '0.78rem',
              padding: '8px 12px',
              borderColor: fallenBoxActive ? 'var(--danger-red)' : 'var(--warning-amber)',
              color: fallenBoxActive ? 'var(--danger-red)' : 'var(--warning-amber)'
            }}
          >
            {fallenBoxActive ? '⚠️ ANOMALY DETECTED!' : '⚡ SIMULATE FALLEN BOX'}
          </button>
        </div>
      </div>

      {/* 3D Drag & Rotate Navigation Hint */}
      <div style={{
        position: 'absolute',
        top: '74px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.6)',
        padding: '4px 14px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        pointerEvents: 'none'
      }}>
        🖱️ Drag mouse to rotate 3D factory • Scroll to zoom
      </div>
    </div>
  );
}

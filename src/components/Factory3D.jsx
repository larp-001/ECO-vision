import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ToolDrawer from './ToolDrawer';
import ObjectInspector from './ObjectInspector';
import ProjectHeroHeader from './ProjectHeroHeader';

// Crisp, Minimalist SVG Icons (No Emojis)
const Icons = {
  Orbit: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M3.6 9h16.8"></path>
      <path d="M3.6 15h16.8"></path>
      <path d="M12 3a14 14 0 0 0 0 18"></path>
      <path d="M12 3a14 14 0 0 1 0 18"></path>
    </svg>
  ),
  Pan: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5 9 2 12 5 15"></polyline>
      <polyline points="9 5 12 2 15 5"></polyline>
      <polyline points="15 19 12 22 9 19"></polyline>
      <polyline points="19 9 22 12 19 15"></polyline>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <line x1="12" y1="2" x2="12" y2="22"></line>
    </svg>
  ),
  CenterFocus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M3 9V5a2 2 0 0 1 2-2h4"></path>
      <path d="M19 9V5a2 2 0 0 0-2-2h-4"></path>
      <path d="M3 15v4a2 2 0 0 0 2 2h4"></path>
      <path d="M19 15v4a2 2 0 0 1-2 2h-4"></path>
    </svg>
  ),
  Storage: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Parcel: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <line x1="10" y1="4" x2="10" y2="10"></line>
      <line x1="14" y1="4" x2="14" y2="10"></line>
    </svg>
  ),
  Machine: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
      <path d="M12 2v4M12 18v4"></path>
    </svg>
  ),
  Charging: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Pin: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Play: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"></polyline>
      <polyline points="23 20 23 14 17 14"></polyline>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Width: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 8 21 12 17 16"></polyline>
      <polyline points="7 8 3 12 7 16"></polyline>
      <line x1="3" y1="12" x2="21" y2="12"></line>
    </svg>
  ),
  Depth: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 17 12 21 16 17"></polyline>
      <polyline points="8 7 12 3 16 7"></polyline>
      <line x1="12" y1="3" x2="12" y2="21"></line>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  Save: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
};

// Precise 2D AABB collision check with Rotation support (Prevent overlapping/stacking)
const checkObjectOverlap = (x, z, width, depth, currentObjects, ignoreId = null, rotation = 0) => {
  const isRotated = Math.round((rotation || 0) / (Math.PI / 2)) % 2 !== 0;
  const effW = isRotated ? depth : width;
  const effD = isRotated ? width : depth;

  for (const obj of currentObjects) {
    if (ignoreId && obj.id === ignoreId) continue;
    const objRotated = Math.round((obj.rotation || 0) / (Math.PI / 2)) % 2 !== 0;
    const objW = objRotated ? (obj.depth || 2.0) : (obj.width || 4.0);
    const objD = objRotated ? (obj.width || 4.0) : (obj.depth || 2.0);

    // Strict non-overlapping distance
    const minSpanX = (effW + objW) / 2 - 0.05;
    const minSpanZ = (effD + objD) / 2 - 0.05;

    if (Math.abs(x - obj.x) < minSpanX && Math.abs(z - obj.z) < minSpanZ) {
      return true; // Overlap detected!
    }
  }
  return false;
};

// Check if object is inside grid boundary with Rotation support
const checkOutOfBounds = (x, z, width, depth, gridSize, rotation = 0) => {
  const isRotated = Math.round((rotation || 0) / (Math.PI / 2)) % 2 !== 0;
  const effW = isRotated ? depth : width;
  const effD = isRotated ? width : depth;
  const halfW = gridSize.width / 2;
  const halfD = gridSize.depth / 2;
  return (
    x - effW / 2 < -halfW + 0.4 ||
    x + effW / 2 > halfW - 0.4 ||
    z - effD / 2 < -halfD + 0.4 ||
    z + effD / 2 > halfD - 0.4
  );
};

// Accurate Grid Tile Snapping: Aligns outer edges 100% with the 2m grid lines
const snapCoordinate = (coord, size) => {
  const cells = Math.max(1, Math.round(size / 2));
  if (cells % 2 === 1) {
    // Odd number of cells (1 cell = 2m, 3 cells = 6m, 5 cells = 10m):
    // Center falls at odd integer: ..., -3, -1, 1, 3, 5, ...
    return Math.floor(coord / 2) * 2 + 1;
  } else {
    // Even number of cells (2 cells = 4m, 4 cells = 8m):
    // Center falls at even grid line: ..., -4, -2, 0, 2, 4, ...
    return Math.round(coord / 2) * 2;
  }
};

// Initial Authentic Factory Layout (4 Core Types: Racks, Parcels, Charger, Pin)
const INITIAL_DEMO_OBJECTS = [
  { id: 'DEMO_RACK_1', name: 'ชั้นวางสินค้าหลัก Bay-A01', type: 'STORAGE_RACK', x: -13, z: -9, width: 6.0, height: 5.5, depth: 2.0, isPinned: false },
  { id: 'DEMO_CHARGER', name: 'แท่นชาร์จหุ่นยนต์ Dock-01', type: 'CHARGING_STATION', x: -15, z: 3, width: 2.0, height: 2.2, depth: 2.0, isPinned: true },
  { id: 'DEMO_PARCEL_1', name: 'กองพาเลทสินค้า Pallet-01', type: 'PARCEL_BOX', x: -15, z: 9, width: 2.0, height: 1.8, depth: 2.0, isPinned: false },
  { id: 'DEMO_RACK_2', name: 'ชั้นวางสินค้า Bay-B01', type: 'STORAGE_RACK', x: 13, z: -9, width: 6.0, height: 5.5, depth: 2.0, isPinned: false },
  { id: 'DEMO_RACK_3', name: 'ชั้นวางสินค้า Bay-B02', type: 'STORAGE_RACK', x: 13, z: 1, width: 6.0, height: 5.5, depth: 2.0, isPinned: false },
  { id: 'DEMO_PARCEL_2', name: 'กล่องพัสดุลำเลียง P-02', type: 'PARCEL_BOX', x: 13, z: 9, width: 2.0, height: 1.8, depth: 2.0, isPinned: false },
  { id: 'DEMO_PIN_1', name: 'หมุดหยิบของ Line-01', type: 'PICKUP_PIN', x: 1, z: 5, width: 2.0, height: 2.4, depth: 2.0, isPinned: true },
];

const DEFAULT_SAVED_LAYOUTS = [
  {
    id: 'LAYOUT_DEFAULT_1',
    name: 'ผังคลังสินค้ามาตรฐาน Zone-A (ตัวอย่าง)',
    savedAt: '18/08/2026 23:30',
    gridSize: { width: 52, depth: 36 },
    objects: INITIAL_DEMO_OBJECTS,
    routes: [
      {
        id: 'ROUTE_DEMO_1',
        fromId: 'DEMO_PARCEL_1',
        fromName: 'กองพาเลทสินค้า Pallet-01',
        fromPos: [-15, 9],
        toId: 'DEMO_RACK_1',
        toName: 'ชั้นวางสินค้าหลัก Bay-A01',
        toPos: [-13, -9]
      }
    ]
  },
  {
    id: 'LAYOUT_DEFAULT_2',
    name: 'ผังกระจายสินค้า High-Density Zone-B',
    savedAt: '18/08/2026 22:15',
    gridSize: { width: 60, depth: 40 },
    objects: [
      { id: 'RACK_B1', name: 'ชั้นวางสินค้า Bay-B01', type: 'STORAGE_RACK', x: -18, z: -10, width: 6.0, height: 5.5, depth: 2.0, isPinned: false },
      { id: 'RACK_B2', name: 'ชั้นวางสินค้า Bay-B02', type: 'STORAGE_RACK', x: -18, z: 0, width: 6.0, height: 5.5, depth: 2.0, isPinned: false },
      { id: 'RACK_B3', name: 'ชั้นวางสินค้า Bay-B03', type: 'STORAGE_RACK', x: 18, z: -10, width: 6.0, height: 5.5, depth: 2.0, isPinned: false },
      { id: 'RACK_B4', name: 'ชั้นวางสินค้า Bay-B04', type: 'STORAGE_RACK', x: 18, z: 0, width: 6.0, height: 5.5, depth: 2.0, isPinned: false },
      { id: 'CHARGER_B', name: 'แท่นชาร์จ Fast-Dock 01', type: 'CHARGING_STATION', x: 0, z: -14, width: 2.0, height: 2.4, depth: 2.0, isPinned: true },
      { id: 'PARCEL_B1', name: 'กองพัสดุรับเข้า Inbound-01', type: 'PARCEL_BOX', x: -6, z: 12, width: 2.0, height: 1.8, depth: 2.0, isPinned: false },
      { id: 'PARCEL_B2', name: 'กองพัสดุรับเข้า Inbound-02', type: 'PARCEL_BOX', x: 6, z: 12, width: 2.0, height: 1.8, depth: 2.0, isPinned: false },
    ],
    routes: [
      {
        id: 'ROUTE_B_1',
        fromId: 'PARCEL_B1',
        fromName: 'กองพัสดุรับเข้า Inbound-01',
        fromPos: [-6, 12],
        toId: 'RACK_B1',
        toName: 'ชั้นวางสินค้า Bay-B01',
        toPos: [-18, -10]
      }
    ]
  }
];

export default function Factory3D() {
  const mountRef = useRef(null);

  // App Modes: 'OPERATION' (View-only show/demo) | 'SETTING' (Clean Blank Grid Custom Builder)
  const [appMode, setAppMode] = useState('OPERATION');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ECO_VISION_NIGHT_MODE', JSON.stringify(isNightMode));
    } catch (e) {
      console.warn('Cannot persist night mode', e);
    }
  }, [isNightMode]);

  const [cameraView, setCameraView] = useState('ISOMETRIC');
  const [hasAnomaly, setHasAnomaly] = useState(false);

  // Dynamic Floor & Grid Dimensions (Width x Depth in meters)
  const [gridSize, setGridSize] = useState({ width: 52, depth: 36 });

  // Selected tool in Setting Mode: null (Hand/Orbit/Pan Mode) | 'STORAGE_RACK' | 'PARCEL_BOX' | 'CHARGING_STATION' | 'PICKUP_PIN'
  const [selectedObjectType, setSelectedObjectType] = useState(null);
  const [isPlacingMode, setIsPlacingMode] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  // Factory objects layout
  const [placedObjects, setPlacedObjects] = useState(INITIAL_DEMO_OBJECTS);

  // AMR Robot Dispatch Routes (Parcel Box -> Storage Rack)
  const [dispatchRoutes, setDispatchRoutes] = useState([
    {
      id: 'ROUTE_DEMO_1',
      fromId: 'DEMO_PARCEL_1',
      fromName: 'กองพาเลทสินค้า Pallet-01',
      fromPos: [-15, 9],
      toId: 'DEMO_RACK_1',
      toName: 'ชั้นวางสินค้าหลัก Bay-A01',
      toPos: [-13, -9]
    }
  ]);
  const [selectedRouteSource, setSelectedRouteSource] = useState(null);
  const [routeNotification, setRouteNotification] = useState(null);

  // SAVED LAYOUTS HISTORY STATE (Persisted in localStorage)
  const [savedLayouts, setSavedLayouts] = useState(() => {
    try {
      const stored = localStorage.getItem('ECO_VISION_SAVED_LAYOUTS');
      return stored ? JSON.parse(stored) : DEFAULT_SAVED_LAYOUTS;
    } catch {
      return DEFAULT_SAVED_LAYOUTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ECO_VISION_SAVED_LAYOUTS', JSON.stringify(savedLayouts));
    } catch (err) {
      console.warn('Cannot persist layouts to localStorage', err);
    }
  }, [savedLayouts]);

  // Save current layout to history
  const handleSaveCurrentLayout = (customName) => {
    const newEntry = {
      id: `LAYOUT_${Date.now()}`,
      name: customName || `ผังโรงงาน #${savedLayouts.length + 1} (${gridSize.width}×${gridSize.depth}m)`,
      savedAt: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }),
      gridSize: { ...gridSize },
      objects: [...placedObjects],
      routes: [...dispatchRoutes]
    };
    setSavedLayouts((prev) => [newEntry, ...prev]);
    setRouteNotification(`บันทึก "${newEntry.name}" สำเร็จ`);
    setTimeout(() => setRouteNotification(null), 3000);
  };

  // Load a saved layout from history
  const handleLoadSavedLayout = (layout) => {
    if (!layout) return;
    if (layout.gridSize) {
      setGridSize(layout.gridSize);
    }
    setPlacedObjects(layout.objects || []);
    setDispatchRoutes(layout.routes || []);
    setSelectedObject(null);
    setSelectedRouteSource(null);
    setRouteNotification(`โหลดผัง "${layout.name}" สำเร็จ`);
    setTimeout(() => setRouteNotification(null), 3000);
  };

  // Delete a saved layout from history
  const handleDeleteSavedLayout = (layoutId) => {
    setSavedLayouts((prev) => prev.filter((l) => l.id !== layoutId));
    setRouteNotification('ลบผังออกจากประวัติแล้ว');
    setTimeout(() => setRouteNotification(null), 2500);
  };

  // Delete a specific pin by ID
  const handleDeletePin = (pinId) => {
    setPlacedObjects((prev) =>
      prev
        .filter((o) => o.id !== pinId)
        .map((o) => (o.id === pinId ? { ...o, isPinned: false } : o))
    );
    setDispatchRoutes((prev) => prev.filter((r) => r.fromId !== pinId && r.toId !== pinId));
    if (selectedObject && selectedObject.id === pinId) {
      setSelectedObject(null);
    }
    if (selectedRouteSource && selectedRouteSource.id === pinId) {
      setSelectedRouteSource(null);
    }
    setRouteNotification('ลบหมุดเรียบร้อยแล้ว');
    setTimeout(() => setRouteNotification(null), 2500);
  };

  // Clear only all Pins & Routes (preserving racks, parcels, stations)
  const handleClearAllPins = () => {
    const pinCount = placedObjects.filter((o) => o.type === 'PICKUP_PIN' || o.isPinned).length;
    const routeCount = dispatchRoutes.length;

    if (pinCount === 0 && routeCount === 0) {
      setRouteNotification('ℹ️ ไม่มีหมุดหรือ Route ในผัง');
      setTimeout(() => setRouteNotification(null), 2500);
      return;
    }

    setPlacedObjects((prev) =>
      prev
        .filter((o) => o.type !== 'PICKUP_PIN')
        .map((o) => ({ ...o, isPinned: false }))
    );
    setDispatchRoutes([]);
    if (selectedObject && (selectedObject.type === 'PICKUP_PIN' || selectedObject.isPinned)) {
      setSelectedObject(null);
    }
    setSelectedRouteSource(null);
    setRouteNotification('ลบหมุดหยิบและ Route ทั้งหมดเรียบร้อยแล้ว');
    setTimeout(() => setRouteNotification(null), 3500);
  };

  const [robotStatus, setRobotStatus] = useState({
    mode: 'กำลังวิ่งลำเลียงตามรางกลางโรงงาน',
    target: 'จุดชาร์จ Dock-01',
    battery: 98,
    pickedCount: 14
  });

  const sceneStateRef = useRef({
    robot: null,
    radarWave: null,
    armMesh: null,
    carriedBoxMesh: null,
    routeLinesGroup: null,
    scene: null,
    renderer: null,
    camera: null,
    floorMesh: null,
    gridHelper: null,
    factoryEnvGroup: null,
    previewGroup: null,
    previewBoxMesh: null,
    previewEdgesMesh: null,
    isPlacementValid: true,
    objectMeshes: new Map(),
    workflowRoutes: [],
    currentWorkflowState: {
      routeIdx: 0,
      phase: 'DRIVING_TO_PICKUP',
      timer: 0
    },
    selectedRouteSource: null,
    waypoints: [
      new THREE.Vector3(-14, 0.4, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0, 0.4, 5),
      new THREE.Vector3(12, 0.4, 5),
      new THREE.Vector3(12, 0.4, -6),
      new THREE.Vector3(0, 0.4, -6),
      new THREE.Vector3(-14, 0.4, -6),
    ],
    pathIndex: 0,
    cameraView: 'ISOMETRIC',
    appMode: 'OPERATION',
    gridSize: { width: 52, depth: 36 },
    currentCamPos: new THREE.Vector3(45, 28, 42),
    targetCamPos: new THREE.Vector3(26, 20, 24),
    currentLookAt: new THREE.Vector3(0, 4, 0),
    targetLookAt: new THREE.Vector3(0, 2, 0),
    controls: {
      isDragging: false,
      isPanning: false,
      dragButton: 0,
      mouseDownPos: { x: 0, y: 0 },
      dragDistance: 0,
      prevMouse: { x: 0, y: 0 },
      spherical: { radius: 68, theta: 0.18, phi: 1.28 },
      targetCenter: new THREE.Vector3(0, 2, 0),
    },
    intro: {
      active: true,
      startTime: null,
      duration: 3.0,
      startSpherical: { radius: 68, theta: 0.18, phi: 1.28 },
      targetSpherical: { radius: 34, theta: Math.PI / 4, phi: Math.PI / 3.1 },
      startLookAt: new THREE.Vector3(0, 4.5, 0),
      targetLookAt: new THREE.Vector3(0, 2, 0)
    },
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    isPlacingMode: false,
    selectedObjectType: null,
    placedObjects: INITIAL_DEMO_OBJECTS
  });

  useEffect(() => {
    sceneStateRef.current.cameraView = cameraView;
  }, [cameraView]);

  useEffect(() => {
    sceneStateRef.current.appMode = appMode;
    if (sceneStateRef.current.robot) {
      sceneStateRef.current.robot.visible = (appMode === 'OPERATION');
    }
    // Deselect object when returning to OPERATION mode (view only!)
    if (appMode === 'OPERATION') {
      setSelectedObject(null);
      setIsPlacingMode(false);
      setSelectedObjectType(null);
    }
  }, [appMode]);

  useEffect(() => {
    sceneStateRef.current.isPlacingMode = isPlacingMode;
    sceneStateRef.current.selectedObjectType = selectedObjectType;
    if (sceneStateRef.current.previewGroup) {
      sceneStateRef.current.previewGroup.visible = isPlacingMode && !!selectedObjectType;
    }
  }, [isPlacingMode, selectedObjectType]);

  useEffect(() => {
    sceneStateRef.current.placedObjects = placedObjects;
  }, [placedObjects]);

  useEffect(() => {
    sceneStateRef.current.gridSize = gridSize;
  }, [gridSize]);

  useEffect(() => {
    sceneStateRef.current.selectedObject = selectedObject;
  }, [selectedObject]);

  useEffect(() => {
    sceneStateRef.current.selectedRouteSource = selectedRouteSource;
  }, [selectedRouteSource]);

  useEffect(() => {
    sceneStateRef.current.workflowRoutes = dispatchRoutes;
  }, [dispatchRoutes]);

  // ==========================================
  // 3D OBJECT MESH BUILDERS
  // ==========================================
  const addPinMarker = (parentGroup, yPos) => {
    const pinPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8),
      new THREE.MeshBasicMaterial({ color: 0x00e676 })
    );
    pinPole.position.set(0, yPos + 0.6, 0);
    parentGroup.add(pinPole);

    const pinSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x00e676 })
    );
    pinSphere.position.set(0, yPos + 1.2, 0);
    parentGroup.add(pinSphere);
  };

  const createStorageRackMesh = (obj) => {
    const rack = new THREE.Group();
    rack.position.set(obj.x, 0, obj.z);
    rack.userData = { id: obj.id, type: 'STORAGE_RACK' };

    const w = obj.width || 6.0;
    const h = obj.height || 5.0;
    const d = obj.depth || 2.0;

    // Invisible Solid Raycast Hit-Box (Ensures 100% effortless, instant click selection anywhere on the rack volume)
    const hitBoxGeo = new THREE.BoxGeometry(w, h, d);
    const hitBoxMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    const hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
    hitBox.position.set(0, h / 2, 0);
    rack.add(hitBox);

    const blueUprightMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, metalness: 0.65, roughness: 0.35 });
    const orangeBeamMat = new THREE.MeshStandardMaterial({ color: 0xea580c, metalness: 0.5, roughness: 0.4 });
    const palletWoodMat = new THREE.MeshStandardMaterial({ color: 0xb48a56, roughness: 0.85 });

    // 4 Corner Structural Pillars
    const pillarGeo = new THREE.BoxGeometry(0.18, h, 0.18);
    [[-w / 2 + 0.09, -d / 2 + 0.09], [w / 2 - 0.09, -d / 2 + 0.09], [-w / 2 + 0.09, d / 2 - 0.09], [w / 2 - 0.09, d / 2 - 0.09]].forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(pillarGeo, blueUprightMat);
      pillar.position.set(px, h / 2, pz);
      pillar.castShadow = true;
      rack.add(pillar);
    });

    // Middle Vertical Supports for wide racks (>= 4m)
    if (w >= 4.0) {
      const midPillar1 = new THREE.Mesh(pillarGeo, blueUprightMat);
      midPillar1.position.set(0, h / 2, -d / 2 + 0.09);
      rack.add(midPillar1);
      const midPillar2 = new THREE.Mesh(pillarGeo, blueUprightMat);
      midPillar2.position.set(0, h / 2, d / 2 - 0.09);
      rack.add(midPillar2);
    }

    const levels = [h * 0.22, h * 0.52, h * 0.82];
    const deliveredCount = obj.deliveredBoxes || 0;
    let boxesRendered = 0;

    levels.forEach((levelY) => {
      // Front and Back Structural Beams
      const beamGeo = new THREE.BoxGeometry(w, 0.12, 0.08);
      const beamFront = new THREE.Mesh(beamGeo, orangeBeamMat);
      beamFront.position.set(0, levelY, d / 2 - 0.04);
      beamFront.castShadow = true;
      rack.add(beamFront);

      const beamBack = new THREE.Mesh(beamGeo, orangeBeamMat);
      beamBack.position.set(0, levelY, -d / 2 + 0.04);
      beamBack.castShadow = true;
      rack.add(beamBack);

      // Clean Empty Deck Planks (Starts empty!)
      const palletCount = Math.max(2, Math.floor(w / 2.0));
      for (let i = 0; i < palletCount; i++) {
        const px = -w / 2 + (w / palletCount) * (i + 0.5);
        const palletMesh = new THREE.Mesh(new THREE.BoxGeometry(w / palletCount - 0.2, 0.08, d * 0.9), palletWoodMat);
        palletMesh.position.set(px, levelY + 0.04, 0);
        palletMesh.castShadow = true;
        palletMesh.receiveShadow = true;
        rack.add(palletMesh);

        // ONLY show boxes when AMR robot has actively delivered boxes to this shelf!
        if (boxesRendered < deliveredCount) {
          boxesRendered++;
          const boxMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 });
          const boxMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.75, d * 0.75), boxMat);
          boxMesh.position.set(px, levelY + 0.45, 0);
          boxMesh.castShadow = true;
          boxMesh.receiveShadow = true;
          rack.add(boxMesh);
        }
      }
    });

    if (obj.isPinned) {
      addPinMarker(rack, h + 0.4);
    }

    return rack;
  };

  const createParcelBoxMesh = (obj) => {
    const group = new THREE.Group();
    group.position.set(obj.x, 0, obj.z);
    group.userData = { id: obj.id, type: 'PARCEL_BOX' };

    const w = obj.width || 2.0;
    const h = obj.height || 1.8;
    const d = obj.depth || 2.0;

    // Invisible Hit-Box for instant clicking
    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    );
    hitBox.position.set(0, h / 2, 0);
    group.add(hitBox);

    const palletMat = new THREE.MeshStandardMaterial({ color: 0x9a7b56, roughness: 0.85 });
    const pallet = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, d), palletMat);
    pallet.position.set(0, 0.08, 0);
    pallet.castShadow = true;
    pallet.receiveShadow = true;
    group.add(pallet);

    const boxMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 });
    const tapeMat = new THREE.MeshBasicMaterial({ color: 0xfaedcd });
    const labelMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const b1 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.46, h * 0.45, d * 0.88), boxMat);
    b1.position.set(-w * 0.24, 0.16 + h * 0.225, 0);
    b1.castShadow = true;
    b1.receiveShadow = true;
    group.add(b1);

    const t1 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.47, 0.03, 0.08), tapeMat);
    t1.position.set(-w * 0.24, 0.16 + h * 0.45, 0);
    group.add(t1);

    const lbl1 = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.18), labelMat);
    lbl1.position.set(-w * 0.24, 0.16 + h * 0.25, d * 0.44 + 0.01);
    group.add(lbl1);

    const b2 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.46, h * 0.45, d * 0.88), boxMat);
    b2.position.set(w * 0.24, 0.16 + h * 0.225, 0);
    b2.castShadow = true;
    b2.receiveShadow = true;
    group.add(b2);

    const b3 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.65, h * 0.42, d * 0.75), boxMat);
    b3.position.set(0, 0.16 + h * 0.45 + h * 0.21, 0);
    b3.castShadow = true;
    b3.receiveShadow = true;
    group.add(b3);

    const t3 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.66, 0.03, 0.08), tapeMat);
    t3.position.set(0, 0.16 + h * 0.45 + h * 0.42, 0);
    group.add(t3);

    if (obj.isPinned) {
      addPinMarker(group, h + 0.4);
    }

    return group;
  };

  const createMachineStationMesh = (obj) => {
    const group = new THREE.Group();
    group.position.set(obj.x, 0, obj.z);
    group.userData = { id: obj.id, type: 'MACHINE_STATION' };

    const w = obj.width || 3.6;
    const h = obj.height || 3.8;
    const d = obj.depth || 2.8;

    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    );
    hitBox.position.set(0, h / 2, 0);
    group.add(hitBox);

    const baseMat = new THREE.MeshStandardMaterial({ color: 0x273549, metalness: 0.7, roughness: 0.35 });
    const machineBase = new THREE.Mesh(new THREE.BoxGeometry(w, 0.6, d), baseMat);
    machineBase.position.set(0, 0.3, 0);
    machineBase.castShadow = true;
    machineBase.receiveShadow = true;
    group.add(machineBase);

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.3, roughness: 0.4 });
    const machineBody = new THREE.Mesh(new THREE.BoxGeometry(w * 0.75, h * 0.75, d * 0.7), bodyMat);
    machineBody.position.set(0, 0.6 + h * 0.375, -d * 0.1);
    machineBody.castShadow = true;
    group.add(machineBody);

    return group;
  };

  // High-Tech Futuristic AMR Supercharging Pod & Robotic Docking Station
  const createChargingStationMesh = (obj) => {
    const group = new THREE.Group();
    group.position.set(obj.x, 0, obj.z);
    group.userData = { id: obj.id, type: 'CHARGING_STATION' };

    const w = obj.width || 2.0;
    const h = obj.height || 2.4;
    const d = obj.depth || 2.0;

    // Invisible Hit-Box
    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    );
    hitBox.position.set(0, h / 2, 0);
    group.add(hitBox);

    // 1. Dark Titanium Docking Floor Ramp Base
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0b1320,
      metalness: 0.85,
      roughness: 0.25
    });
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), baseMat);
    basePlate.position.set(0, 0.06, 0);
    basePlate.receiveShadow = true;
    group.add(basePlate);

    // 2. Yellow/Black Industrial Safety Edge Stripes
    const hazardMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const edgeLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, d), hazardMat);
    edgeLeft.position.set(-w / 2 + 0.04, 0.065, 0);
    group.add(edgeLeft);

    const edgeRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, d), hazardMat);
    edgeRight.position.set(w / 2 - 0.04, 0.065, 0);
    group.add(edgeRight);

    // 3. Glowing Neon Cyan Drive-in Chevron Arrows (>>>)
    const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    for (let i = -1; i <= 1; i++) {
      const chevronZ = i * 0.45;
      const ch1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.02, 0.05), neonCyanMat);
      ch1.rotation.y = Math.PI / 4;
      ch1.position.set(-0.11, 0.13, chevronZ);
      group.add(ch1);

      const ch2 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.02, 0.05), neonCyanMat);
      ch2.rotation.y = -Math.PI / 4;
      ch2.position.set(0.11, 0.13, chevronZ);
      group.add(ch2);
    }

    // 4. Dual High-Voltage Magnetic Induction Contact Pads
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.1 });
    const blueGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    [-0.45, 0.45].forEach((cx) => {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.38), goldMat);
      pad.position.set(cx, 0.12, 0.1);
      group.add(pad);

      const padRing = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.42), blueGlowMat);
      padRing.position.set(cx, 0.13, 0.1);
      group.add(padRing);
    });

    // 5. Cybernetic Sleek Charging Tower with Slanted Bevels
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
    const tower = new THREE.Mesh(new THREE.BoxGeometry(w * 0.85, h, 0.5), towerMat);
    tower.position.set(0, h / 2 + 0.1, -d / 2 + 0.28);
    tower.castShadow = true;
    tower.receiveShadow = true;
    group.add(tower);

    // 6. Holographic Curved Display Screen (Live 800V HUD)
    const hudMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const hudScreen = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.65, 0.65), hudMat);
    hudScreen.position.set(0, h * 0.65 + 0.1, -d / 2 + 0.54);
    group.add(hudScreen);

    // Inner HUD dark bezel
    const bezel = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.62, 0.58), new THREE.MeshBasicMaterial({ color: 0x022c22 }));
    bezel.position.set(0, h * 0.65 + 0.1, -d / 2 + 0.545);
    group.add(bezel);

    // Battery bar inside screen
    const battBar = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.45, 0.14), new THREE.MeshBasicMaterial({ color: 0x00ff88 }));
    battBar.position.set(0, h * 0.65 + 0.1, -d / 2 + 0.55);
    group.add(battBar);

    // 7. Cantilevered Overhead Robotic Charging Arm with Top Power Dome
    const armMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.2 });
    const topBoom = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.8), armMat);
    topBoom.position.set(0, h + 0.05, -d / 2 + 0.6);
    group.add(topBoom);

    const chargeHead = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 0.22, 16), goldMat);
    chargeHead.position.set(0, h - 0.08, -d / 2 + 0.85);
    group.add(chargeHead);

    const laserRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 8, 24), new THREE.MeshBasicMaterial({ color: 0x00e5ff }));
    laserRing.rotation.x = Math.PI / 2;
    laserRing.position.set(0, h - 0.18, -d / 2 + 0.85);
    group.add(laserRing);

    // 8. Top Status Light Tower (RGB Beacon)
    const beaconLight = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.18, 16), new THREE.MeshBasicMaterial({ color: 0x00ffcc }));
    beaconLight.position.set(0, h + 0.22, -d / 2 + 0.28);
    group.add(beaconLight);

    if (obj.isPinned) {
      addPinMarker(group, h + 0.4);
    }

    return group;
  };

  const createPickupPinMesh = (obj) => {
    const group = new THREE.Group();
    group.position.set(obj.x, 0, obj.z);
    group.userData = { id: obj.id, type: 'PICKUP_PIN' };

    const h = obj.height || 2.4;

    // Invisible Hit-Box
    const hitBox = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, h, 16),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    );
    hitBox.position.set(0, h / 2, 0);
    group.add(hitBox);

    // 1. HIGH-CONTRAST BOLD TARGET CIRCLE ON FLOOR (Ultra Distinct & Clear!)
    // Outer Bold Neon Green Ring
    const outerRingGeo = new THREE.RingGeometry(1.15, 1.45, 36);
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, side: THREE.DoubleSide });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = 0.04;
    group.add(outerRing);

    // Inner Glowing Translucent Disc
    const innerDiscGeo = new THREE.CircleGeometry(1.15, 36);
    const innerDiscMat = new THREE.MeshBasicMaterial({ color: 0x00e676, side: THREE.DoubleSide, transparent: true, opacity: 0.35, depthWrite: false });
    const innerDisc = new THREE.Mesh(innerDiscGeo, innerDiscMat);
    innerDisc.rotation.x = -Math.PI / 2;
    innerDisc.position.y = 0.035;
    group.add(innerDisc);

    // Middle Bullseye Accent Ring
    const bullseyeGeo = new THREE.RingGeometry(0.35, 0.55, 32);
    const bullseyeMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, side: THREE.DoubleSide });
    const bullseye = new THREE.Mesh(bullseyeGeo, bullseyeMat);
    bullseye.rotation.x = -Math.PI / 2;
    bullseye.position.y = 0.042;
    group.add(bullseye);

    // 4 Cardinal Crosshair Target Ticks (+ Brackets)
    const tickMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach((angle) => {
      const tick = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.45), tickMat);
      tick.rotation.y = angle;
      tick.position.set(Math.sin(angle) * 1.3, 0.045, Math.cos(angle) * 1.3);
      group.add(tick);
    });

    // 2. High-Tech Holographic Vertical Beacon Pin:
    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, h, 12);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x00ff66, emissive: 0x00ff66, emissiveIntensity: 0.8 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, h / 2, 0);
    group.add(pole);

    const beaconGeo = new THREE.OctahedronGeometry(0.4, 0);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, h + 0.35, 0);
    group.add(beacon);

    const topRingGeo = new THREE.TorusGeometry(0.55, 0.04, 8, 24);
    const topRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const topRing = new THREE.Mesh(topRingGeo, topRingMat);
    topRing.rotation.x = Math.PI / 2;
    topRing.position.set(0, h + 0.35, 0);
    group.add(topRing);

    return group;
  };

  const createFactoryObjectMesh = (obj) => {
    let mesh;
    switch (obj.type) {
      case 'MACHINE_STATION':
        mesh = createMachineStationMesh(obj);
        break;
      case 'PARCEL_BOX':
        mesh = createParcelBoxMesh(obj);
        break;
      case 'CHARGING_STATION':
        mesh = createChargingStationMesh(obj);
        break;
      case 'PICKUP_PIN':
        mesh = createPickupPinMesh(obj);
        break;
      case 'STORAGE_RACK':
      default:
        mesh = createStorageRackMesh(obj);
        break;
    }
    if (mesh) {
      mesh.rotation.y = obj.rotation || 0;
    }
    return mesh;
  };

  // =========================================================
  // AUTHENTIC FACTORY ARCHITECTURE (OPERATION MODE ONLY)
  // Clean Empty Grid in SETTING MODE (NO overhead clutter!)
  // =========================================================
  const buildFactoryEnvironment = (scene, currentGridSize, isNight, currentAppMode) => {
    const envGroup = new THREE.Group();
    envGroup.name = 'FACTORY_ENVIRONMENT';

    const gw = currentGridSize.width;
    const gd = currentGridSize.depth;

    const yellowLaneMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, depthWrite: false });
    const laneLineLeft = new THREE.Mesh(new THREE.PlaneGeometry(0.12, gd - 4), yellowLaneMat);
    laneLineLeft.rotation.x = -Math.PI / 2;
    laneLineLeft.position.set(-2.5, 0.015, 0);
    envGroup.add(laneLineLeft);

    const laneLineRight = new THREE.Mesh(new THREE.PlaneGeometry(0.12, gd - 4), yellowLaneMat);
    laneLineRight.rotation.x = -Math.PI / 2;
    laneLineRight.position.set(2.5, 0.015, 0);
    envGroup.add(laneLineRight);

    for (let z = -gd / 2 + 3; z <= gd / 2 - 3; z += 3.5) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 1.8), yellowLaneMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.015, z);
      envGroup.add(dash);
    }

    const bayLeft = new THREE.Mesh(new THREE.PlaneGeometry(12, 0.1), yellowLaneMat);
    bayLeft.rotation.x = -Math.PI / 2;
    bayLeft.position.set(-14, 0.015, -gd / 2 + 4);
    envGroup.add(bayLeft);

    const bayRight = new THREE.Mesh(new THREE.PlaneGeometry(12, 0.1), yellowLaneMat);
    bayRight.rotation.x = -Math.PI / 2;
    bayRight.position.set(12, 0.015, -gd / 2 + 4);
    envGroup.add(bayRight);

    // 1. FACTORY WALLS & COLUMNS (Rendered in BOTH Setting and Operation modes so the factory always looks solid!)
    const wallUpperMat = new THREE.MeshStandardMaterial({ color: isNight ? 0x111827 : 0xd8e0e8, roughness: 0.7 });
    const wallLowerMat = new THREE.MeshStandardMaterial({ color: isNight ? 0x0f172a : 0x64748b, roughness: 0.6 });

    const backUpper = new THREE.Mesh(new THREE.BoxGeometry(gw, 10, 0.6), wallUpperMat);
    backUpper.position.set(0, 9, -gd / 2);
    backUpper.receiveShadow = true;
    envGroup.add(backUpper);

    const backLower = new THREE.Mesh(new THREE.BoxGeometry(gw, 4, 0.65), wallLowerMat);
    backLower.position.set(0, 2, -gd / 2);
    backLower.receiveShadow = true;
    envGroup.add(backLower);

    const leftUpper = new THREE.Mesh(new THREE.BoxGeometry(0.6, 10, gd), wallUpperMat);
    leftUpper.position.set(-gw / 2, 9, 0);
    leftUpper.receiveShadow = true;
    envGroup.add(leftUpper);

    const leftLower = new THREE.Mesh(new THREE.BoxGeometry(0.65, 4, gd), wallLowerMat);
    leftLower.position.set(-gw / 2, 2, 0);
    leftLower.receiveShadow = true;
    envGroup.add(leftLower);

    const concreteMat = new THREE.MeshStandardMaterial({ color: isNight ? 0x1e293b : 0x94a3b8, roughness: 0.8 });
    const columnGeo = new THREE.BoxGeometry(0.9, 14, 0.9);
    const corbelGeo = new THREE.BoxGeometry(0.9, 0.6, 0.6);

    const colStepX = 14;
    for (let x = -gw / 2 + 2; x <= gw / 2 - 2; x += colStepX) {
      const col = new THREE.Mesh(columnGeo, concreteMat);
      col.position.set(x, 7, -gd / 2 + 0.45);
      col.castShadow = true;
      col.receiveShadow = true;
      envGroup.add(col);

      const corbel = new THREE.Mesh(corbelGeo, concreteMat);
      corbel.position.set(x, 9.8, -gd / 2 + 0.9);
      corbel.castShadow = true;
      envGroup.add(corbel);
    }

    const colStepZ = 12;
    for (let z = -gd / 2 + 4; z <= gd / 2 - 2; z += colStepZ) {
      const col = new THREE.Mesh(columnGeo, concreteMat);
      col.position.set(-gw / 2 + 0.45, 7, z);
      col.castShadow = true;
      col.receiveShadow = true;
      envGroup.add(col);
    }

    // If in SETTING Mode -> Stop here! (Walls & columns are rendered, but overhead crane and roof trusses are hidden so they don't block the view)
    if (currentAppMode === 'SETTING') {
      return envGroup;
    }

    // 2. OVERHEAD FACTORY ARCHITECTURE (OPERATION MODE ONLY)
    const craneMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.35 });
    const craneBeam1 = new THREE.Mesh(new THREE.BoxGeometry(gw - 2, 0.75, 0.35), craneMat);
    craneBeam1.position.set(0, 10.5, -4);
    craneBeam1.castShadow = true;
    envGroup.add(craneBeam1);

    const craneBeam2 = new THREE.Mesh(new THREE.BoxGeometry(gw - 2, 0.75, 0.35), craneMat);
    craneBeam2.position.set(0, 10.5, -3.2);
    craneBeam2.castShadow = true;
    envGroup.add(craneBeam2);

    const truckGeo = new THREE.BoxGeometry(0.6, 0.5, 2.0);
    const truckLeft = new THREE.Mesh(truckGeo, craneMat);
    truckLeft.position.set(-gw / 2 + 1.2, 10.6, -3.6);
    envGroup.add(truckLeft);

    const truckRight = new THREE.Mesh(truckGeo, craneMat);
    truckRight.position.set(gw / 2 - 1.2, 10.6, -3.6);
    envGroup.add(truckRight);

    const trolleyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const trolley = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 1.2), trolleyMat);
    trolley.position.set(2, 10.9, -3.6);
    envGroup.add(trolley);

    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3.5, 8), new THREE.MeshBasicMaterial({ color: 0x334155 }));
    cable.position.set(2, 9.0, -3.6);
    envGroup.add(cable);

    const hookBlock = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.3), craneMat);
    hookBlock.position.set(2, 7.2, -3.6);
    envGroup.add(hookBlock);

    const trussMat = new THREE.MeshStandardMaterial({ color: isNight ? 0x334155 : 0x94a3b8, metalness: 0.6, roughness: 0.4 });
    for (let x = -gw / 2 + 4; x <= gw / 2 - 4; x += 14) {
      const trussTop = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, gd - 2), trussMat);
      trussTop.position.set(x, 13.6, 0);
      envGroup.add(trussTop);

      const trussBottom = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, gd - 2), trussMat);
      trussBottom.position.set(x, 12.2, 0);
      envGroup.add(trussBottom);

      for (let z = -gd / 2 + 3; z <= gd / 2 - 3; z += 4) {
        const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8), trussMat);
        strut.rotation.x = Math.PI / 4;
        strut.position.set(x, 12.9, z);
        envGroup.add(strut);
      }
    }

    const ductMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.85, roughness: 0.2 });
    const duct = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, gw - 2, 16), ductMat);
    duct.rotation.z = Math.PI / 2;
    duct.position.set(0, 12.0, -gd * 0.28);
    envGroup.add(duct);

    const lampMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });
    const bulbMat = new THREE.MeshBasicMaterial({ color: isNight ? 0x93c5fd : 0xfffbeb });
    for (let x = -gw / 2 + 8; x <= gw / 2 - 8; x += 16) {
      for (let z = -gd / 2 + 6; z <= gd / 2 - 6; z += 12) {
        const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.45, 0.35, 16), lampMat);
        lamp.position.set(x, 11.5, z);
        envGroup.add(lamp);

        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), bulbMat);
        bulb.position.set(x, 11.35, z);
        envGroup.add(bulb);
      }
    }

    return envGroup;
  };

  // ==========================================
  // THREE.JS SCENE INITIALIZATION
  // ==========================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneStateRef.current.scene = scene;

    const bgDayColor = new THREE.Color(0xdde5ed);
    const bgNightColor = new THREE.Color(0x0a101d);
    scene.background = isNightMode ? bgNightColor : bgDayColor;
    scene.fog = new THREE.FogExp2(isNightMode ? 0x0a101d : 0xdde5ed, isNightMode ? 0.012 : 0.005);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(26, 20, 24);
    camera.lookAt(0, 2, 0);
    sceneStateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isNightMode ? 0.95 : 1.18;
    container.appendChild(renderer.domElement);
    sceneStateRef.current.renderer = renderer;

    const hemiLight = new THREE.HemisphereLight(
      isNightMode ? 0x1e293b : 0xfffaea,
      isNightMode ? 0x050a12 : 0x94a3b8,
      isNightMode ? 0.35 : 1.15
    );
    scene.add(hemiLight);

    const mainSun = new THREE.DirectionalLight(0xfffaed, isNightMode ? 0.35 : 1.45);
    mainSun.position.set(28, 42, 22);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.width = 2048;
    mainSun.shadow.mapSize.height = 2048;
    mainSun.shadow.camera.near = 0.5;
    mainSun.shadow.camera.far = 120;
    const d = 38;
    mainSun.shadow.camera.left = -d;
    mainSun.shadow.camera.right = d;
    mainSun.shadow.camera.top = d;
    mainSun.shadow.camera.bottom = -d;
    mainSun.shadow.bias = -0.0001;
    mainSun.shadow.normalBias = 0.02;
    scene.add(mainSun);

    const fillLight = new THREE.DirectionalLight(0xdde8f5, isNightMode ? 0.15 : 0.55);
    fillLight.position.set(-24, 30, -20);
    scene.add(fillLight);

    const floorGeo = new THREE.PlaneGeometry(gridSize.width, gridSize.depth);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x131b26 : 0xb5c2d1,
      roughness: 0.42,
      metalness: 0.08
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    sceneStateRef.current.floorMesh = floor;

    const factoryEnv = buildFactoryEnvironment(scene, gridSize, isNightMode, appMode);
    scene.add(factoryEnv);
    sceneStateRef.current.factoryEnvGroup = factoryEnv;

    // --- Dynamic Placement Ghost Group (Resizes and Changes Color Red/Green) ---
    const previewGroup = new THREE.Group();
    const pBoxGeo = new THREE.BoxGeometry(1, 1, 1);
    const pBoxMat = new THREE.MeshBasicMaterial({ color: 0x00e676, transparent: true, opacity: 0.45 });
    const pBoxMesh = new THREE.Mesh(pBoxGeo, pBoxMat);
    previewGroup.add(pBoxMesh);

    const pEdgesGeo = new THREE.EdgesGeometry(pBoxGeo);
    const pEdgesMat = new THREE.LineBasicMaterial({ color: 0x00ff88, linewidth: 2 });
    const pEdgesMesh = new THREE.LineSegments(pEdgesGeo, pEdgesMat);
    previewGroup.add(pEdgesMesh);

    previewGroup.position.set(0, 2.5, 0);
    previewGroup.visible = false;
    scene.add(previewGroup);
    sceneStateRef.current.previewGroup = previewGroup;
    sceneStateRef.current.previewBoxMesh = pBoxMesh;
    sceneStateRef.current.previewEdgesMesh = pEdgesMesh;
    sceneStateRef.current.isPlacementValid = true;

    const robot = new THREE.Group();
    robot.position.set(-14, 0.4, 0);
    robot.visible = (appMode === 'OPERATION');

    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.4, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x1a2634, metalness: 0.7, roughness: 0.3 })
    );
    chassis.castShadow = true;
    robot.add(chassis);

    const bumper = new THREE.Mesh(
      new THREE.BoxGeometry(1.65, 0.08, 1.25),
      new THREE.MeshBasicMaterial({ color: 0x00e676 })
    );
    bumper.position.y = -0.12;
    robot.add(bumper);

    const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.15, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    [[-0.6, -0.15, -0.6], [0.6, -0.15, -0.6], [-0.6, -0.15, 0.6], [0.6, -0.15, 0.6]].forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      wheel.castShadow = true;
      robot.add(wheel);
    });

    const tray = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.35, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x2e3d4e, metalness: 0.5 })
    );
    tray.position.y = 0.35;
    tray.castShadow = true;
    robot.add(tray);

    // Carried Parcel Box on top of AMR Robot
    const carriedBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.5, 0.65),
      new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 })
    );
    carriedBox.position.set(-0.22, 0.72, 0);
    carriedBox.castShadow = true;
    carriedBox.visible = false;
    robot.add(carriedBox);
    sceneStateRef.current.carriedBoxMesh = carriedBox;

    const armMast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12),
      new THREE.MeshStandardMaterial({ color: 0x00b0ff, metalness: 0.8 })
    );
    armMast.position.set(0.3, 0.75, 0);
    robot.add(armMast);

    const gripper = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.1, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x00e676 })
    );
    gripper.position.set(0.3, 1.15, 0);
    robot.add(gripper);
    sceneStateRef.current.armMesh = gripper;

    const dome = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, 0.15, 16),
      new THREE.MeshStandardMaterial({ color: 0x00e676, metalness: 0.9, roughness: 0.1 })
    );
    dome.position.set(-0.35, 0.6, 0);
    robot.add(dome);

    const headlight = new THREE.SpotLight(0xdffff4, isNightMode ? 3.5 : 1.8, 16, Math.PI / 4, 0.4);
    headlight.position.set(0.85, 0.25, 0);
    headlight.target.position.set(5, 0, 0);
    robot.add(headlight);
    robot.add(headlight.target);

    const radarWave = new THREE.Mesh(
      new THREE.RingGeometry(0.8, 2.8, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00e676,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    );
    radarWave.rotation.x = -Math.PI / 2;
    radarWave.position.set(0, 0.03, 0);
    robot.add(radarWave);
    sceneStateRef.current.radarWave = radarWave;

    scene.add(robot);
    sceneStateRef.current.robot = robot;

    // --- MOUSE & CAMERA INTERACTION (PAN + ORBIT + ZOOM) ---
    const spherical = sceneStateRef.current.controls.spherical;

    const onMouseDown = (e) => {
      if (e.target !== renderer.domElement) return;

      const rect = container.getBoundingClientRect();
      sceneStateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      sceneStateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      sceneStateRef.current.raycaster.setFromCamera(sceneStateRef.current.mouse, camera);

      // Check if user is Panning: Right-click (button === 2), Middle-click (button === 1), or Shift + Left-click
      const isPan = e.button === 2 || e.button === 1 || (e.button === 0 && e.shiftKey);

      if (sceneStateRef.current.intro) {
        sceneStateRef.current.intro.active = false;
      }

      // Track drag start position to differentiate between a click vs camera drag
      sceneStateRef.current.controls.isDragging = true;
      sceneStateRef.current.controls.isPanning = isPan;
      sceneStateRef.current.controls.dragButton = e.button;
      sceneStateRef.current.controls.mouseDownPos = { x: e.clientX, y: e.clientY };
      sceneStateRef.current.controls.dragDistance = 0;
      sceneStateRef.current.controls.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      sceneStateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      sceneStateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Update Placement Ghost Box Position & Strict Collision Check
      if (sceneStateRef.current.appMode === 'SETTING' && sceneStateRef.current.isPlacingMode && sceneStateRef.current.selectedObjectType && sceneStateRef.current.selectedObjectType !== 'DELETE_PIN' && sceneStateRef.current.floorMesh && sceneStateRef.current.previewGroup) {
        sceneStateRef.current.raycaster.setFromCamera(sceneStateRef.current.mouse, camera);
        const intersects = sceneStateRef.current.raycaster.intersectObject(sceneStateRef.current.floorMesh);
        if (intersects.length > 0) {
          const pt = intersects[0].point;

          const curType = sceneStateRef.current.selectedObjectType;
          let w = 6.0, h = 5.0, d = 2.0;
          if (curType === 'MACHINE_STATION') { w = 4.0; h = 3.8; d = 4.0; }
          else if (curType === 'PARCEL_BOX') { w = 2.0; h = 1.8; d = 2.0; }
          else if (curType === 'CHARGING_STATION') { w = 2.0; h = 2.2; d = 2.0; }
          else if (curType === 'PICKUP_PIN') { w = 2.0; h = 2.4; d = 2.0; }
          else { w = 6.0; h = 5.0; d = 2.0; }

          const snapX = snapCoordinate(pt.x, w);
          const snapZ = snapCoordinate(pt.z, d);

          // Check overlap & boundary!
          const isColliding = checkObjectOverlap(snapX, snapZ, w, d, sceneStateRef.current.placedObjects);
          const isOut = checkOutOfBounds(snapX, snapZ, w, d, sceneStateRef.current.gridSize);
          const isBlocked = isColliding || isOut;

          sceneStateRef.current.isPlacementValid = !isBlocked;

          sceneStateRef.current.previewGroup.position.set(snapX, h / 2, snapZ);
          sceneStateRef.current.previewGroup.scale.set(w, h, d);
          sceneStateRef.current.previewGroup.visible = true;

          // Turn RED if overlapping or out of bounds, GREEN if completely clear!
          if (sceneStateRef.current.previewBoxMesh && sceneStateRef.current.previewEdgesMesh) {
            if (isBlocked) {
              sceneStateRef.current.previewBoxMesh.material.color.setHex(0xef4444);
              sceneStateRef.current.previewEdgesMesh.material.color.setHex(0xff2222);
            } else {
              sceneStateRef.current.previewBoxMesh.material.color.setHex(0x00e676);
              sceneStateRef.current.previewEdgesMesh.material.color.setHex(0x00ff88);
            }
          }
        }
      } else if (sceneStateRef.current.previewGroup) {
        sceneStateRef.current.previewGroup.visible = false;
      }

      if (!sceneStateRef.current.controls.isDragging) return;
      const dx = e.clientX - sceneStateRef.current.controls.prevMouse.x;
      const dy = e.clientY - sceneStateRef.current.controls.prevMouse.y;
      sceneStateRef.current.controls.dragDistance += Math.abs(dx) + Math.abs(dy);

      if (sceneStateRef.current.controls.isPanning) {
        // --- PANNING / TRANSLATING CAMERA (เลื่อนมุมมอง) ---
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();

        const right = new THREE.Vector3();
        right.crossVectors(forward, camera.up).normalize();

        const panSpeed = sceneStateRef.current.controls.spherical.radius * 0.0018;

        const targetCenter = sceneStateRef.current.controls.targetCenter;
        targetCenter.addScaledVector(right, -dx * panSpeed);
        targetCenter.addScaledVector(forward, dy * panSpeed);

        const maxBoundX = sceneStateRef.current.gridSize.width / 2 + 15;
        const maxBoundZ = sceneStateRef.current.gridSize.depth / 2 + 15;
        targetCenter.x = Math.max(-maxBoundX, Math.min(maxBoundX, targetCenter.x));
        targetCenter.z = Math.max(-maxBoundZ, Math.min(maxBoundZ, targetCenter.z));
      } else {
        // --- ORBIT ROTATION (หมุนมุมมอง) ---
        spherical.theta -= dx * 0.005;
        spherical.phi = Math.max(0.05, Math.min(Math.PI / 2 - 0.05, spherical.phi - dy * 0.005));
      }

      sceneStateRef.current.controls.prevMouse = { x: e.clientX, y: e.clientY };

      if (sceneStateRef.current.cameraView !== 'ISOMETRIC') {
        setCameraView('ISOMETRIC');
      }
    };

    const onMouseUp = (e) => {
      const dragDist = sceneStateRef.current.controls.dragDistance;
      sceneStateRef.current.controls.isDragging = false;
      sceneStateRef.current.controls.isPanning = false;

      // Ignore mouseup if clicked on UI overlays / inspector / dialogs
      if (e.target !== renderer.domElement) return;

      // Handle click actions ONLY on stationary click (dragDistance < 6px)
      if (dragDist < 6) {
        if (sceneStateRef.current.appMode === 'SETTING' && e.button === 0 && !e.shiftKey) {
          sceneStateRef.current.raycaster.setFromCamera(sceneStateRef.current.mouse, camera);
          const allMeshes = Array.from(sceneStateRef.current.objectMeshes.values());
          const hits = sceneStateRef.current.raycaster.intersectObjects(allMeshes, true);

          // 1. If Clicked directly on an EXISTING OBJECT (Rack, Box, Charger, Pin)
          if (hits.length > 0) {
            let topGroup = hits[0].object;
            while (topGroup.parent && topGroup.parent !== scene) {
              topGroup = topGroup.parent;
            }
            const hitId = topGroup.userData?.id;
            const hitObj = sceneStateRef.current.placedObjects.find((o) => o.id === hitId);

            if (hitObj) {
              // A. If in DELETE_PIN Tool Mode -> Delete clicked pin/object immediately!
              if (sceneStateRef.current.isPlacingMode && sceneStateRef.current.selectedObjectType === 'DELETE_PIN') {
                handleDeletePin(hitObj.id);
                return;
              }

              // B. Route Pin Tool Workflow (Box -> Rack linking)
              if (sceneStateRef.current.isPlacingMode && sceneStateRef.current.selectedObjectType === 'PICKUP_PIN') {
                if (hitObj.type === 'PARCEL_BOX') {
                  setSelectedRouteSource(hitObj);
                  setSelectedObject(hitObj);
                  setRouteNotification(`เลือก [${hitObj.name || 'กล่องพัสดุ'}] เป็นจุดรับของแล้ว -> กรุณาคลิกเลือก [ชั้นวางสินค้า] ที่ต้องการให้นำไปจัดเก็บ`);
                  return;
                } else if (hitObj.type === 'STORAGE_RACK') {
                  const currentSource = sceneStateRef.current.selectedRouteSource;
                  if (currentSource) {
                    const newRoute = {
                      id: `ROUTE_${Date.now()}`,
                      fromId: currentSource.id,
                      fromName: currentSource.name || 'กล่องพัสดุ',
                      fromPos: [currentSource.x, currentSource.z],
                      toId: hitObj.id,
                      toName: hitObj.name || 'ชั้นวางสินค้า',
                      toPos: [hitObj.x, hitObj.z]
                    };
                    setDispatchRoutes((prev) => [...prev.filter((r) => r.fromId !== currentSource.id), newRoute]);
                    setSelectedRouteSource(null);
                    setSelectedObject(hitObj);
                    setRouteNotification(`สร้าง Route สำเร็จ: นำ [${currentSource.name || 'กล่องพัสดุ'}] ไปจัดเก็บบน [${hitObj.name || 'ชั้นวางสินค้า'}]`);
                    setTimeout(() => setRouteNotification(null), 4500);
                    return;
                  }
                }
              }

              // C. Direct Click Selection: Selects object and opens inspector instantly!
              setSelectedObject(hitObj);
              setIsPlacingMode(false);
              setSelectedObjectType(null);
              return;
            }
          }

          // 2. If Clicked on EMPTY FLOOR in Placement Mode -> Place new object
          if (sceneStateRef.current.isPlacingMode && sceneStateRef.current.selectedObjectType) {
            const intersects = sceneStateRef.current.raycaster.intersectObject(sceneStateRef.current.floorMesh);
            if (intersects.length > 0) {
              const pt = intersects[0].point;
              const type = sceneStateRef.current.selectedObjectType;
              let typeName = 'ชั้นวางสินค้า';
              let w = 6.0, h = 5.0, d = 2.0;

              if (type === 'PARCEL_BOX') {
                typeName = 'กล่องพัสดุ';
                w = 2.0; h = 1.8; d = 2.0;
              } else if (type === 'CHARGING_STATION') {
                typeName = 'จุดชาร์จหุ่นยนต์';
                w = 2.0; h = 2.4; d = 2.0;
              } else if (type === 'PICKUP_PIN') {
                typeName = 'หมุดหยิบของ';
                w = 2.0; h = 2.4; d = 2.0;
              } else {
                typeName = 'ชั้นวางสินค้าหนัก';
                w = 6.0; h = 5.0; d = 2.0;
              }

              const snapX = snapCoordinate(pt.x, w);
              const snapZ = snapCoordinate(pt.z, d);

              const isColliding = checkObjectOverlap(snapX, snapZ, w, d, sceneStateRef.current.placedObjects);
              const isOut = checkOutOfBounds(snapX, snapZ, w, d, sceneStateRef.current.gridSize);

              if (isColliding || isOut) {
                return;
              }

              const newObj = {
                id: `OBJ_${Date.now()}`,
                name: `${typeName} #${sceneStateRef.current.placedObjects.length + 1}`,
                type: type,
                x: snapX,
                z: snapZ,
                width: w,
                height: h,
                depth: d,
                rotation: 0,
                deliveredBoxes: 0,
                isPinned: (type === 'PICKUP_PIN')
              };

              setPlacedObjects((prev) => [...prev, newObj]);
              setSelectedObject(newObj);
            }
            return;
          }

          // 3. Clicked empty floor in Hand mode -> Deselect
          setSelectedObject(null);
          setSelectedRouteSource(null);
        }
      }
    };

    const onWheel = (e) => {
      if (sceneStateRef.current.intro) {
        sceneStateRef.current.intro.active = false;
      }
      spherical.radius = Math.max(8, Math.min(85, spherical.radius + e.deltaY * 0.03));
    };

    const onContextMenu = (e) => {
      e.preventDefault(); // Enable seamless right-click drag pan without browser context menu!
    };

    // Keyboard Shortcuts: WASD / Arrow Keys Pan, Delete / Backspace, R Rotate, Escape Deselect
    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      // 1. Delete / Backspace: Delete selected object in Setting Mode
      if ((e.key === 'Delete' || e.key === 'Backspace') && sceneStateRef.current.appMode === 'SETTING') {
        const currentSel = sceneStateRef.current.selectedObject;
        if (currentSel?.id) {
          e.preventDefault();
          handleDeleteObject(currentSel.id);
          return;
        }
      }

      // 2. 'R' / 'r': Rotate selected object 90 degrees
      if ((e.key === 'r' || e.key === 'R') && sceneStateRef.current.appMode === 'SETTING') {
        const currentSel = sceneStateRef.current.selectedObject;
        if (currentSel?.id) {
          e.preventDefault();
          const nextRot = ((currentSel.rotation || 0) + Math.PI / 2) % (Math.PI * 2);
          handleUpdateObject({ ...currentSel, rotation: nextRot });
          return;
        }
      }

      // 3. Escape: Deselect or cancel placement tool
      if (e.key === 'Escape') {
        setSelectedObject(null);
        setSelectedObjectType(null);
        setIsPlacingMode(false);
        return;
      }

      // 4. WASD / Arrow Keys Pan
      const panStep = sceneStateRef.current.controls.spherical.radius * 0.035;
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      const right = new THREE.Vector3();
      right.crossVectors(forward, camera.up).normalize();

      const targetCenter = sceneStateRef.current.controls.targetCenter;

      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        targetCenter.addScaledVector(forward, panStep);
      } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        targetCenter.addScaledVector(forward, -panStep);
      } else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        targetCenter.addScaledVector(right, -panStep);
      } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        targetCenter.addScaledVector(right, panStep);
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel);
    container.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('keydown', onKeyDown);

    // --- ANIMATION & CAMERA GLIDE ---
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (sceneStateRef.current.appMode === 'OPERATION' && robot.visible) {
        const workflowRoutes = sceneStateRef.current.workflowRoutes || [];

        if (workflowRoutes.length > 0) {
          const wf = sceneStateRef.current.currentWorkflowState || {
            routeIdx: 0,
            phase: 'DRIVING_TO_PICKUP',
            timer: 0
          };

          const activeRoute = workflowRoutes[wf.routeIdx % workflowRoutes.length];
          const carriedBox = sceneStateRef.current.carriedBoxMesh;

          if (wf.phase === 'DRIVING_TO_PICKUP') {
            const targetPos = new THREE.Vector3(activeRoute.fromPos[0] + 1.2, 0.4, activeRoute.fromPos[1]);
            const dir = new THREE.Vector3().subVectors(targetPos, robot.position);
            const dist = dir.length();

            if (dist > 0.35) {
              dir.normalize();
              robot.position.addScaledVector(dir, 3.2 * delta);
              robot.rotation.y = Math.atan2(-dir.z, dir.x);
            } else {
              wf.phase = 'PICKING';
              wf.timer = 1.3;
              setRobotStatus((prev) => ({
                ...prev,
                mode: `กำลังหยิบกล่องพัสดุ (${activeRoute.fromName})`,
                target: activeRoute.fromName
              }));
            }
          } else if (wf.phase === 'PICKING') {
            wf.timer -= delta;
            if (sceneStateRef.current.armMesh) {
              sceneStateRef.current.armMesh.position.y = 0.65 + Math.sin(wf.timer * 4) * 0.4;
            }
            if (wf.timer <= 0) {
              if (carriedBox) carriedBox.visible = true;
              wf.phase = 'DRIVING_TO_RACK';
              setRobotStatus((prev) => ({
                ...prev,
                mode: `กำลังนำสินค้าไปจัดเก็บที่ (${activeRoute.toName})`,
                target: activeRoute.toName
              }));
            }
          } else if (wf.phase === 'DRIVING_TO_RACK') {
            const targetPos = new THREE.Vector3(activeRoute.toPos[0] + (activeRoute.toPos[0] >= 0 ? -1.8 : 1.8), 0.4, activeRoute.toPos[1]);
            const dir = new THREE.Vector3().subVectors(targetPos, robot.position);
            const dist = dir.length();

            if (dist > 0.35) {
              dir.normalize();
              robot.position.addScaledVector(dir, 3.2 * delta);
              robot.rotation.y = Math.atan2(-dir.z, dir.x);
            } else {
              wf.phase = 'STORING';
              wf.timer = 1.3;
              setRobotStatus((prev) => ({
                ...prev,
                mode: `กำลังนำสินค้าขึ้นจัดเก็บบนชั้น (${activeRoute.toName})...`,
                target: activeRoute.toName
              }));
            }
          } else if (wf.phase === 'STORING') {
            wf.timer -= delta;
            if (sceneStateRef.current.armMesh) {
              sceneStateRef.current.armMesh.position.y = 1.25 + Math.sin(wf.timer * 4) * 0.35;
            }
            if (wf.timer <= 0) {
              if (carriedBox) carriedBox.visible = false;
              // Deliver box to rack shelf!
              setPlacedObjects((prev) =>
                prev.map((o) =>
                  o.id === activeRoute.toId ? { ...o, deliveredBoxes: (o.deliveredBoxes || 0) + 1 } : o
                )
              );
              setRobotStatus((prev) => ({
                ...prev,
                mode: `จัดเก็บสินค้าสำเร็จ (+1)`,
                pickedCount: prev.pickedCount + 1
              }));
              wf.routeIdx = (wf.routeIdx + 1) % workflowRoutes.length;
              wf.phase = 'DRIVING_TO_PICKUP';
            }
          }

          sceneStateRef.current.currentWorkflowState = wf;
        } else {
          // Standard waypoint patrol fallback
          if (sceneStateRef.current.armMesh) {
            sceneStateRef.current.armMesh.position.y = 1.15 + Math.sin(elapsed * 3) * 0.04;
          }

          const waypoints = sceneStateRef.current.waypoints;
          if (waypoints.length > 0) {
            let pathIdx = sceneStateRef.current.pathIndex;
            const targetWp = waypoints[pathIdx % waypoints.length];
            const dir = new THREE.Vector3().subVectors(targetWp, robot.position);
            const dist = dir.length();

            if (dist > 0.25) {
              dir.normalize();
              robot.position.addScaledVector(dir, 2.4 * delta);
              const targetAngle = Math.atan2(-dir.z, dir.x);
              robot.rotation.y = targetAngle;
            } else {
              sceneStateRef.current.pathIndex = (pathIdx + 1) % waypoints.length;
            }
          }
        }
      }

      // Cinematic Intro Zoom Animation
      const intro = sceneStateRef.current.intro;
      if (intro && intro.active && sceneStateRef.current.cameraView === 'ISOMETRIC') {
        if (intro.startTime === null) {
          intro.startTime = elapsed;
        }
        const t = Math.min(1, (elapsed - intro.startTime) / intro.duration);
        const ease = 1 - Math.pow(1 - t, 4);

        spherical.radius = intro.startSpherical.radius + (intro.targetSpherical.radius - intro.startSpherical.radius) * ease;
        spherical.theta = intro.startSpherical.theta + (intro.targetSpherical.theta - intro.startSpherical.theta) * ease;
        spherical.phi = intro.startSpherical.phi + (intro.targetSpherical.phi - intro.startSpherical.phi) * ease;

        const introLook = new THREE.Vector3().lerpVectors(intro.startLookAt, intro.targetLookAt, ease);
        sceneStateRef.current.targetLookAt.copy(introLook);

        if (t >= 1) {
          intro.active = false;
        }
      }

      // Smooth Camera LERP with Dynamic Target Center Pan!
      const curView = sceneStateRef.current.cameraView;
      const targetPos = sceneStateRef.current.targetCamPos;
      const targetLook = sceneStateRef.current.targetLookAt;

      if (curView === 'OVERVIEW') {
        targetPos.set(0, 42, 0.1);
        targetLook.set(0, 0, 0);
      } else if (curView === 'FOLLOW_AMR' && robot.visible) {
        targetPos.set(robot.position.x + 8, robot.position.y + 10, robot.position.z + 8);
        targetLook.copy(robot.position);
      } else {
        const targetCenter = sceneStateRef.current.controls.targetCenter;
        targetPos.x = targetCenter.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
        targetPos.y = targetCenter.y + spherical.radius * Math.cos(spherical.phi);
        targetPos.z = targetCenter.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
        if (!intro || !intro.active) {
          targetLook.copy(targetCenter);
        }
      }

      sceneStateRef.current.currentCamPos.lerp(targetPos, 0.08);
      sceneStateRef.current.currentLookAt.lerp(targetLook, 0.08);

      camera.position.copy(sceneStateRef.current.currentCamPos);
      camera.lookAt(sceneStateRef.current.currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isNightMode]);

  // ==========================================================
  // DYNAMIC GRID & FACTORY ARCHITECTURE SWITCHING
  // Clean floor in SETTING mode / Full architecture in OPERATION
  // ==========================================================
  useEffect(() => {
    const scene = sceneStateRef.current.scene;
    if (!scene) return;

    if (sceneStateRef.current.floorMesh) {
      sceneStateRef.current.floorMesh.geometry.dispose();
      sceneStateRef.current.floorMesh.geometry = new THREE.PlaneGeometry(gridSize.width, gridSize.depth);
    }

    if (sceneStateRef.current.gridHelper) {
      scene.remove(sceneStateRef.current.gridHelper);
      sceneStateRef.current.gridHelper.geometry.dispose();
      sceneStateRef.current.gridHelper = null;
    }

    if (appMode === 'SETTING') {
      const divisions = Math.max(10, Math.round(gridSize.width / 2));
      const grid = new THREE.GridHelper(gridSize.width, divisions, 0x00e676, 0x475569);
      grid.position.y = 0.02;
      grid.material.opacity = 0.65;
      grid.material.transparent = true;
      scene.add(grid);
      sceneStateRef.current.gridHelper = grid;
    }

    if (sceneStateRef.current.factoryEnvGroup) {
      scene.remove(sceneStateRef.current.factoryEnvGroup);
      sceneStateRef.current.factoryEnvGroup = null;
    }
    const newEnv = buildFactoryEnvironment(scene, gridSize, isNightMode, appMode);
    scene.add(newEnv);
    sceneStateRef.current.factoryEnvGroup = newEnv;
  }, [gridSize, appMode, isNightMode]);

  // ==========================================
  // SYNCHRONIZE 3D OBJECTS IN SCENE
  // ==========================================
  useEffect(() => {
    const scene = sceneStateRef.current.scene;
    if (!scene) return;

    sceneStateRef.current.objectMeshes.forEach((mesh) => {
      scene.remove(mesh);
    });
    sceneStateRef.current.objectMeshes.clear();

    placedObjects.forEach((obj) => {
      const objMesh = createFactoryObjectMesh(obj);
      scene.add(objMesh);
      sceneStateRef.current.objectMeshes.set(obj.id, objMesh);
    });
  }, [placedObjects]);

  // ==========================================
  // SYNCHRONIZE 3D SELECTION INDICATOR (GRID HIGHLIGHT)
  // ==========================================
  useEffect(() => {
    const scene = sceneStateRef.current.scene;
    if (!scene) return;

    if (sceneStateRef.current.selectionBoxMesh) {
      scene.remove(sceneStateRef.current.selectionBoxMesh);
      sceneStateRef.current.selectionBoxMesh = null;
    }

    if (selectedObject && appMode === 'SETTING') {
      const isRotated = Math.round((selectedObject.rotation || 0) / (Math.PI / 2)) % 2 !== 0;
      const w = isRotated ? (selectedObject.depth || 2.0) : (selectedObject.width || 4.0);
      const d = isRotated ? (selectedObject.width || 4.0) : (selectedObject.depth || 2.0);
      const h = selectedObject.height || 5.0;

      const group = new THREE.Group();
      group.name = 'SELECTION_INDICATOR';

      // 1. Floor Tile Highlight
      const footprintGeo = new THREE.PlaneGeometry(w + 0.3, d + 0.3);
      const footprintMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const footprint = new THREE.Mesh(footprintGeo, footprintMat);
      footprint.rotation.x = -Math.PI / 2;
      footprint.position.set(selectedObject.x, 0.03, selectedObject.z);
      group.add(footprint);

      // 2. Glowing Bounding Box Wireframe
      const boxGeo = new THREE.BoxGeometry(w + 0.15, h + 0.15, d + 0.15);
      const wireGeo = new THREE.WireframeGeometry(boxGeo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0x00e676, transparent: true, opacity: 0.8 });
      const wireBox = new THREE.LineSegments(wireGeo, wireMat);
      wireBox.position.set(selectedObject.x, h / 2, selectedObject.z);
      group.add(wireBox);

      scene.add(group);
      sceneStateRef.current.selectionBoxMesh = group;
    }
  }, [selectedObject, appMode]);

  // ==========================================================
  // SYNCHRONIZE 3D DISPATCH ROUTE LINES & MARKERS (BOX -> RACK)
  // ==========================================================
  useEffect(() => {
    const scene = sceneStateRef.current.scene;
    if (!scene) return;

    if (sceneStateRef.current.routeLinesGroup) {
      scene.remove(sceneStateRef.current.routeLinesGroup);
      sceneStateRef.current.routeLinesGroup = null;
    }

    const group = new THREE.Group();
    group.name = 'DISPATCH_ROUTE_LINES';

    dispatchRoutes.forEach((route) => {
      const fromObj = placedObjects.find((o) => o.id === route.fromId);
      const toObj = placedObjects.find((o) => o.id === route.toId);
      const fromX = fromObj ? fromObj.x : route.fromPos[0];
      const fromZ = fromObj ? fromObj.z : route.fromPos[1];
      const toX = toObj ? toObj.x : route.toPos[0];
      const toZ = toObj ? toObj.z : route.toPos[1];

      const fromV3 = new THREE.Vector3(fromX, 0.08, fromZ);
      const toV3 = new THREE.Vector3(toX, 0.08, toZ);

      // 1. Bold 3D Glowing Spline Tube & Dashed Line (Ultra High-Contrast Path)
      const midV3 = new THREE.Vector3((fromX + toX) / 2, 0.08, (fromZ + toZ) / 2);
      const curve = new THREE.QuadraticBezierCurve3(fromV3, midV3, toV3);

      // 3D Luminous Guide Tube (Thick & Brightly Visible from any camera view/zoom)
      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.09, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.85 });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tube);

      const points = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0xffffff,
        dashSize: 1.0,
        gapSize: 0.5,
        linewidth: 4,
        transparent: true,
        opacity: 0.95
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.position.y = 0.02;
      line.computeLineDistances();
      group.add(line);

      // 2. ULTRA HIGH-CONTRAST PICKUP SOURCE TARGET CIRCLE (Bold Green/Lime Bullseye)
      // Outer Bold Ring
      const srcOuterGeo = new THREE.RingGeometry(1.2, 1.55, 36);
      const srcOuterMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, side: THREE.DoubleSide });
      const srcOuter = new THREE.Mesh(srcOuterGeo, srcOuterMat);
      srcOuter.rotation.x = -Math.PI / 2;
      srcOuter.position.set(fromX, 0.06, fromZ);
      group.add(srcOuter);

      // Inner Glowing Disc
      const srcInnerGeo = new THREE.CircleGeometry(1.2, 36);
      const srcInnerMat = new THREE.MeshBasicMaterial({ color: 0x00e676, side: THREE.DoubleSide, transparent: true, opacity: 0.45, depthWrite: false });
      const srcInner = new THREE.Mesh(srcInnerGeo, srcInnerMat);
      srcInner.rotation.x = -Math.PI / 2;
      srcInner.position.set(fromX, 0.055, fromZ);
      group.add(srcInner);

      // Center Bullseye Dot
      const srcBullseyeGeo = new THREE.RingGeometry(0.35, 0.6, 24);
      const srcBullseyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
      const srcBullseye = new THREE.Mesh(srcBullseyeGeo, srcBullseyeMat);
      srcBullseye.rotation.x = -Math.PI / 2;
      srcBullseye.position.set(fromX, 0.065, fromZ);
      group.add(srcBullseye);

      // 3. ULTRA HIGH-CONTRAST DROP DESTINATION TARGET CIRCLE (Bold Electric Cyan/Blue Bullseye)
      // Outer Bold Cyan Ring
      const dstOuterGeo = new THREE.RingGeometry(1.4, 1.8, 36);
      const dstOuterMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, side: THREE.DoubleSide });
      const dstOuter = new THREE.Mesh(dstOuterGeo, dstOuterMat);
      dstOuter.rotation.x = -Math.PI / 2;
      dstOuter.position.set(toX, 0.06, toZ);
      group.add(dstOuter);

      // Inner Glowing Disc
      const dstInnerGeo = new THREE.CircleGeometry(1.4, 36);
      const dstInnerMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, side: THREE.DoubleSide, transparent: true, opacity: 0.45, depthWrite: false });
      const dstInner = new THREE.Mesh(dstInnerGeo, dstInnerMat);
      dstInner.rotation.x = -Math.PI / 2;
      dstInner.position.set(toX, 0.055, toZ);
      group.add(dstInner);

      // Center Bullseye Target
      const dstBullseyeGeo = new THREE.RingGeometry(0.4, 0.7, 24);
      const dstBullseyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
      const dstBullseye = new THREE.Mesh(dstBullseyeGeo, dstBullseyeMat);
      dstBullseye.rotation.x = -Math.PI / 2;
      dstBullseye.position.set(toX, 0.065, toZ);
      group.add(dstBullseye);
    });

    // 4. Source Box Waiting for Rack Selection Indicator (Bold Glowing Golden Sunburst)
    if (selectedRouteSource) {
      const waitGeo = new THREE.RingGeometry(1.3, 1.75, 36);
      const waitMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
      const waitRing = new THREE.Mesh(waitGeo, waitMat);
      waitRing.rotation.x = -Math.PI / 2;
      waitRing.position.set(selectedRouteSource.x, 0.07, selectedRouteSource.z);
      group.add(waitRing);

      const waitInnerGeo = new THREE.CircleGeometry(1.3, 36);
      const waitInnerMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide, transparent: true, opacity: 0.5, depthWrite: false });
      const waitInner = new THREE.Mesh(waitInnerGeo, waitInnerMat);
      waitInner.rotation.x = -Math.PI / 2;
      waitInner.position.set(selectedRouteSource.x, 0.065, selectedRouteSource.z);
      group.add(waitInner);
    }

    scene.add(group);
    sceneStateRef.current.routeLinesGroup = group;
  }, [dispatchRoutes, placedObjects, selectedRouteSource]);

  // ==========================================
  // HANDLERS FOR OBJECTS & MODE TRANSITIONS
  // ==========================================
  const handleUpdateObject = (updatedObj) => {
    // Snap object coordinates to keep boundaries aligned with grid lines
    const isRotated = Math.round((updatedObj.rotation || 0) / (Math.PI / 2)) % 2 !== 0;
    const effW = isRotated ? (updatedObj.depth || 2.0) : (updatedObj.width || 4.0);
    const effD = isRotated ? (updatedObj.width || 4.0) : (updatedObj.depth || 2.0);

    const snappedX = snapCoordinate(updatedObj.x, effW);
    const snappedZ = snapCoordinate(updatedObj.z, effD);
    const normalizedObj = { ...updatedObj, x: snappedX, z: snappedZ };

    // Strict collision check: Prevent expanding into neighboring objects
    const isColliding = checkObjectOverlap(
      normalizedObj.x,
      normalizedObj.z,
      normalizedObj.width || 4.0,
      normalizedObj.depth || 2.0,
      placedObjects,
      normalizedObj.id,
      normalizedObj.rotation || 0
    );

    // Strict boundary check: Prevent expanding outside the grid
    const isOut = checkOutOfBounds(
      normalizedObj.x,
      normalizedObj.z,
      normalizedObj.width || 4.0,
      normalizedObj.depth || 2.0,
      gridSize,
      normalizedObj.rotation || 0
    );

    if (isColliding || isOut) {
      return false; // Rejected!
    }

    setPlacedObjects((prev) => prev.map((o) => (o.id === normalizedObj.id ? normalizedObj : o)));
    setSelectedObject(normalizedObj);
    return true;
  };

  const handleDeleteObject = (id) => {
    // 1. Immediately remove mesh from 3D scene
    const scene = sceneStateRef.current.scene;
    const mesh = sceneStateRef.current.objectMeshes.get(id);
    if (mesh && scene) {
      scene.remove(mesh);
      sceneStateRef.current.objectMeshes.delete(id);
    }
    // 2. Remove from state
    setPlacedObjects((prev) => prev.filter((o) => o.id !== id));
    setSelectedObject(null);
  };

  const handlePinTargetForRobot = (obj) => {
    const updated = { ...obj, isPinned: !obj.isPinned };
    handleUpdateObject(updated);

    if (updated.isPinned) {
      const newTargetV3 = new THREE.Vector3(obj.x + 2.0, 0.4, obj.z);
      sceneStateRef.current.waypoints = [
        newTargetV3,
        new THREE.Vector3(0, 0.4, 0),
        new THREE.Vector3(-obj.x, 0.4, -obj.z)
      ];
      sceneStateRef.current.pathIndex = 0;

      setRobotStatus((prev) => ({
        ...prev,
        mode: 'กำลังไปหยิบของที่ปักหมุด',
        target: obj.name || 'พิกัดที่ปักหมุด',
        pickedCount: prev.pickedCount + 1
      }));
    }
  };

  // Reset Camera Pan Center to Factory Center
  const handleResetCameraCenter = () => {
    sceneStateRef.current.controls.targetCenter.set(0, 2, 0);
  };

  const handleTriggerIntro = () => {
    setCameraView('ISOMETRIC');
    handleResetCameraCenter();
    const spherical = sceneStateRef.current.controls.spherical;
    spherical.radius = 68;
    spherical.theta = 0.18;
    spherical.phi = 1.28;
    sceneStateRef.current.targetLookAt.set(0, 4.5, 0);
    sceneStateRef.current.intro = {
      active: true,
      startTime: null,
      duration: 3.0,
      startSpherical: { radius: 68, theta: 0.18, phi: 1.28 },
      targetSpherical: { radius: 34, theta: Math.PI / 4, phi: Math.PI / 3.1 },
      startLookAt: new THREE.Vector3(0, 4.5, 0),
      targetLookAt: new THREE.Vector3(0, 2, 0)
    };
  };

  // 1. Edit Current Layout (Keep all existing placed objects intact)
  const handleEditCurrentLayout = () => {
    setAppMode('SETTING');
    setIsPlacingMode(false);
    setSelectedObjectType(null);
    setSelectedObject(null);
    handleResetCameraCenter();
    setIsDrawerOpen(false);
  };

  // 2. Switch to Blank Setting Mode (Clean floor grid only!)
  const handleEnterSettingMode = () => {
    setPlacedObjects([]);
    setSelectedObject(null);
    setAppMode('SETTING');
    setIsPlacingMode(false);
    setSelectedObjectType(null); // Starts in Hand/Orbit/Pan mode
    handleResetCameraCenter();
    setIsDrawerOpen(false);
  };

  // 2. Restore Default Sample Factory
  const handleRestoreDemoFactory = () => {
    setPlacedObjects(INITIAL_DEMO_OBJECTS);
    setSelectedObject(null);
    setAppMode('OPERATION');
    setIsPlacingMode(false);
    setSelectedObjectType(null);
    setGridSize({ width: 52, depth: 36 });
    handleResetCameraCenter();
    setIsDrawerOpen(false);

    sceneStateRef.current.waypoints = [
      new THREE.Vector3(-14, 0.4, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0, 0.4, 5),
      new THREE.Vector3(12, 0.4, 5),
      new THREE.Vector3(12, 0.4, -6),
      new THREE.Vector3(0, 0.4, -6),
      new THREE.Vector3(-14, 0.4, -6),
    ];
    sceneStateRef.current.pathIndex = 0;

    setRobotStatus({
      mode: 'กำลังวิ่งลำเลียงตามรางกลางโรงงาน',
      target: 'จุดชาร์จ Dock-01',
      battery: 98,
      pickedCount: 14
    });
  };

  // 3. Save Custom Layout & Launch Robot into Operation Mode (Restores full factory architecture)
  const handleStartRobotOperation = () => {
    if (placedObjects.length === 0) {
      alert('กรุณาวางวัตถุ (ชั้นวาง / กล่อง / เครื่องจักร / จุดชาร์จ / หมุด) บนผังอย่างน้อย 1 ชิ้นก่อนเริ่มทำงาน');
      return;
    }

    const chargingStations = placedObjects.filter((o) => o.type === 'CHARGING_STATION');
    const pickupPins = placedObjects.filter((o) => o.type === 'PICKUP_PIN');
    const otherObjects = placedObjects.filter((o) => o.type !== 'CHARGING_STATION' && o.type !== 'PICKUP_PIN');

    const generatedWaypoints = [];
    chargingStations.forEach((cs) => generatedWaypoints.push(new THREE.Vector3(cs.x, 0.4, cs.z + 1.2)));
    pickupPins.forEach((pin) => generatedWaypoints.push(new THREE.Vector3(pin.x, 0.4, pin.z)));
    otherObjects.forEach((obj) => generatedWaypoints.push(new THREE.Vector3(obj.x + (obj.x >= 0 ? -2.2 : 2.2), 0.4, obj.z)));

    if (generatedWaypoints.length === 1) {
      generatedWaypoints.push(new THREE.Vector3(0, 0.4, 0));
    }

    sceneStateRef.current.waypoints = generatedWaypoints;
    sceneStateRef.current.pathIndex = 0;

    // Activate Autonomous Pick-and-Place Route Workflow
    if (dispatchRoutes.length > 0) {
      sceneStateRef.current.workflowRoutes = dispatchRoutes;
      sceneStateRef.current.currentWorkflowState = {
        routeIdx: 0,
        phase: 'DRIVING_TO_PICKUP',
        timer: 0
      };
      if (sceneStateRef.current.carriedBoxMesh) {
        sceneStateRef.current.carriedBoxMesh.visible = false;
      }
    }

    if (sceneStateRef.current.robot && generatedWaypoints.length > 0) {
      sceneStateRef.current.robot.position.copy(generatedWaypoints[0]);
    }

    setAppMode('OPERATION');
    setIsPlacingMode(false);
    setSelectedObjectType(null);
    setSelectedObject(null);

    const firstRoute = dispatchRoutes[0];
    setRobotStatus({
      mode: firstRoute ? `กำลังไปหยิบกล่องพัสดุ: ${firstRoute.fromName}` : 'กำลังตรวจการและลำเลียงสินค้าอัตโนมัติ',
      target: firstRoute ? firstRoute.fromName : (placedObjects[0].name || 'จุดแรกที่กำหนด'),
      battery: 100,
      pickedCount: 0
    });
  };

  // Toggle tool selection in Setting Mode (Clicking active item deselects to Hand/Orbit/Pan tool)
  const handleToggleTool = (typeId) => {
    if (selectedObjectType === typeId) {
      setSelectedObjectType(null);
      setIsPlacingMode(false);
    } else {
      setSelectedObjectType(typeId);
      setIsPlacingMode(true);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 1. ECO-VISION MINIMALIST PROJECT HEADER (OPERATION MODE ONLY) */}
      {appMode === 'OPERATION' && (
        <ProjectHeroHeader
          isNightMode={isNightMode}
          robotStatus={robotStatus}
          onTriggerIntro={handleTriggerIntro}
          onEditLayout={handleEditCurrentLayout}
        />
      )}

      {/* 2. 3D Canvas */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          cursor: isPlacingMode ? 'crosshair' : 'grab'
        }}
      />

      {/* 3. SETTING MODE TOP CONTROL BAR (SLEEK MINIMALIST) */}
      {appMode === 'SETTING' && (
        <div style={{
          position: 'fixed',
          top: '16px',
          left: '20px',
          right: '20px',
          background: 'rgba(14, 21, 32, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          height: '46px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 850,
          color: '#fff',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)'
        }}>
          {/* Left: Mode Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: '700', color: '#f8fafc' }}>
              ตั้งค่าผัง
            </span>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: '700',
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              fontFamily: 'monospace'
            }}>
              SETTING
            </span>
          </div>

          {/* Center: Dimensions Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Width */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#38bdf8', display: 'flex' }}><Icons.Width /></span>
              <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)' }}>กว้าง:</span>
              <input
                type="range"
                min="24"
                max="80"
                step="4"
                value={gridSize.width}
                onChange={(e) => setGridSize((prev) => ({ ...prev, width: parseInt(e.target.value) }))}
                style={{ width: '80px', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.76rem', fontWeight: '600', color: '#38bdf8', minWidth: '30px', fontFamily: 'monospace' }}>
                {gridSize.width}m
              </span>
            </div>

            {/* Depth */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#00e676', display: 'flex' }}><Icons.Depth /></span>
              <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)' }}>ยาว:</span>
              <input
                type="range"
                min="18"
                max="60"
                step="4"
                value={gridSize.depth}
                onChange={(e) => setGridSize((prev) => ({ ...prev, depth: parseInt(e.target.value) }))}
                style={{ width: '80px', accentColor: '#00e676', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.76rem', fontWeight: '600', color: '#00e676', minWidth: '30px', fontFamily: 'monospace' }}>
                {gridSize.depth}m
              </span>
            </div>

            {/* Presets */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.25)', padding: '2px 4px', borderRadius: '6px' }}>
              {[
                { label: '36×24', w: 36, d: 24 },
                { label: '52×36', w: 52, d: 36 },
                { label: '68×44', w: 68, d: 44 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setGridSize({ width: preset.w, depth: preset.d })}
                  style={{
                    background: gridSize.width === preset.w && gridSize.depth === preset.d ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    border: 'none',
                    color: gridSize.width === preset.w && gridSize.depth === preset.d ? '#38bdf8' : 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '4px',
                    padding: '3px 6px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Quick Save to History Button */}
            <button
              onClick={() => {
                const name = prompt('กรุณาตั้งชื่อผังเพื่อบันทึกลงในประวัติ:', `ผังโรงงาน #${savedLayouts.length + 1} (${gridSize.width}×${gridSize.depth}m)`);
                if (name !== null) {
                  handleSaveCurrentLayout(name.trim() || undefined);
                }
              }}
              title="บันทึกผังนี้ลงในประวัติ"
              style={{
                background: 'rgba(0, 230, 118, 0.15)',
                border: '1px solid rgba(0, 230, 118, 0.4)',
                color: '#a7f3d0',
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '0.74rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0, 230, 118, 0.25)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0, 230, 118, 0.15)'; }}
            >
              <Icons.Save />
              <span>บันทึกผัง</span>
            </button>

            {/* Delete / Clear Pins Button */}
            <button
              onClick={handleClearAllPins}
              title="ลบหมุดและ Route ทั้งหมด"
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '0.74rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.22)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'; }}
            >
              <Icons.Trash />
              <span>ลบหมุด ({placedObjects.filter((o) => o.type === 'PICKUP_PIN' || o.isPinned).length + dispatchRoutes.length})</span>
            </button>

            <button
              onClick={handleRestoreDemoFactory}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '6px',
                padding: '5px 9px',
                fontSize: '0.74rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Icons.Refresh />
              <span>รีเซ็ต</span>
            </button>

            <button
              onClick={() => setAppMode('OPERATION')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.75)',
                borderRadius: '6px',
                padding: '5px 9px',
                fontSize: '0.74rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Icons.Close />
              <span>ออก</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Route Linking Guide / Notification Banner */}
      {appMode === 'SETTING' && routeNotification && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(14, 21, 32, 0.96)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 230, 118, 0.4)',
          borderRadius: '10px',
          padding: '7px 16px',
          color: '#f8fafc',
          fontSize: '0.78rem',
          fontWeight: '600',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          zIndex: 860,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'none'
        }}>
          <span>{routeNotification}</span>
        </div>
      )}

      {/* Floating Quick Delete Badge when Pin is selected */}
      {appMode === 'SETTING' && selectedObject && (selectedObject.type === 'PICKUP_PIN' || selectedObject.isPinned) && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(14, 21, 32, 0.96)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          borderRadius: '24px',
          padding: '5px 12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          zIndex: 870,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f1f5f9', fontSize: '0.78rem', fontWeight: '600' }}>
            <span style={{ color: '#00e676', display: 'flex' }}><Icons.Pin /></span>
            <span>{selectedObject.name || 'หมุดหยิบ'}</span>
          </div>
          <button
            onClick={() => handleDeletePin(selectedObject.id)}
            style={{
              background: '#ef4444',
              border: 'none',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '4px 12px',
              fontSize: '0.74rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Icons.Trash />
            <span>ลบหมุด</span>
          </button>
          <button
            onClick={() => setSelectedObject(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Icons.Close />
          </button>
        </div>
      )}

      {/* 4. CLEAN UNIFIED BOTTOM TOOLBAR DOCK (SETTING MODE) */}
      {appMode === 'SETTING' && (
        <div style={{
          position: 'fixed',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(13, 19, 30, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
          padding: '4px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          zIndex: 850
        }}>
          {/* A. Hand / Orbit / Pan Tool */}
          <button
            onClick={() => handleToggleTool(null)}
            title="คลิกซ้ายลาก: หมุนมุมกล้อง | คลิกขวาหรือ Shift+ลาก: เลื่อนมุมมอง | WASD: เลื่อนกล้อง"
            style={{
              background: !isPlacingMode ? 'rgba(56, 189, 248, 0.18)' : 'transparent',
              border: !isPlacingMode ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
              color: !isPlacingMode ? '#38bdf8' : '#94a3b8',
              borderRadius: '8px',
              height: '34px',
              padding: '0 10px',
              fontSize: '0.76rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.12s'
            }}
          >
            <Icons.Pan />
            <span>มุมมอง</span>
          </button>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.1)' }} />

          {/* B. Core Warehouse Placement & Delete Pin Buttons */}
          {[
            { id: 'STORAGE_RACK', label: 'ชั้นวาง', icon: <Icons.Storage /> },
            { id: 'PARCEL_BOX', label: 'พัสดุ', icon: <Icons.Parcel /> },
            { id: 'CHARGING_STATION', label: 'จุดชาร์จ', icon: <Icons.Charging /> },
            { id: 'PICKUP_PIN', label: 'หมุดหยิบ', icon: <Icons.Pin /> },
            { id: 'DELETE_PIN', label: 'ลบหมุด', icon: <Icons.Trash /> },
          ].map((t) => {
            const isSelected = selectedObjectType === t.id && isPlacingMode;
            const isDelete = t.id === 'DELETE_PIN';
            return (
              <button
                key={t.id}
                onClick={() => {
                  handleToggleTool(t.id);
                  if (t.id === 'DELETE_PIN' && selectedObjectType !== 'DELETE_PIN') {
                    setRouteNotification('โหมดลบหมุด: คลิกที่หมุดในผังเพื่อลบออกทันที');
                  }
                }}
                style={{
                  background: isSelected
                    ? isDelete ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 230, 118, 0.18)'
                    : 'transparent',
                  border: isSelected
                    ? isDelete ? '1px solid #ef4444' : '1px solid rgba(0, 230, 118, 0.45)'
                    : '1px solid transparent',
                  color: isSelected
                    ? isDelete ? '#fca5a5' : '#a7f3d0'
                    : '#94a3b8',
                  borderRadius: '8px',
                  height: '34px',
                  padding: '0 10px',
                  fontSize: '0.76rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.12s'
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#f1f5f9';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#94a3b8';
                  }
                }}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            );
          })}

          <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.1)' }} />

          {/* C. Save & Launch AMR Button */}
          <button
            onClick={handleStartRobotOperation}
            style={{
              background: '#00e676',
              color: '#05080c',
              border: 'none',
              borderRadius: '8px',
              height: '34px',
              padding: '0 12px',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#22c55e';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#00e676';
            }}
          >
            <Icons.Play />
            <span>บันทึก & เริ่มงาน</span>
          </button>
        </div>
      )}

      {/* 5. FLOATING CAMERA PAN CONTROLS & SHORTCUT HINT (BOTTOM RIGHT) */}
      <div style={{
        position: 'fixed',
        bottom: '22px',
        right: '20px',
        background: 'rgba(14, 21, 32, 0.92)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        padding: '5px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 800,
        color: 'rgba(255, 255, 255, 0.55)',
        fontSize: '0.67rem',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)'
      }}>
        <button
          onClick={handleResetCameraCenter}
          title="รีเซ็ตมุมมองกล้องกลับตรงกลาง"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#38bdf8',
            borderRadius: '5px',
            padding: '2px 6px',
            fontSize: '0.67rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Icons.CenterFocus />
          <span>รีเซ็ตมุมมอง</span>
        </button>
        <span style={{ opacity: 0.75 }}>
          {appMode === 'SETTING' ? 'WASD / ลาก: เลื่อน | R: หมุน 90° | Del: ลบ' : 'WASD / ลาก: เลื่อน'}
        </span>
      </div>

      {/* 6. TOOL DRAWER */}
      <ToolDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        isNightMode={isNightMode}
        setIsNightMode={setIsNightMode}
        cameraView={cameraView}
        setCameraView={setCameraView}
        robotStatus={robotStatus}
        onEditCurrentLayout={handleEditCurrentLayout}
        onEnterSettingMode={handleEnterSettingMode}
        onRestoreDemoFactory={handleRestoreDemoFactory}
        onClearAllPins={handleClearAllPins}
        onDeletePin={handleDeletePin}
        isPlacingMode={isPlacingMode}
        setIsPlacingMode={setIsPlacingMode}
        onToggleAnomaly={() => setHasAnomaly(!hasAnomaly)}
        hasAnomaly={hasAnomaly}
        pinnedTargets={placedObjects.filter((o) => o.type === 'PICKUP_PIN' || o.isPinned)}
        onDispatchToPin={handlePinTargetForRobot}
        onTriggerIntro={handleTriggerIntro}
        savedLayouts={savedLayouts}
        onSaveCurrentLayout={handleSaveCurrentLayout}
        onLoadSavedLayout={handleLoadSavedLayout}
        onDeleteSavedLayout={handleDeleteSavedLayout}
        currentGridSize={gridSize}
        currentPlacedObjectsCount={placedObjects.length}
      />

      {/* 7. OBJECT INSPECTOR (ONLY ACTIVE IN SETTING MODE) */}
      {appMode === 'SETTING' && (
        <ObjectInspector
          selectedObject={selectedObject}
          onUpdateObject={handleUpdateObject}
          onDeleteObject={handleDeleteObject}
          onPinTargetForRobot={handlePinTargetForRobot}
          onClose={() => setSelectedObject(null)}
        />
      )}
    </div>
  );
}

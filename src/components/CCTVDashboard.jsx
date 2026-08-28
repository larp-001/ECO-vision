import React, { useState, useEffect, useRef } from 'react';
import { MOCK_VIDEO_LOGS } from '../data/mockData.js';

const TAG_LABELS = {
  ALL: 'ทั้งหมด',
  NORMAL_PICK: 'หยิบปกติ',
  DEFECT_FOUND: 'พบตำหนิ',
  FALLEN_ITEM: 'ของตกพื้น',
};

const ACTION_LABELS = {
  PICK_AND_VERIFY: 'ยกและตรวจสอบ',
  MULTI_DISPATCH: 'จ่ายหลายรายการ',
  VISION_INSPECT_FAIL: 'ตรวจพบตำหนิ',
  POINT_TO_PICK: 'ชี้เพื่อสั่งหยิบ',
  SPATIAL_ANOMALY_LOG: 'ของตกพื้น',
  LIVE_STREAM: 'ถ่ายทอดสด',
};

export default function CCTVDashboard({ onOpenVideoLog, onTriggerPick }) {
  const [isPointToPickActive, setIsPointToPickActive] = useState(false);
  const [targetCoordinate, setTargetCoordinate] = useState(null);
  const [filterTag, setFilterTag] = useState('ALL');
  const [streamOverlayTime, setStreamOverlayTime] = useState(new Date().toLocaleTimeString('th-TH'));
  const [activeDefectTest, setActiveDefectTest] = useState(false);

  // Real Camera States
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [cameraMode, setCameraMode] = useState('webcam'); // 'webcam' | 'simulation'
  const [cameraStatus, setCameraStatus] = useState('initializing'); // 'active', 'permission_needed', 'no_camera', 'error', 'simulation'
  const [errorMessage, setErrorMessage] = useState('');
  const [isMirrored, setIsMirrored] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamOverlayTime(new Date().toLocaleTimeString('th-TH'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch available camera devices
  const refreshDevices = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return [];
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(d => d.kind === 'videoinput');
      setVideoDevices(videoInputs);
      return videoInputs;
    } catch (err) {
      console.warn('Error enumerating devices:', err);
      return [];
    }
  };

  // Start live webcam stream
  const startCamera = async (deviceIdToUse) => {
    if (cameraMode !== 'webcam') return;
    setCameraStatus('initializing');
    setErrorMessage('');

    // Clean up previous tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraStatus('error');
        setErrorMessage('เบราว์เซอร์นี้ไม่รองรับการเข้าถึงกล้อง (WebRTC)');
        return;
      }

      const constraints = {
        video: deviceIdToUse
          ? { deviceId: { exact: deviceIdToUse }, width: { ideal: 1920 }, height: { ideal: 1080 } }
          : { width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.log('Video play error:', e));
      }
      setCameraStatus('active');

      // Refresh devices to get friendly labels now that permission is granted
      await refreshDevices();
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const settings = videoTrack.getSettings ? videoTrack.getSettings() : {};
        if (settings.deviceId && !deviceIdToUse) {
          setSelectedDeviceId(settings.deviceId);
        }
      }
    } catch (err) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraStatus('permission_needed');
        setErrorMessage('โปรดอนุญาตการเข้าถึงกล้องในเบราว์เซอร์');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraStatus('no_camera');
        setErrorMessage('ไม่พบอุปกรณ์กล้องที่เชื่อมต่อกับคอมพิวเตอร์');
      } else {
        setCameraStatus('error');
        setErrorMessage(`ไม่สามารถเปิดกล้องได้: ${err.message || err.name}`);
      }
    }
  };

  useEffect(() => {
    if (cameraMode === 'webcam') {
      startCamera(selectedDeviceId);
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setCameraStatus('simulation');
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraMode, selectedDeviceId]);

  // Listen to camera plug/unplug events
  useEffect(() => {
    const handleDeviceChange = () => {
      refreshDevices();
    };
    if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
      return () => navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    }
  }, []);

  const handleVideoCanvasClick = (e) => {
    if (!isPointToPickActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setTargetCoordinate({ x, y });

    setTimeout(() => {
      alert(`สั่งหยิบตามจุดที่ชี้แล้ว!\nแขนหุ่นยนต์ล็อกเป้าที่ตำแหน่ง [X: ${x}, Y: ${y}] กำลังเคลื่อนที่ไปหยิบ...`);
      setIsPointToPickActive(false);
      setTargetCoordinate(null);
      if (onTriggerPick) onTriggerPick({ x, y });
    }, 400);
  };

  const filteredLogs = filterTag === 'ALL'
    ? MOCK_VIDEO_LOGS
    : MOCK_VIDEO_LOGS.filter(l => l.tag === filterTag);

  const selectedDeviceObj = videoDevices.find(d => d.deviceId === selectedDeviceId);
  const activeCameraLabel = cameraMode === 'webcam'
    ? (selectedDeviceObj?.label || (videoDevices.length > 0 ? videoDevices[0].label : 'กล้องเว็บแคมจริง'))
    : 'แบบจำลอง 3D (Simulation)';

  return (
    <div className="dashboard-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '16px',
      padding: '16px',
      height: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      {/* LEFT COLUMN: LIVE FEED + POINT-TO-PICK */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span className={`status-pulse ${cameraMode === 'webcam' && cameraStatus === 'active' ? 'green' : 'red'}`}></span>
              <h2 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                ภาพสดจากกล้องหุ่นยนต์
                <span style={{ color: 'var(--tech-cyan)', fontSize: '0.78rem', fontWeight: 500 }}>
                  [{activeCameraLabel}]
                </span>
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setIsPointToPickActive(!isPointToPickActive)}
                className={`btn-cyber ${isPointToPickActive ? 'btn-cyber-primary' : ''}`}
                style={{ fontSize: '0.76rem', padding: '6px 12px' }}
              >
                {isPointToPickActive ? 'แตะที่จอเพื่อสั่งหยิบ...' : 'เปิดโหมดชี้เพื่อสั่งหยิบ'}
              </button>
              <button
                onClick={() => setActiveDefectTest(!activeDefectTest)}
                className="btn-cyber"
                style={{ fontSize: '0.76rem', padding: '6px 12px', borderColor: activeDefectTest ? 'var(--warning-amber)' : 'var(--border-subtle)', color: activeDefectTest ? 'var(--warning-amber)' : 'var(--text-main)' }}
              >
                {activeDefectTest ? 'กำลังทดสอบตรวจจับตำหนิ' : 'ทดสอบตรวจจับตำหนิ (AI)'}
              </button>
            </div>
          </div>

          {/* Camera Selection & Mode Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap',
            background: 'rgba(15, 23, 42, 0.04)',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.06)'
          }}>
            {/* Camera selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                📷 เลือกกล้อง:
              </label>
              <select
                value={selectedDeviceId}
                onChange={(e) => {
                  setSelectedDeviceId(e.target.value);
                  setCameraMode('webcam');
                }}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  background: '#0f172a',
                  color: '#38bdf8',
                  border: '1px solid #334155',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  outline: 'none',
                  cursor: 'pointer',
                  minWidth: '180px',
                  maxWidth: '260px'
                }}
              >
                {videoDevices.length === 0 ? (
                  <option value="">กล้องเริ่มต้น / กล้องระบบ (Default)</option>
                ) : (
                  videoDevices.map((dev, idx) => (
                    <option key={dev.deviceId || idx} value={dev.deviceId}>
                      {dev.label ? dev.label : `กล้องอุปกรณ์ #${idx + 1}`}
                    </option>
                  ))
                )}
              </select>

              {/* Mode Toggle */}
              <div style={{ display: 'flex', gap: '2px', background: '#0f172a', padding: '3px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                <button
                  type="button"
                  onClick={() => setCameraMode('webcam')}
                  style={{
                    padding: '4px 9px',
                    borderRadius: '4px',
                    border: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: cameraMode === 'webcam' ? '#10b981' : 'transparent',
                    color: cameraMode === 'webcam' ? '#000' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📷 กล้องสดจริง
                </button>
                <button
                  type="button"
                  onClick={() => setCameraMode('simulation')}
                  style={{
                    padding: '4px 9px',
                    borderRadius: '4px',
                    border: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: cameraMode === 'simulation' ? '#3b82f6' : 'transparent',
                    color: cameraMode === 'simulation' ? '#fff' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🌐 แบบจำลอง 3D
                </button>
              </div>

              {/* Mirror toggle for webcam */}
              {cameraMode === 'webcam' && (
                <button
                  type="button"
                  onClick={() => setIsMirrored(!isMirrored)}
                  title="สลับมุมมองกระจก (Mirror Camera)"
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: isMirrored ? 'rgba(56, 189, 248, 0.15)' : '#0f172a',
                    border: isMirrored ? '1px solid #38bdf8' : '1px solid #334155',
                    color: isMirrored ? '#38bdf8' : 'rgba(255,255,255,0.8)',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>🪞</span>
                  <span>{isMirrored ? 'กลับด้าน: เปิด' : 'กลับด้าน: ปิด'}</span>
                </button>
              )}
            </div>

            {/* Status indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem' }}>
              {cameraMode === 'webcam' && cameraStatus === 'active' && (
                <span className="hud-badge hud-badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }} />
                  เชื่อมต่อกล้องจริงแล้ว
                </span>
              )}
              {cameraMode === 'webcam' && cameraStatus === 'permission_needed' && (
                <span className="hud-badge hud-badge-red">รออนุญาตสิทธิ์กล้อง</span>
              )}
              {cameraMode === 'simulation' && (
                <span className="hud-badge hud-badge-cyan">โหมดจำลอง 3D</span>
              )}
              <span className="hud-badge hud-badge-red">● ถ่ายทอดสด</span>
              <span style={{ color: 'var(--text-dim)' }}>60 FPS · 14.8 Mbps</span>
            </div>
          </div>

          {/* Realistic Robot POV Camera Stream Screen */}
          <div
            onClick={handleVideoCanvasClick}
            style={{
              position: 'relative',
              height: '360px',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: isPointToPickActive ? 'crosshair' : 'default',
              background: '#0d131a',
              border: isPointToPickActive ? '2px dashed #00e676' : '1px solid #1e293b',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.15)',
            }}
          >
            {/* LIVE WEBCAM VIDEO FEED */}
            {cameraMode === 'webcam' && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isMirrored ? 'scaleX(-1)' : 'none',
                  display: cameraStatus === 'active' ? 'block' : 'none',
                  zIndex: 1,
                }}
              />
            )}

            {/* WEBCAM ERROR / PERMISSION FALLBACK SCREEN */}
            {cameraMode === 'webcam' && cameraStatus !== 'active' && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(ellipse at 50% 50%, #1e293b 0%, #090d14 100%)',
                color: '#fff',
                gap: '10px',
                padding: '24px',
                textAlign: 'center',
                zIndex: 10
              }}>
                <div style={{ fontSize: '2.5rem' }}>📹</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f87171' }}>
                  {cameraStatus === 'permission_needed' ? 'ต้องการสิทธิ์การเข้าถึงกล้อง' : (errorMessage || 'กำลังเชื่อมต่อสัญญาณกล้อง...')}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', maxWidth: '380px', lineHeight: 1.5 }}>
                  {cameraStatus === 'permission_needed'
                    ? 'โปรดกด "อนุญาต (Allow)" ในหน้าต่างเบราว์เซอร์ เพื่อให้ระบบ Vision AI ดึงภาพสดจากกล้องที่เชื่อมต่อ'
                    : 'ไม่พบสัญญาณจากกล้องที่เลือก สามารถกดลองใหม่อีกครั้ง หรือสลับไปใช้โหมดจำลอง 3D'}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button
                    onClick={() => startCamera(selectedDeviceId)}
                    className="btn-cyber btn-cyber-primary"
                    style={{ fontSize: '0.8rem', padding: '6px 16px' }}
                  >
                    🔄 ลองเชื่อมต่อใหม่
                  </button>
                  <button
                    onClick={() => setCameraMode('simulation')}
                    className="btn-cyber"
                    style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                  >
                    🌐 สลับใช้แบบจำลอง 3D
                  </button>
                </div>
              </div>
            )}

            {/* 3D Warehouse Corridor Simulation (Shown when cameraMode === 'simulation') */}
            {cameraMode === 'simulation' && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 40%, #1a2636 0%, #0a0f16 75%, #05080c 100%)',
                overflow: 'hidden',
                zIndex: 1,
              }}>
                {/* Floor grid / perspective road lanes */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%) perspective(280px) rotateX(55deg)',
                  width: '600px',
                  height: '240px',
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(16,185,129,0.08) 60%, rgba(16,185,129,0.18) 100%)',
                  backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 60px)',
                  borderTop: '1px solid rgba(16,185,129,0.3)',
                }}>
                  {/* Center Road Guide Line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: '6px',
                    transform: 'translateX(-50%)',
                    background: 'repeating-linear-gradient(to bottom, #10b981 0px, #10b981 20px, transparent 20px, transparent 40px)',
                    boxShadow: '0 0 10px rgba(16,185,129,0.5)',
                  }} />
                </div>

                {/* Left Warehouse Shelf Rack Silhouette */}
                <div style={{
                  position: 'absolute',
                  top: '15%',
                  bottom: '10%',
                  left: '2%',
                  width: '18%',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  background: 'linear-gradient(135deg, rgba(30,58,138,0.25) 0%, rgba(15,23,42,0.6) 100%)',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  padding: '6px',
                }}>
                  <div style={{ height: '3px', background: '#3b82f6', opacity: 0.6, boxShadow: '0 0 6px #3b82f6' }} />
                  <div style={{ height: '3px', background: '#3b82f6', opacity: 0.6, boxShadow: '0 0 6px #3b82f6' }} />
                  <div style={{ height: '3px', background: '#3b82f6', opacity: 0.6, boxShadow: '0 0 6px #3b82f6' }} />
                </div>

                {/* Right Warehouse Shelf Rack Silhouette */}
                <div style={{
                  position: 'absolute',
                  top: '15%',
                  bottom: '10%',
                  right: '2%',
                  width: '18%',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  background: 'linear-gradient(225deg, rgba(30,58,138,0.25) 0%, rgba(15,23,42,0.6) 100%)',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  padding: '6px',
                }}>
                  <div style={{ height: '3px', background: '#3b82f6', opacity: 0.6, boxShadow: '0 0 6px #3b82f6' }} />
                  <div style={{ height: '3px', background: '#3b82f6', opacity: 0.6, boxShadow: '0 0 6px #3b82f6' }} />
                  <div style={{ height: '3px', background: '#3b82f6', opacity: 0.6, boxShadow: '0 0 6px #3b82f6' }} />
                </div>
              </div>
            )}

            {/* 2. AI Computer Vision Bounding Boxes Overlay (Floating over Live Video / Simulation) */}
            {/* Box 1: Left Rack Inspection Box */}
            <div style={{
              position: 'absolute',
              top: '22%',
              left: '23%',
              width: '120px',
              height: '80px',
              border: '1.5px solid #00e676',
              background: 'rgba(0, 230, 118, 0.08)',
              borderRadius: '3px',
              padding: '3px 5px',
              boxShadow: '0 0 12px rgba(0,230,118,0.2)',
              zIndex: 15,
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '-1px',
                background: '#00e676',
                color: '#000',
                fontSize: '0.58rem',
                fontWeight: '700',
                padding: '1px 4px',
                borderRadius: '2px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}>
                [BAY-A01] 99.8% READY
              </div>
            </div>

            {/* Box 2: Center Moving Cargo Box (Inbound Pallet) */}
            <div style={{
              position: 'absolute',
              top: '44%',
              left: '42%',
              width: '140px',
              height: '95px',
              border: activeDefectTest ? '2px solid #ef4444' : '1.5px solid #00e5ff',
              background: activeDefectTest ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 229, 255, 0.08)',
              borderRadius: '3px',
              padding: '4px',
              boxShadow: activeDefectTest ? '0 0 16px rgba(239,68,68,0.4)' : '0 0 12px rgba(0,229,255,0.25)',
              transition: 'all 0.3s ease',
              zIndex: 15,
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '-1px',
                background: activeDefectTest ? '#ef4444' : '#00e5ff',
                color: '#000',
                fontSize: '0.58rem',
                fontWeight: '700',
                padding: '1px 4px',
                borderRadius: '2px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}>
                {activeDefectTest ? '⚠ DEFECT DETECTED' : '[PARCEL-BOX-01] 99.4% QC'}
              </div>
            </div>

            {/* Box 3: Right Rack Inspection Box */}
            <div style={{
              position: 'absolute',
              top: '26%',
              right: '23%',
              width: '110px',
              height: '75px',
              border: '1.5px solid #f59e0b',
              background: 'rgba(245, 158, 11, 0.08)',
              borderRadius: '3px',
              padding: '3px 5px',
              boxShadow: '0 0 12px rgba(245,158,11,0.2)',
              zIndex: 15,
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '-1px',
                background: '#f59e0b',
                color: '#000',
                fontSize: '0.58rem',
                fontWeight: '700',
                padding: '1px 4px',
                borderRadius: '2px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}>
                [BAY-B02] TARGET SLOT
              </div>
            </div>

            {/* 3. Optical Crosshair HUD Overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '140px',
              zIndex: 20,
            }}>
              {/* Outer HUD Corner Reticles */}
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '1px dashed rgba(0, 229, 255, 0.35)',
                borderRadius: '50%',
              }} />
              {/* Crosshair Center Reticle */}
              <div style={{
                width: '16px',
                height: '16px',
                border: '1.5px solid #00e676',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: '4px', height: '4px', background: '#00e676', borderRadius: '50%' }} />
              </div>
              <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'rgba(0, 229, 255, 0.25)' }} />
              <div style={{ position: 'absolute', top: 0, bottom: 0, width: '1px', background: 'rgba(0, 229, 255, 0.25)' }} />
            </div>

            {/* 4. Top Telemetry Banner Overlay */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '12px',
              right: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.66rem',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'monospace',
              pointerEvents: 'none',
              zIndex: 25,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>● REC [4K HDR]</span>
                <span>ISO 400</span>
                <span>F/1.8</span>
                <span>FOV 110°</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00e5ff' }}>
                <span>FPS: 60</span>
                <span>PING: 12ms</span>
                <span>AI: JETSON ORIN</span>
              </div>
            </div>

            {/* Target Coordinate Pin if Point-to-Pick clicked */}
            {targetCoordinate && (
              <div style={{
                position: 'absolute',
                left: `${targetCoordinate.x}px`,
                top: `${targetCoordinate.y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 35,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '2px solid #00e676',
                  boxShadow: '0 0 15px #00e676',
                }} />
                <span style={{
                  background: '#00e676',
                  color: '#000',
                  fontWeight: '700',
                  fontSize: '0.65rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginTop: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  ล็อกเป้าหมายแล้ว
                </span>
              </div>
            )}

            {/* Bottom Camera Info Footer */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '12px',
              right: '12px',
              zIndex: 25,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'monospace',
              pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
              padding: '4px 6px',
              borderRadius: '4px',
            }}>
              <span>กล้อง AMR: {activeCameraLabel} · วิชั่น AI โมเดล V3</span>
              <span style={{ color: '#00e676', fontWeight: 600 }}>ยืนยันซ้ำด้วยเรดาร์ · {streamOverlayTime}</span>
            </div>
          </div>

          {/* Point-to-Pick Helper Notification */}
          {isPointToPickActive && (
            <div style={{
              background: 'var(--eco-green-soft)',
              padding: '10px 14px',
              borderRadius: '9px',
              fontSize: '0.82rem',
              color: 'var(--eco-green-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span><strong>โหมด AR แบบโต้ตอบ:</strong> แตะที่ตำแหน่งใดก็ได้บนภาพวิดีโอด้านบน เพื่อสั่งหุ่นยนต์ล็อกพิกัดและเคลื่อนที่ไปหยิบทันที</span>
            </div>
          )}
        </div>

        {/* Smart Event Timeline Bar */}
        <div className="glass-panel" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: '700' }}>
              ไทม์ไลน์เหตุการณ์
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              คลิกเพื่อดูวิดีโอย้อนหลัง
            </span>
          </div>

          {/* Timeline Bar Track */}
          <div style={{ position: 'relative', height: '6px', background: '#eef0f2', borderRadius: '999px', margin: '18px 6px 0' }}>
            {MOCK_VIDEO_LOGS.map((log, index) => {
              const leftPos = 8 + index * 20;
              const isDefect = log.anomalyDetected;
              return (
                <div
                  key={log.id}
                  onClick={() => onOpenVideoLog(log)}
                  style={{
                    position: 'absolute',
                    left: `${leftPos}%`,
                    top: '-4px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: isDefect ? 'var(--danger-red)' : 'var(--tech-cyan)',
                    border: '2px solid #fff',
                    boxShadow: `0 0 0 1px ${isDefect ? 'var(--danger-red)' : 'var(--tech-cyan)'}`,
                    cursor: 'pointer',
                  }}
                  title={`${log.timestamp} - ${log.skuName}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: VIDEO-BACKED AUDIT LOG TABLE */}
      <div className="glass-panel" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', margin: 0 }}>
              บันทึกวิดีโอตรวจสอบ
            </h3>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', margin: '2px 0 0' }}>
              หลักฐานย้อนหลังทุกการหยิบ 5–10 วินาที
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['ALL', 'NORMAL_PICK', 'DEFECT_FOUND', 'FALLEN_ITEM'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                style={{
                  background: filterTag === tag ? 'var(--tech-cyan-soft)' : 'transparent',
                  border: filterTag === tag ? '1px solid var(--tech-cyan)' : '1px solid var(--border-subtle)',
                  color: filterTag === tag ? 'var(--tech-cyan)' : 'var(--text-dim)',
                  borderRadius: '999px',
                  padding: '3px 9px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {TAG_LABELS[tag]}
              </button>
            ))}
          </div>
        </div>

        {/* Logs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', overflowY: 'auto', flex: 1 }}>
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => onOpenVideoLog(log)}
              style={{
                background: log.anomalyDetected ? 'var(--danger-red-soft)' : '#fff',
                border: log.anomalyDetected ? '1px solid #fecaca' : '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '11px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`hud-badge ${log.anomalyDetected ? 'hud-badge-red' : 'hud-badge-cyan'}`} style={{ fontSize: '0.62rem' }}>
                  {ACTION_LABELS[log.action] || log.action}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                  {log.timestamp}
                </span>
              </div>

              <div style={{ fontWeight: '600', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                {log.skuName}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{log.shelfLocation}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: log.anomalyDetected ? 'var(--danger-red)' : 'var(--eco-green-dark)' }}>
                  ▶ เล่นคลิป ({log.durationSec}s)
                </span>
              </div>

              {log.anomalyDetected && (
                <div style={{ fontSize: '0.72rem', color: 'var(--danger-red)', marginTop: '2px' }}>
                  {log.defectReason}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div style={{
          padding: '10px 14px',
          background: 'var(--tech-cyan-soft)',
          borderRadius: '999px',
          fontSize: '0.76rem',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'var(--text-muted)'
        }}>
          <span>วันนี้ทั้งหมด: <strong style={{ color: 'var(--text-main)' }}>148 คลิป</strong></span>
          <span style={{ color: 'var(--tech-cyan)', fontWeight: 600 }}>ซิงก์ขึ้นคลาวด์แล้ว 100%</span>
        </div>
      </div>
    </div>
  );
}

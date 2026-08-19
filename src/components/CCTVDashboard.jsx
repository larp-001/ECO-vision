import React, { useState, useEffect } from 'react';
import { MOCK_VIDEO_LOGS } from '../data/mockData';

export default function CCTVDashboard({ onOpenVideoLog, onTriggerPick }) {
  const [selectedLog, setSelectedLog] = useState(MOCK_VIDEO_LOGS[0]);
  const [isPointToPickActive, setIsPointToPickActive] = useState(false);
  const [targetCoordinate, setTargetCoordinate] = useState(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [filterTag, setFilterTag] = useState('ALL');
  const [streamOverlayTime, setStreamOverlayTime] = useState(new Date().toLocaleTimeString());
  const [activeDefectTest, setActiveDefectTest] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamOverlayTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVideoCanvasClick = (e) => {
    if (!isPointToPickActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setTargetCoordinate({ x, y });
    
    // Simulate robot dispatch for Point-to-Pick
    setTimeout(() => {
      alert(`POINT-TO-PICK DISPATCHED!\nRobot arm locked onto target coordinates [X: ${x}, Y: ${y}]. Moving to pick location...`);
      setIsPointToPickActive(false);
      setTargetCoordinate(null);
      if (onTriggerPick) onTriggerPick({ x, y });
    }, 400);
  };

  const filteredLogs = filterTag === 'ALL' 
    ? MOCK_VIDEO_LOGS 
    : MOCK_VIDEO_LOGS.filter(l => l.tag === filterTag);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '16px',
      padding: '16px',
      height: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      {/* LEFT COLUMN: LIVE MOBILE CCTV STREAM + POINT-TO-PICK */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Main CCTV Feed Card */}
        <div className="glass-panel" style={{ padding: '16px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="tech-corner-tl"></div>
          <div className="tech-corner-br"></div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="status-pulse red"></span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                MOBILE CCTV LIVE FEED <span style={{ color: 'var(--tech-cyan)', fontSize: '0.85rem' }}>[CAM-01 4K HDR]</span>
              </h2>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setIsPointToPickActive(!isPointToPickActive)}
                className={`btn-cyber ${isPointToPickActive ? 'btn-cyber-primary' : ''}`}
                style={{ fontSize: '0.78rem', padding: '4px 10px' }}
              >
                {isPointToPickActive ? 'TAP SCREEN TO PICK...' : 'ENABLE POINT-TO-PICK'}
              </button>
              <button
                onClick={() => setActiveDefectTest(!activeDefectTest)}
                className="btn-cyber"
                style={{ fontSize: '0.78rem', padding: '4px 10px', borderColor: 'var(--warning-amber)', color: 'var(--warning-amber)' }}
              >
                {activeDefectTest ? 'DEFECT SIM: ON' : 'TEST DEFECT AI'}
              </button>
            </div>
          </div>

          {/* Simulated 4K CCTV Screen */}
          <div
            onClick={handleVideoCanvasClick}
            style={{
              position: 'relative',
              height: '380px',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: isPointToPickActive ? 'crosshair' : 'default',
              background: 'linear-gradient(135deg, #09131a 0%, #03080e 100%)',
              border: isPointToPickActive ? '2px dashed var(--eco-green)' : '1px solid var(--border-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)'
            }}
          >
            <div className="scanline-overlay"></div>

            {/* Simulated Live Warehouse Scene Elements */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              padding: '20px',
              opacity: 0.85
            }}>
              {/* Simulated Shelf Rows */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                height: '140px',
                borderBottom: '2px solid rgba(0, 176, 255, 0.2)'
              }}>
                {[
                  { name: 'SKU-CHEM-101', pass: true, tag: 'REAGENT 98%' },
                  { name: 'SKU-MED-204', pass: true, tag: 'BUFFER SOL' },
                  { name: 'SKU-IND-409', pass: !activeDefectTest, tag: activeDefectTest ? 'MICRO-STRESS' : 'CARBONATE' },
                  { name: 'SKU-BIO-512', pass: true, tag: 'MEDIUM 1L' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: item.pass ? '1px solid rgba(0, 230, 118, 0.4)' : '2px solid var(--danger-red)',
                      borderRadius: '6px',
                      background: item.pass ? 'rgba(0, 230, 118, 0.05)' : 'rgba(255, 23, 68, 0.15)',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-mono)',
                      color: item.pass ? 'var(--eco-green)' : 'var(--danger-red)',
                      fontWeight: 'bold'
                    }}>
                      {item.pass ? '✓ QC OK [99.8%]' : 'DEFECT DETECTED'}
                    </span>
                    <div style={{ textAlign: 'center', color: item.pass ? '#34d399' : '#ef4444', display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                      {item.pass ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 2v7.31L4.62 17.6A2 2 0 0 0 6.3 20.6h11.4a2 2 0 0 0 1.68-3L14 9.31V2"></path>
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      )}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Floor Guideline & Robot Arm Focal Target */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '120px',
                position: 'relative'
              }}>
                {/* Robot Target Crosshair */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  border: '1px dashed var(--tech-cyan)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'radar-sweep 8s linear infinite'
                }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--eco-green)', borderRadius: '50%' }}></div>
                </div>
              </div>
            </div>

            {/* Target Coordinate Pin if Point-to-Pick clicked */}
            {targetCoordinate && (
              <div style={{
                position: 'absolute',
                left: `${targetCoordinate.x}px`,
                top: `${targetCoordinate.y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid var(--eco-green)',
                  boxShadow: '0 0 15px var(--eco-green)',
                  animation: 'pulse-ring 1s infinite'
                }}></div>
                <span className="hud-badge hud-badge-green" style={{ fontSize: '0.65rem', marginTop: '4px' }}>
                  PICK TARGET LOCKED
                </span>
              </div>
            )}

            {/* CCTV Stream HUD Top Left */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 20,
              display: 'flex',
              gap: '6px'
            }}>
              <span className="hud-badge hud-badge-red" style={{ animation: 'glow-fade 1.5s infinite' }}>
                ● LIVE CCTV
              </span>
              <span className="hud-badge hud-badge-cyan">
                ROLLING BUFFER: 24/7 ACTIVE
              </span>
            </div>

            {/* CCTV Stream HUD Top Right */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 20,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--eco-green)',
              background: 'rgba(0,0,0,0.7)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {streamOverlayTime} • 60 FPS • BITRATE 14.8 Mbps
            </div>

            {/* Bottom Stream Status */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '12px',
              right: '12px',
              zIndex: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              background: 'rgba(5, 10, 15, 0.75)',
              padding: '4px 10px',
              borderRadius: '4px'
            }}>
              <span>AMR CAM: SONY IMX586 + EDGE INFERENCE JETSON ORIN</span>
              <span style={{ color: 'var(--eco-green)' }}>DOUBLE-AUTHENTICATED BY mmWAVE</span>
            </div>
          </div>

          {/* Point-to-Pick Helper Notification */}
          {isPointToPickActive && (
            <div style={{
              background: 'rgba(0, 230, 118, 0.12)',
              border: '1px solid var(--eco-green)',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span><strong>Interactive AR Mode:</strong> Click any bottle, box, or shelf position on the video stream above to instantly dispatch the AMR to that coordinate!</span>
            </div>
          )}
        </div>

        {/* Smart Event Timeline Bar */}
        <div className="glass-panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', letterSpacing: '0.04em' }}>
              SMART CCTV TIMELINE (AI EVENT BOOKMARKS)
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              CLICK ANY EVENT TO WARP VIDEO
            </span>
          </div>

          {/* Timeline Bar Track */}
          <div style={{
            position: 'relative',
            height: '42px',
            background: 'rgba(8, 14, 22, 0.9)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px'
          }}>
            {/* Timeline hour ticks */}
            <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
              {/* Event Bookmark Pins on Timeline */}
              {MOCK_VIDEO_LOGS.map((log, index) => {
                const leftPos = 15 + index * 18;
                const isDefect = log.anomalyDetected;
                return (
                  <div
                    key={log.id}
                    onClick={() => onOpenVideoLog(log)}
                    style={{
                      position: 'absolute',
                      left: `${leftPos}%`,
                      top: '-14px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 10
                    }}
                    title={`${log.timestamp} - ${log.skuName}`}
                  >
                    <div style={{
                      padding: '2px 5px',
                      borderRadius: '3px',
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-mono)',
                      background: isDefect ? 'var(--danger-red)' : 'var(--tech-cyan)',
                      color: '#000',
                      fontWeight: 'bold',
                      boxShadow: isDefect ? '0 0 8px var(--danger-red)' : '0 0 8px var(--tech-cyan)'
                    }}>
                      {log.timestamp}
                    </div>
                    <div style={{ width: '2px', height: '14px', background: isDefect ? 'var(--danger-red)' : 'var(--tech-cyan)' }}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: VIDEO-BACKED AUDIT LOG TABLE */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="tech-corner-tl"></div>
        <div className="tech-corner-br"></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>
              VIDEO-BACKED AUDIT LOGS
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              100% Immutable Evidence Clips (5-10s)
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {['ALL', 'NORMAL_PICK', 'DEFECT_FOUND', 'FALLEN_ITEM'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                style={{
                  background: filterTag === tag ? 'rgba(0, 176, 255, 0.2)' : 'transparent',
                  border: filterTag === tag ? '1px solid var(--tech-cyan)' : '1px solid var(--border-subtle)',
                  color: filterTag === tag ? 'var(--tech-cyan)' : 'var(--text-dim)',
                  borderRadius: '4px',
                  padding: '3px 6px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                {tag.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Logs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1 }}>
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => onOpenVideoLog(log)}
              style={{
                background: 'rgba(12, 19, 28, 0.7)',
                border: log.anomalyDetected ? '1px solid rgba(255, 23, 68, 0.4)' : '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '10px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--tech-cyan)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = log.anomalyDetected ? 'rgba(255, 23, 68, 0.4)' : 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className={`hud-badge ${log.anomalyDetected ? 'hud-badge-red' : 'hud-badge-green'}`} style={{ fontSize: '0.62rem' }}>
                    {log.action}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {log.timestamp}
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--tech-cyan)' }}>
                  ▶ PLAY CLIP ({log.durationSec}s)
                </span>
              </div>

              <div style={{ fontWeight: '600', fontSize: '0.88rem', color: '#fff' }}>
                {log.skuName}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                <span>{log.shelfLocation}</span>
                <span style={{ color: log.anomalyDetected ? 'var(--danger-red)' : 'var(--eco-green)' }}>
                  Conf: {log.confidence}
                </span>
              </div>

              {log.anomalyDetected && (
                <div style={{ fontSize: '0.7rem', color: '#ff8a80', background: 'rgba(255,23,68,0.1)', padding: '3px 6px', borderRadius: '4px' }}>
                  {log.defectReason}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div style={{
          padding: '8px 12px',
          background: 'rgba(0, 176, 255, 0.05)',
          borderRadius: '6px',
          border: '1px solid rgba(0, 176, 255, 0.2)',
          fontSize: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'var(--text-muted)'
        }}>
          <span>Total Today: <strong>148 Clips</strong></span>
          <span style={{ color: 'var(--eco-green)' }}>Auto-Synced to Cloud: 100%</span>
        </div>
      </div>
    </div>
  );
}

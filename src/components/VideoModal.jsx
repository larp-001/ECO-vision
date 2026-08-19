import React, { useState, useEffect } from 'react';

export default function VideoModal({ log, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(3.5);
  const [activeTab, setActiveTab] = useState('METRICS'); // METRICS | AI_LAYER | CONTEXT

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= (log.durationSec || 8.0)) return 0;
          return +(prev + 0.1).toFixed(1);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, log.durationSec]);

  if (!log) return null;

  const progressPercent = (currentTime / (log.durationSec || 8.0)) * 100;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(3, 7, 12, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border-cyan)',
        boxShadow: '0 0 40px rgba(0, 176, 255, 0.25)',
        overflow: 'hidden'
      }}>
        <div className="tech-corner-tl"></div>
        <div className="tech-corner-br"></div>

        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(8, 14, 22, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="status-pulse green"></span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                  VIDEO-BACKED AUDIT LOG: <span style={{ color: 'var(--tech-cyan)' }}>{log.id}</span>
                </h3>
                <span className={`hud-badge ${log.anomalyDetected ? 'hud-badge-amber' : 'hud-badge-green'}`}>
                  {log.status}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Target: {log.skuName} ({log.skuId}) • Time: {log.timestamp} • Operator: {log.operator}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              borderRadius: '6px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = 'var(--danger-red)'; }}
            onMouseOut={(e) => { e.target.style.color = 'var(--text-muted)'; e.target.style.borderColor = 'var(--border-subtle)'; }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '16px',
          padding: '18px 20px',
          overflowY: 'auto',
          flex: 1
        }}>
          {/* Left: Video Player Simulation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              height: '320px',
              background: log.previewBg || 'linear-gradient(135deg, #09121a, #03080e)',
              border: '1px solid rgba(0, 176, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)'
            }}>
              <div className="scanline-overlay"></div>

              {/* Synthetic Camera HUD Elements */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                zIndex: 20,
                display: 'flex',
                gap: '8px'
              }}>
                <span className="hud-badge hud-badge-red" style={{ animation: 'pulse-ring 2s infinite' }}>
                  ● REC CLIP [5-10s BUFFER]
                </span>
                <span className="hud-badge hud-badge-cyan">
                  CAM_01: 4K_60FPS_HDR
                </span>
              </div>

              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 20,
                color: 'var(--eco-green)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                background: 'rgba(0,0,0,0.6)',
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                {log.timestamp} (+{currentTime.toFixed(1)}s)
              </div>

              {/* Simulated Robot Gripper & Shelf View */}
              <div style={{
                position: 'relative',
                width: '80%',
                height: '75%',
                border: '1px dashed rgba(0, 230, 118, 0.4)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 230, 118, 0.03)'
              }}>
                {/* AI Detection Bounding Box */}
                <div style={{
                  position: 'absolute',
                  width: '140px',
                  height: '140px',
                  border: log.anomalyDetected ? '2px solid var(--danger-red)' : '2px solid var(--eco-green)',
                  borderRadius: '6px',
                  boxShadow: log.anomalyDetected ? '0 0 15px rgba(255,23,68,0.5)' : '0 0 15px rgba(0,230,118,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '4px'
                }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    color: log.anomalyDetected ? 'var(--danger-red)' : 'var(--eco-green)',
                    background: 'rgba(0,0,0,0.85)',
                    padding: '1px 4px',
                    borderRadius: '2px',
                    alignSelf: 'flex-start'
                  }}>
                    {log.anomalyDetected ? 'DEFECT DETECTED [94%]' : 'AI_INSPECT: OK [99.8%]'}
                  </span>
                  
                  <div style={{ textAlign: 'center', color: log.anomalyDetected ? '#ef4444' : '#34d399', display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                    {log.anomalyDetected ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 2v7.31L4.62 17.6A2 2 0 0 0 6.3 20.6h11.4a2 2 0 0 0 1.68-3L14 9.31V2"></path>
                      </svg>
                    )}
                  </div>

                  <span style={{
                    fontSize: '0.6rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    background: 'rgba(0,0,0,0.7)',
                    padding: '1px 4px',
                    borderRadius: '2px',
                    textAlign: 'center'
                  }}>
                    POS: {log.shelfLocation.split(' ')[0]}
                  </span>
                </div>

                {/* Simulated Gripper Arm Shadow */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  width: '60px',
                  height: '30px',
                  borderTop: '4px solid var(--tech-cyan)',
                  borderLeft: '4px solid var(--tech-cyan)',
                  borderRight: '4px solid var(--tech-cyan)',
                  borderRadius: '6px 6px 0 0',
                  opacity: 0.8
                }}></div>
              </div>

              {/* Watermark */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-dim)'
              }}>
                IMMUTABLE AUDIT HASH: #SHA256_9b4e72c81a...
              </div>
            </div>

            {/* Video Player Controls */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              background: 'rgba(10, 16, 24, 0.8)',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)'
            }}>
              {/* Timeline seek bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  00:0{currentTime.toFixed(0)}
                </span>
                <div 
                  style={{
                    flex: 1,
                    height: '6px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '3px',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = clickX / rect.width;
                    setCurrentTime(+(newProgress * (log.durationSec || 8.0)).toFixed(1));
                  }}
                >
                  <div style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--tech-cyan), var(--eco-green))',
                    borderRadius: '3px',
                    boxShadow: '0 0 8px var(--eco-green)'
                  }}></div>
                  {/* Event Marker Pin */}
                  <div style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '45%',
                    width: '4px',
                    height: '14px',
                    background: 'var(--warning-amber)',
                    borderRadius: '2px',
                    boxShadow: '0 0 6px var(--warning-amber)'
                  }} title="AI Pick Tag"></div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  00:0{log.durationSec || 8.0}
                </span>
              </div>

              {/* Controls bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn-cyber"
                    style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                  <button 
                    className="btn-cyber"
                    style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    onClick={() => setCurrentTime(0)}
                  >
                    ↺ REPLAY
                  </button>
                  <button 
                    className="btn-cyber"
                    style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 1.5))}
                  >
                    -1.5s CONTEXT
                  </button>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--eco-green)', fontFamily: 'var(--font-mono)' }}>
                  ✓ DOUBLE-VERIFIED BY mmWAVE RADAR
                </span>
              </div>
            </div>
          </div>

          {/* Right: Inspection & Verification Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', gap: '8px' }}>
              {['METRICS', 'AI_LAYER', 'CONTEXT'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab ? '2px solid var(--tech-cyan)' : '2px solid transparent',
                    color: activeTab === tab ? 'var(--tech-cyan)' : 'var(--text-muted)',
                    padding: '6px 10px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    letterSpacing: '0.05em'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'METRICS' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TRANSACTION ID</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#fff', fontWeight: 'bold' }}>{log.id}</div>
                </div>

                <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SHELF / BIN COORDINATES</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--tech-cyan)' }}>{log.shelfLocation}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI CONFIDENCE</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--eco-green)', fontWeight: 'bold' }}>{log.confidence}</div>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CLIP DURATION</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#fff' }}>{log.durationSec}s Loop</div>
                  </div>
                </div>

                {log.anomalyDetected && (
                  <div style={{
                    background: 'rgba(255, 23, 68, 0.12)',
                    border: '1px solid var(--danger-red)',
                    padding: '10px',
                    borderRadius: '6px'
                  }}>
                    <span style={{ color: 'var(--danger-red)', fontWeight: 'bold', fontSize: '0.72rem' }}>
                      ANOMALY / DEFECT NOTE:
                    </span>
                    <div style={{ fontSize: '0.8rem', color: '#f8d7da', marginTop: '4px' }}>
                      {log.defectReason}
                    </div>
                  </div>
                )}

                <div style={{
                  background: 'rgba(0, 230, 118, 0.08)',
                  border: '1px solid rgba(0, 230, 118, 0.3)',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  lineHeight: '1.4'
                }}>
                  <strong style={{ color: 'var(--eco-green)' }}>✓ Zero Ghost-Log Security:</strong> Video snippet was generated on-robot Edge SSD and linked to WMS database with cryptographic timestamp.
                </div>
              </div>
            )}

            {activeTab === 'AI_LAYER' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
                  <strong>Vision Model:</strong> YOLOv9-Custom-LabChemicals
                </div>
                <div style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
                  <strong>Barcode / QR:</strong> Decoded [SKU-HEX-9821]
                </div>
                <div style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
                  <strong>Packaging Integrity:</strong> 99.4% Surface Smoothness
                </div>
                <div style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
                  <strong>Liquid Meniscus Estimator:</strong> 98.2% Volumetric
                </div>
              </div>
            )}

            {activeTab === 'CONTEXT' && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                <p><strong>Pre-Pick Context (-30s):</strong> AMR approached shelf at 0.6 m/s. mmWave radar verified clear corridor.</p>
                <p style={{ marginTop: '8px' }}><strong>Post-Pick Context (+30s):</strong> Item placed in secure bay holder. Barcode verified before transit dispatch.</p>
              </div>
            )}

            {/* Bottom Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
              <button 
                className="btn-cyber btn-cyber-primary" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                onClick={() => alert(`Clip ${log.id} exported as legal audit artifact (.mp4 + JSON metadata)`)}
              >
                EXPORT AUDIT SNIPPET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

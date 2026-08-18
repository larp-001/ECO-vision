import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, robotStatus, activeMode, setPowerMode }) {
  const navItems = [
    {
      id: 'CCTV',
      label: 'Vision AI & CCTV',
      icon: '🎥',
      badge: 'Live 4K',
      badgeColor: 'cyan',
      description: 'Video-Backed Log & Point-to-Pick',
    },
    {
      id: 'RADAR',
      label: 'mmWave Radar & NLOS',
      icon: '📡',
      badge: '360° Scan',
      badgeColor: 'green',
      description: 'Blind-spot & Fallen Object Safety',
    },
    {
      id: 'INVENTORY',
      label: 'Inventory & Digital Twin',
      icon: '📦',
      badge: 'Real-Time',
      badgeColor: 'cyan',
      description: '3D Lab & Warehouse Stock Grid',
    },
    {
      id: 'ADVISORY',
      label: 'AI Advisory & Slotting',
      icon: '🧠',
      badge: 'Approval',
      badgeColor: 'amber',
      description: 'Human-in-the-Loop Optimization',
    },
    {
      id: 'SLEEP',
      label: 'Night Sleep & Energy',
      icon: '🌙',
      badge: 'Save 90%',
      badgeColor: 'green',
      description: 'Security Radar & EOD Summary',
    },
  ];

  return (
    <aside className="glass-panel" style={{
      width: '290px',
      margin: '12px 0 12px 16px',
      padding: '20px 14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(10, 16, 24, 0.9)',
      flexShrink: 0
    }}>
      <div className="tech-corner-tl"></div>
      <div className="tech-corner-br"></div>

      {/* Top Brand & Logo */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '0 6px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--tech-cyan), var(--eco-green))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            boxShadow: '0 0 20px rgba(0, 230, 118, 0.4)'
          }}>
            🤖
          </div>
          <div>
            <h1 style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              letterSpacing: '0.06em',
              background: 'linear-gradient(90deg, #fff, var(--eco-green))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ECO-VISION
            </h1>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              STANDALONE ROBOT OS v4.2
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-dim)',
            padding: '0 8px',
            letterSpacing: '0.08em'
          }}>
            SYSTEM MODULES
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? 'linear-gradient(90deg, rgba(0, 176, 255, 0.2), rgba(0, 230, 118, 0.1))' : 'transparent',
                  border: isActive ? '1px solid var(--border-cyan)' : '1px solid transparent',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  width: '100%'
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '15%',
                    height: '70%',
                    width: '3px',
                    background: 'var(--eco-green)',
                    borderRadius: '0 3px 3px 0',
                    boxShadow: '0 0 8px var(--eco-green)'
                  }}></div>
                )}

                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontWeight: isActive ? '700' : '600',
                      fontSize: '0.92rem',
                      color: isActive ? '#fff' : 'var(--text-muted)'
                    }}>
                      {item.label}
                    </span>
                    <span className={`hud-badge hud-badge-${item.badgeColor}`} style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                      {item.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom AMR Edge Telemetry Widget */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{
          background: 'rgba(8, 12, 16, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>EDGE POWER MODE</span>
            <span style={{ color: 'var(--eco-green)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
              {activeMode}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
            <button
              onClick={() => setPowerMode('ACTIVE')}
              style={{
                background: activeMode === 'ACTIVE' ? 'var(--eco-green)' : 'rgba(255,255,255,0.05)',
                color: activeMode === 'ACTIVE' ? '#000' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '4px',
                padding: '4px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ⚡ ACTIVE
            </button>
            <button
              onClick={() => setPowerMode('DEEP_SLEEP')}
              style={{
                background: activeMode === 'DEEP_SLEEP' ? '#9c27b0' : 'rgba(255,255,255,0.05)',
                color: activeMode === 'DEEP_SLEEP' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '4px',
                padding: '4px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🌙 SLEEP MODE
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
            <span>Storage (Dashcam Loop):</span>
            <span style={{ color: 'var(--tech-cyan)', fontFamily: 'var(--font-mono)' }}>412GB / 2TB</span>
          </div>
        </div>

        {/* Pitching USP Highlight Footer */}
        <div style={{
          padding: '8px',
          background: 'rgba(0, 230, 118, 0.05)',
          border: '1px dashed rgba(0, 230, 118, 0.3)',
          borderRadius: '6px',
          textAlign: 'center',
          fontSize: '0.72rem',
          color: 'var(--eco-green)',
          lineHeight: '1.3'
        }}>
          💡 <strong>Plug & Play 100% Standalone:</strong> Zero wall beacons or routers needed.
        </div>
      </div>
    </aside>
  );
}

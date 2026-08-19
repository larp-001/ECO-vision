import React from 'react';

const Icons = {
  CCTV: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  ),
  Radar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
      <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path>
      <line x1="12" y1="12" x2="19" y2="5"></line>
    </svg>
  ),
  Inventory: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Brain: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
  Bolt: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Bot: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
  )
};

export default function Sidebar({ activeTab, setActiveTab, robotStatus, activeMode, setPowerMode }) {
  const navItems = [
    {
      id: 'CCTV',
      label: 'Vision AI & CCTV',
      icon: <Icons.CCTV />,
      badge: 'Live 4K',
      badgeColor: 'cyan',
      description: 'Video-Backed Log & Pick',
    },
    {
      id: 'RADAR',
      label: 'mmWave Radar',
      icon: <Icons.Radar />,
      badge: '360° Scan',
      badgeColor: 'green',
      description: 'NLOS Safety Monitor',
    },
    {
      id: 'INVENTORY',
      label: 'Inventory & 3D Twin',
      icon: <Icons.Inventory />,
      badge: 'Real-Time',
      badgeColor: 'cyan',
      description: 'Warehouse Stock Grid',
    },
    {
      id: 'ADVISORY',
      label: 'AI Advisory',
      icon: <Icons.Brain />,
      badge: 'Approval',
      badgeColor: 'amber',
      description: 'Slotting Optimization',
    },
    {
      id: 'SLEEP',
      label: 'Night Sleep & Eco',
      icon: <Icons.Moon />,
      badge: 'Save 90%',
      badgeColor: 'green',
      description: 'Security & EOD Summary',
    },
  ];

  return (
    <aside className="glass-panel" style={{
      width: '280px',
      margin: '12px 0 12px 16px',
      padding: '18px 12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(10, 16, 24, 0.92)',
      flexShrink: 0
    }}>
      {/* Top Brand & Logo */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '0 6px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'rgba(0, 230, 118, 0.15)',
            border: '1px solid rgba(0, 230, 118, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Icons.Bot />
          </div>
          <div>
            <h1 style={{
              fontSize: '1.05rem',
              fontWeight: '800',
              letterSpacing: '0.04em',
              color: '#f8fafc',
              margin: 0
            }}>
              ECO-VISION
            </h1>
            <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              ROBOT OS v4.2
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{
            fontSize: '0.66rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-dim)',
            padding: '0 8px',
            letterSpacing: '0.06em'
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
                  background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
                  borderRadius: '6px',
                  padding: '9px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
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
                    background: '#00e676',
                    borderRadius: '0 3px 3px 0'
                  }}></div>
                )}

                <span style={{ color: isActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </span>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontWeight: isActive ? '700' : '500',
                      fontSize: '0.85rem',
                      color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.75)'
                    }}>
                      {item.label}
                    </span>
                    <span className={`hud-badge hud-badge-${item.badgeColor}`} style={{ fontSize: '0.6rem', padding: '1px 5px' }}>
                      {item.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '1px' }}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom AMR Edge Telemetry Widget */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          background: 'rgba(8, 12, 16, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '6px',
          padding: '10px',
          fontSize: '0.74rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>EDGE POWER MODE</span>
            <span style={{ color: 'var(--eco-green)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
              {activeMode}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '6px' }}>
            <button
              onClick={() => setPowerMode('ACTIVE')}
              style={{
                background: activeMode === 'ACTIVE' ? 'var(--eco-green)' : 'rgba(255,255,255,0.05)',
                color: activeMode === 'ACTIVE' ? '#000' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '4px',
                padding: '5px',
                fontSize: '0.68rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Icons.Bolt />
              <span>ACTIVE</span>
            </button>
            <button
              onClick={() => setPowerMode('DEEP_SLEEP')}
              style={{
                background: activeMode === 'DEEP_SLEEP' ? '#9c27b0' : 'rgba(255,255,255,0.05)',
                color: activeMode === 'DEEP_SLEEP' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '4px',
                padding: '5px',
                fontSize: '0.68rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Icons.Moon />
              <span>SLEEP</span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.68rem' }}>
            <span>Storage (Dashcam Loop):</span>
            <span style={{ color: 'var(--tech-cyan)', fontFamily: 'var(--font-mono)' }}>412GB / 2TB</span>
          </div>
        </div>

        {/* Pitching USP Highlight Footer */}
        <div style={{
          padding: '7px 8px',
          background: 'rgba(0, 230, 118, 0.05)',
          border: '1px dashed rgba(0, 230, 118, 0.25)',
          borderRadius: '6px',
          textAlign: 'center',
          fontSize: '0.68rem',
          color: 'var(--eco-green)',
          lineHeight: '1.3'
        }}>
          <strong>Plug & Play Standalone:</strong> Zero wall beacons needed.
        </div>
      </div>
    </aside>
  );
}

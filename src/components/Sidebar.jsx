import React from 'react';

const Icons = {
  CCTV: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  ),
  Radar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
      <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path>
      <line x1="12" y1="12" x2="19" y2="5"></line>
    </svg>
  ),
  Inventory: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Brain: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.2"></circle>
      <path d="M12 3v2.4M12 18.6V21M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M3 12h2.4M18.6 12H21M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"></path>
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
  Bolt: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Bot: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="10.5" width="17" height="9" rx="2.3"></rect>
      <circle cx="12" cy="5.3" r="1.9"></circle>
      <path d="M12 7.2v3.3"></path>
    </svg>
  ),
  Map: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  )
};

export default function Sidebar({ activeTab, setActiveTab, robotStatus, activeMode, setPowerMode }) {
  const navItems = [
    {
      id: 'MAP',
      label: 'แผนผังโรงงาน 3 มิติ',
      icon: <Icons.Map />,
      badge: 'สด',
      badgeColor: 'green',
      description: 'แผนที่ดิจิทัลของโรงงาน',
    },
    {
      id: 'CCTV',
      label: 'กล้อง Vision AI',
      icon: <Icons.CCTV />,
      badge: 'สด 4K',
      badgeColor: 'cyan',
      description: 'บันทึกวิดีโอ + สั่งหยิบ',
    },
    {
      id: 'RADAR',
      label: 'เรดาร์ตรวจจับ',
      icon: <Icons.Radar />,
      badge: 'สแกน 360°',
      badgeColor: 'green',
      description: 'ตรวจจับความปลอดภัย',
    },
    {
      id: 'INVENTORY',
      label: 'คลังสินค้า & อันดับ',
      icon: <Icons.Inventory />,
      badge: 'เรียลไทม์',
      badgeColor: 'cyan',
      description: 'สต๊อกสินค้าทั้งหมด',
    },
    {
      id: 'ADVISORY',
      label: 'ผู้ช่วย AI จัดคลัง',
      icon: <Icons.Brain />,
      badge: 'รออนุมัติ',
      badgeColor: 'amber',
      description: 'แนะนำจัดวางสินค้าใหม่',
    },
    {
      id: 'SLEEP',
      label: 'โหมดประหยัดพลังงาน',
      icon: <Icons.Moon />,
      badge: 'ประหยัด 90%',
      badgeColor: 'green',
      description: 'ความปลอดภัย + สรุปวัน',
    },
  ];

  return (
    <aside className="glass-panel sidebar-desktop" style={{
      width: '260px',
      margin: '12px 0 12px 16px',
      padding: '20px 14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: '#ffffff',
      flexShrink: 0
    }}>
      {/* Top Brand & Logo */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', padding: '0 6px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'var(--eco-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Icons.Bot />
          </div>
          <div>
            <h1 style={{
              fontSize: '0.96rem',
              fontWeight: '700',
              letterSpacing: '-0.01em',
              color: 'var(--text-main)',
              margin: 0
            }}>
              ECO-VISION
            </h1>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>
              หุ่นยนต์คลังสินค้า v4.2
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{
            fontSize: '0.66rem',
            fontWeight: 600,
            color: 'var(--text-dim)',
            padding: '0 10px 4px',
            letterSpacing: '0.04em'
          }}>
            เมนูระบบ
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? 'var(--eco-green-soft)' : 'transparent',
                  border: 'none',
                  borderRadius: '9px',
                  padding: '9px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                  position: 'relative',
                  width: '100%',
                  fontFamily: 'inherit',
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.background = '#f1f2f4';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '20%',
                    height: '60%',
                    width: '3px',
                    background: 'var(--eco-green)',
                    borderRadius: '0 3px 3px 0'
                  }}></div>
                )}

                <span style={{ color: isActive ? 'var(--eco-green-dark)' : '#6b7280', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontWeight: isActive ? '600' : '500',
                      fontSize: '0.85rem',
                      color: 'var(--text-main)'
                    }}>
                      {item.label}
                    </span>
                    <span className={`hud-badge hud-badge-${item.badgeColor}`} style={{ fontSize: '0.6rem', padding: '1px 6px', flexShrink: 0 }}>
                      {item.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '1px' }}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom power-mode + storage widget */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          background: '#fafafb',
          border: '1px solid var(--border-subtle)',
          borderRadius: '11px',
          padding: '12px',
          fontSize: '0.74rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>โหมดพลังงาน</span>
            <span style={{ color: 'var(--eco-green-dark)', fontWeight: '600' }}>
              {activeMode === 'ACTIVE' ? 'ทำงานปกติ' : 'พักหลับ'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
            <button
              onClick={() => setPowerMode('ACTIVE')}
              style={{
                background: activeMode === 'ACTIVE' ? 'var(--eco-green)' : '#eef0f2',
                color: activeMode === 'ACTIVE' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '7px',
                padding: '6px',
                fontSize: '0.7rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontFamily: 'inherit',
              }}
            >
              <Icons.Bolt />
              <span>ทำงาน</span>
            </button>
            <button
              onClick={() => setPowerMode('DEEP_SLEEP')}
              style={{
                background: activeMode === 'DEEP_SLEEP' ? '#7c3aed' : '#eef0f2',
                color: activeMode === 'DEEP_SLEEP' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '7px',
                padding: '6px',
                fontSize: '0.7rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontFamily: 'inherit',
              }}
            >
              <Icons.Moon />
              <span>พักหลับ</span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.68rem' }}>
            <span>พื้นที่บันทึกวิดีโอ</span>
            <span>412GB / 2TB</span>
          </div>
        </div>

        {/* Pitching USP Highlight Footer */}
        <div style={{
          padding: '7px',
          background: 'var(--eco-green-soft)',
          borderRadius: '9px',
          textAlign: 'center',
          fontSize: '0.68rem',
          color: 'var(--eco-green-dark)',
          lineHeight: '1.3'
        }}>
          ติดตั้งง่าย ไม่ต้องเดินสายเพิ่ม
        </div>
      </div>
    </aside>
  );
}

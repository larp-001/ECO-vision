import React from 'react';

export default function ProjectHeroHeader({
  isNightMode,
  robotStatus,
  onTriggerIntro,
  onEditLayout,
  onOpenDashboard,
  speedMultiplier = 1,
  setSpeedMultiplier,
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '14px',
        left: '14px',
        right: '14px',
        maxWidth: 'fit-content',
        zIndex: 900,
        animation: 'heroEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pointerEvents: 'auto',
      }}
    >
      {/* MINIMALIST LIGHT BRAND BADGE */}
      <div
        className="hud-top-bar"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid #e6e8eb',
          boxShadow: '0 8px 24px rgba(16,24,40,.08)',
          borderRadius: '12px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#1a1d24',
          fontFamily: "'IBM Plex Sans Thai', 'IBM Plex Sans', sans-serif",
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100vw - 28px)',
          overflowX: 'auto',
        }}
      >
        {/* Logo Icon */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3.5" y="10.5" width="17" height="9" rx="2.3"></rect>
            <circle cx="12" cy="5.3" r="1.9"></circle>
            <path d="M12 7.2v3.3"></path>
          </svg>
        </div>

        {/* Project Name & Subtitle */}
        <div style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '0.92rem',
                fontWeight: '700',
                letterSpacing: '-0.01em',
                color: '#1a1d24',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
              }}
            >
              ECO-VISION
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: '#dcfce7',
                color: '#15803d',
                fontSize: '0.6rem',
                fontWeight: '700',
                padding: '2px 6px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#15803d' }} />
              ออนไลน์
            </span>
          </div>
          <div style={{ fontSize: '0.66rem', color: '#9aa1ab', whiteSpace: 'nowrap' }}>
            แผนที่ดิจิทัลของโรงงาน
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '22px', background: '#e6e8eb', flexShrink: 0 }} />

        {/* Speed Multiplier (1x, 2x, 3x, 5x) */}
        {setSpeedMultiplier && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              background: '#f4f5f6',
              border: '1px solid #e6e8eb',
              padding: '2px 4px',
              borderRadius: '8px',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '0.68rem', color: '#68707c', fontWeight: '600', padding: '0 4px' }}>
              ⚡ ความเร็ว:
            </span>
            {[1, 2, 3, 5].map((speed) => {
              const isActive = speedMultiplier === speed;
              return (
                <button
                  key={speed}
                  onClick={() => setSpeedMultiplier(speed)}
                  title={`ปรับความเร็วจำลอง ${speed} เท่า`}
                  style={{
                    background: isActive ? '#16a34a' : 'transparent',
                    color: isActive ? '#ffffff' : '#475569',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 7px',
                    fontSize: '0.72rem',
                    fontWeight: isActive ? '700' : '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? '0 1px 4px rgba(22,163,74,0.3)' : 'none',
                  }}
                >
                  {speed}x
                </button>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div style={{ width: '1px', height: '22px', background: '#e6e8eb', flexShrink: 0 }} />

        {/* Action 1: Open Dashboard Button */}
        {onOpenDashboard && (
          <button
            onClick={onOpenDashboard}
            title="เปิดแดชบอร์ดจัดการระบบ"
            style={{
              background: '#16a34a',
              border: 'none',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '6px 13px',
              fontSize: '0.76rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#15803d'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#16a34a'; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>เปิดแดชบอร์ดจัดการ →</span>
          </button>
        )}

        {/* Action 2: Quick Edit Layout Button */}
        {onEditLayout && (
          <button
            onClick={onEditLayout}
            title="ปรับแต่งผังโรงงาน"
            style={{
              background: '#eff6ff',
              border: '1px solid #dbeafe',
              color: '#2563eb',
              borderRadius: '8px',
              padding: '5px 11px',
              fontSize: '0.74rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#dbeafe'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#eff6ff'; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            <span>ปรับแต่งผัง</span>
          </button>
        )}

        {/* Action 3: Intro Fly-in Button */}
        <button
          onClick={onTriggerIntro}
          title="ซูมเข้าสู่โรงงาน"
          style={{
            background: '#f4f5f6',
            border: '1px solid #e6e8eb',
            color: '#68707c',
            borderRadius: '8px',
            padding: '5px 10px',
            fontSize: '0.72rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#eef0f2'; e.currentTarget.style.color = '#1a1d24'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = '#f4f5f6'; e.currentTarget.style.color = '#68707c'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
          <span>ซูมเข้า</span>
        </button>
      </div>
    </div>
  );
}

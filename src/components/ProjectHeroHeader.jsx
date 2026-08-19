import React from 'react';

export default function ProjectHeroHeader({
  isNightMode,
  robotStatus,
  onTriggerIntro,
  onEditLayout,
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '18px',
        left: '20px',
        zIndex: 900,
        animation: 'heroEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pointerEvents: 'auto',
      }}
    >
      {/* MINIMALIST SLEEK BRAND BADGE */}
      <div
        style={{
          background: isNightMode ? 'rgba(10, 16, 26, 0.92)' : 'rgba(14, 21, 32, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
          borderRadius: '10px',
          padding: '7px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#fff',
        }}
      >
        {/* Logo Icon */}
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            background: 'rgba(0, 230, 118, 0.15)',
            border: '1px solid rgba(0, 230, 118, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>

        {/* Project Name & Subtitle */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '0.98rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                fontFamily: "'Rajdhani', -apple-system, sans-serif",
                color: '#f8fafc',
                lineHeight: '1.2',
              }}
            >
              ECO-VISION
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(0, 230, 118, 0.12)',
                border: '1px solid rgba(0, 230, 118, 0.3)',
                color: '#00e676',
                fontSize: '0.6rem',
                fontWeight: '700',
                padding: '1px 5px',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#00e676',
                }}
              />
              ONLINE
            </span>
          </div>
          <div
            style={{
              fontSize: '0.66rem',
              color: 'rgba(255, 255, 255, 0.55)',
              fontWeight: '400',
            }}
          >
            Digital Twin & AMR
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Action 1: Quick Edit Layout Button */}
        {onEditLayout && (
          <button
            onClick={onEditLayout}
            title="ปรับแต่งผังโรงงาน"
            style={{
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.72rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.22)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)';
              e.currentTarget.style.color = '#38bdf8';
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            <span>ปรับแต่งผัง</span>
          </button>
        )}

        {/* Action 2: Intro Fly-in Button */}
        <button
          onClick={onTriggerIntro}
          title="ซูมเข้าสู่โรงงาน"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '6px',
            padding: '4px 9px',
            fontSize: '0.7rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(0, 230, 118, 0.15)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
          }}
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

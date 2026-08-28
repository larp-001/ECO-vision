import React, { useState, useEffect } from 'react';

const Icons = {
  Pin: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Radar: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
      <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path>
    </svg>
  ),
  Bolt: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Moon: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  )
};

export default function StatusBar({ robotStatus, activeMode, onTriggerSimulatedAnomaly }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('th-TH'));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('th-TH'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getModeColor = (mode) => {
    switch (mode) {
      case 'ACTIVE': return 'var(--eco-green-dark)';
      case 'PATROL': return 'var(--tech-cyan)';
      case 'STANDBY': return 'var(--warning-amber)';
      case 'DEEP_SLEEP': return '#7c3aed';
      default: return 'var(--eco-green-dark)';
    }
  };

  const modeLabel = (mode) => {
    switch (mode) {
      case 'ACTIVE': return 'ทำงานปกติ';
      case 'PATROL': return 'ตรวจตรา';
      case 'STANDBY': return 'สแตนด์บาย';
      case 'DEEP_SLEEP': return 'พักหลับ & รักษาความปลอดภัย';
      default: return mode;
    }
  };

  return (
    <header className="glass-panel" style={{
      margin: '12px 16px 0 16px',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: '#ffffff'
    }}>
      {/* Left: Robot ID, Connection & Operational Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-pulse green"></span>
          <div>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>หุ่นยนต์</span>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>
              {robotStatus.name} <span style={{ color: 'var(--tech-cyan)', fontSize: '0.74rem' }}>[{robotStatus.id}]</span>
            </div>
          </div>
        </div>

        <div style={{ height: '20px', width: '1px', background: 'var(--border-subtle)' }}></div>

        {/* Operating Mode Badge */}
        <span className="hud-badge" style={{
          background: activeMode === 'DEEP_SLEEP' ? '#ede9fe' : 'var(--eco-green-soft)',
          color: getModeColor(activeMode),
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          fontSize: '0.74rem'
        }}>
          {activeMode === 'DEEP_SLEEP' ? <Icons.Moon /> : <Icons.Bolt />}
          <span>{modeLabel(activeMode)}</span>
        </span>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center' }}>
            <Icons.Pin />
          </span>
          <span>{robotStatus.currentLocation}</span>
        </div>
      </div>

      {/* Right: Quick Telemetry & Simulation Triggers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Battery & Power */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f4f5f6', padding: '5px 12px', borderRadius: '9px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>แบตเตอรี่</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: robotStatus.battery > 30 ? 'var(--eco-green-dark)' : 'var(--warning-amber)' }}>
            {robotStatus.battery}%
          </span>
        </div>

        {/* mmWave Radar Link */}
        <span className="hud-badge hud-badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 11px', fontSize: '0.74rem' }}>
          <Icons.Radar />
          <span>เรดาร์ 60GHz</span>
        </span>

        {/* Live Clock */}
        <div style={{
          fontFamily: "'IBM Plex Sans', monospace",
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          background: '#f4f5f6',
          padding: '5px 10px',
          borderRadius: '8px'
        }}>
          {time}
        </div>

        {/* Live Pitch/Demo Simulator Trigger */}
        <button
          onClick={onTriggerSimulatedAnomaly}
          className="btn-cyber"
          style={{
            fontSize: '0.78rem',
            padding: '0 14px',
            height: '34px',
            border: '1px solid var(--warning-amber)',
            color: 'var(--warning-amber)',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="จำลองสิ่งกีดขวาง"
        >
          <Icons.Bolt />
          <span>จำลองเหตุการณ์ผิดปกติ</span>
        </button>
      </div>
    </header>
  );
}

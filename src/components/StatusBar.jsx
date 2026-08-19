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
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getModeColor = (mode) => {
    switch (mode) {
      case 'ACTIVE': return 'var(--eco-green)';
      case 'PATROL': return 'var(--tech-cyan)';
      case 'STANDBY': return 'var(--warning-amber)';
      case 'DEEP_SLEEP': return '#c084fc';
      default: return 'var(--eco-green)';
    }
  };

  return (
    <header className="glass-panel" style={{
      margin: '12px 16px 0 16px',
      padding: '8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(10, 16, 24, 0.9)'
    }}>
      {/* Left: Robot ID, Connection & Operational Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-pulse green"></span>
          <div>
            <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>AMR UNIT</span>
            <div style={{ fontSize: '0.92rem', fontWeight: '700', letterSpacing: '0.02em', color: '#fff' }}>
              {robotStatus.name} <span style={{ color: 'var(--tech-cyan)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>[{robotStatus.id}]</span>
            </div>
          </div>
        </div>

        <div style={{ height: '20px', width: '1px', background: 'var(--border-subtle)' }}></div>

        {/* Operating Mode Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>MODE:</span>
          <span className="hud-badge" style={{
            background: `rgba(${activeMode === 'DEEP_SLEEP' ? '192,132,252' : '0,230,118'}, 0.12)`,
            color: getModeColor(activeMode),
            borderColor: getModeColor(activeMode),
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            fontSize: '0.72rem'
          }}>
            {activeMode === 'DEEP_SLEEP' ? <Icons.Moon /> : <Icons.Bolt />}
            <span>{activeMode === 'DEEP_SLEEP' ? 'SLEEP & SECURITY' : activeMode}</span>
          </span>
        </div>

        {/* Location HUD */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--tech-cyan)', display: 'flex', alignItems: 'center' }}>
            <Icons.Pin />
          </span>
          <span>{robotStatus.currentLocation}</span>
        </div>
      </div>

      {/* Right: Quick Telemetry & Simulation Triggers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Battery & Power */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '3px 10px', borderRadius: '5px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>BATTERY</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 'bold', color: robotStatus.battery > 30 ? 'var(--eco-green)' : 'var(--warning-amber)', fontFamily: 'var(--font-mono)' }}>
              {robotStatus.battery}%
            </div>
          </div>
          <div style={{
            width: '24px',
            height: '12px',
            border: '1px solid var(--eco-green)',
            borderRadius: '2px',
            padding: '1px',
            position: 'relative'
          }}>
            <div style={{
              width: `${robotStatus.battery}%`,
              height: '100%',
              background: 'var(--eco-green)',
              borderRadius: '1px'
            }}></div>
          </div>
        </div>

        {/* mmWave Radar Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span className="hud-badge hud-badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', fontSize: '0.7rem' }}>
            <Icons.Radar />
            <span>RADAR 60GHz</span>
          </span>
        </div>

        {/* Live Clock */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: '#fff',
          letterSpacing: '0.04em',
          background: 'rgba(15, 23, 33, 0.8)',
          padding: '3px 8px',
          borderRadius: '4px',
          border: '1px solid var(--border-subtle)'
        }}>
          {time}
        </div>

        {/* Live Pitch/Demo Simulator Trigger */}
        <button
          onClick={onTriggerSimulatedAnomaly}
          className="btn-cyber"
          style={{
            fontSize: '0.72rem',
            padding: '4px 8px',
            borderColor: 'var(--warning-amber)',
            color: 'var(--warning-amber)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Simulate Obstacle"
        >
          <Icons.Bolt />
          <span>SIMULATE ANOMALY</span>
        </button>
      </div>
    </header>
  );
}

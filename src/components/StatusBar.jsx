import React, { useState, useEffect } from 'react';

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
      case 'DEEP_SLEEP': return '#9c27b0';
      default: return 'var(--eco-green)';
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
      background: 'rgba(10, 16, 24, 0.85)'
    }}>
      {/* Left: Robot ID, Connection & Operational Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="status-pulse green"></span>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>STANDALONE AMR UNIT</span>
            <div style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '0.04em', color: '#fff' }}>
              {robotStatus.name} <span style={{ color: 'var(--tech-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>[{robotStatus.id}]</span>
            </div>
          </div>
        </div>

        <div style={{ height: '24px', width: '1px', background: 'var(--border-subtle)' }}></div>

        {/* Operating Mode Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CURRENT MODE:</span>
          <span className="hud-badge" style={{
            background: `rgba(${activeMode === 'DEEP_SLEEP' ? '156,39,176' : '0,230,118'}, 0.15)`,
            color: getModeColor(activeMode),
            borderColor: getModeColor(activeMode),
            fontWeight: 'bold'
          }}>
            {activeMode === 'DEEP_SLEEP' ? '🌙 NIGHT SLEEP & SECURITY' : `⚡ ${activeMode}`}
          </span>
        </div>

        {/* Location HUD */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--tech-cyan)' }}>📍</span>
          <span>{robotStatus.currentLocation}</span>
        </div>
      </div>

      {/* Right: Quick Telemetry & Simulation Triggers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {/* Battery & Power */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '6px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>BATTERY (ECO-REGEN)</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: robotStatus.battery > 30 ? 'var(--eco-green)' : 'var(--warning-amber)', fontFamily: 'var(--font-mono)' }}>
              {robotStatus.battery}% ({robotStatus.solarHarvestRate})
            </div>
          </div>
          <div style={{
            width: '28px',
            height: '14px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="hud-badge hud-badge-cyan">
            📡 mmWave 60GHz: ACTIVE
          </span>
        </div>

        {/* Live Clock */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1rem',
          color: '#fff',
          letterSpacing: '0.05em',
          background: 'rgba(15, 23, 33, 0.8)',
          padding: '4px 10px',
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
            fontSize: '0.78rem',
            padding: '5px 10px',
            borderColor: 'var(--warning-amber)',
            color: 'var(--warning-amber)'
          }}
          title="Simulate Fallen Item / NLOS Obstacle for Presentation Demo"
        >
          ⚡ SIMULATE NLOS ANOMALY
        </button>
      </div>
    </header>
  );
}

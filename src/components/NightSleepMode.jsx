import React, { useState } from 'react';
import { MOCK_EOD_REPORT } from '../data/mockData';

export default function NightSleepMode({ robotStatus, activeMode, setPowerMode }) {
  const [eodReport, setEodReport] = useState(MOCK_EOD_REPORT);
  const [isIntruderSimulated, setIsIntruderSimulated] = useState(false);
  const [securityStatus, setSecurityStatus] = useState('GUARDING_PERIMETER');

  const handleSimulateIntruder = () => {
    setIsIntruderSimulated(true);
    setSecurityStatus('INTRUDER_DETECTED_ALARM');
    setTimeout(() => {
      alert('🚨 NIGHT SECURITY ALARM!\nmmWave Radar detected unauthorized human movement in Zone B during Deep Sleep. Camera woke up instantly, snapped 10s video evidence, and dispatched push notification to Factory Manager!');
    }, 400);
  };

  const handleResetAlarm = () => {
    setIsIntruderSimulated(false);
    setSecurityStatus('GUARDING_PERIMETER');
  };

  const isSleep = activeMode === 'DEEP_SLEEP';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '16px',
      padding: '16px',
      height: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      {/* LEFT COLUMN: POWER STATE MACHINE & NIGHT SECURITY RADAR */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="glass-panel" style={{
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          background: isSleep ? 'rgba(15, 8, 24, 0.92)' : 'rgba(10, 16, 24, 0.85)',
          border: isSleep ? '1px solid #9c27b0' : '1px solid var(--border-subtle)'
        }}>
          <div className="tech-corner-tl"></div>
          <div className="tech-corner-br"></div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="status-pulse green"></span>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                  NIGHT SLEEP & AUTONOMOUS AUDIT MODE
                </h2>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Dynamic Power Scaling • Low-Power Perimeter Security Guard
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setPowerMode(isSleep ? 'ACTIVE' : 'DEEP_SLEEP')}
                className={`btn-cyber ${isSleep ? 'btn-cyber-primary' : ''}`}
                style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              >
                {isSleep ? '☀️ WAKE TO ACTIVE MODE' : '🌙 ENTER NIGHT SLEEP MODE'}
              </button>
            </div>
          </div>

          {/* Power Saving Highlight Banner */}
          <div style={{
            background: isSleep ? 'rgba(156, 39, 176, 0.15)' : 'rgba(0, 230, 118, 0.1)',
            border: isSleep ? '1px solid #9c27b0' : '1px solid var(--eco-green)',
            borderRadius: '8px',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: isSleep ? '#e1bee7' : 'var(--eco-green)' }}>
                {isSleep ? '🌙 DEEP SLEEP ACTIVE (85-90% ENERGY SAVED)' : '⚡ STANDARD OPERATION MODE (ACTIVE)'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {isSleep
                  ? 'Motors, 4K cameras & LEDs powered down. Only low-power mmWave radar active.'
                  : 'Full multi-spectral vision AI and 360° LiDAR navigation online.'}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>POWER DRAW</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: isSleep ? '#00e676' : 'var(--tech-cyan)', fontWeight: 'bold' }}>
                {isSleep ? '12.4 W' : '142.0 W'}
              </div>
            </div>
          </div>

          {/* 4-State Dynamic Power Scaling Architecture */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>
              DYNAMIC POWER STATE MACHINE
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { name: '1. ACTIVE', draw: '140-180W', desc: 'Full Camera + Arm + LiDAR', current: activeMode === 'ACTIVE', color: 'var(--eco-green)' },
                { name: '2. PATROL', draw: '45-65W', desc: 'Low-FPS Vision + Radar', current: activeMode === 'PATROL', color: 'var(--tech-cyan)' },
                { name: '3. STANDBY', draw: '20-30W', desc: 'Parked at Opportunity Pad', current: activeMode === 'STANDBY', color: 'var(--warning-amber)' },
                { name: '4. DEEP SLEEP', draw: '8-15W', desc: 'Radar Only + EOD AI', current: isSleep, color: '#9c27b0' },
              ].map((state) => (
                <div
                  key={state.name}
                  onClick={() => setPowerMode(state.name.split(' ')[1])}
                  style={{
                    background: state.current ? 'rgba(255,255,255,0.08)' : 'rgba(12, 19, 28, 0.6)',
                    border: state.current ? `2px solid ${state.color}` : '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '10px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '90px'
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '0.75rem', color: state.color }}>
                    {state.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#fff' }}>
                    {state.draw}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)', lineHeight: '1.2' }}>
                    {state.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Night Security Radar Live Guarding HUD */}
          <div style={{
            background: 'rgba(8, 14, 22, 0.9)',
            border: isIntruderSimulated ? '2px solid var(--danger-red)' : '1px solid var(--border-cyan)',
            borderRadius: '8px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`status-pulse ${isIntruderSimulated ? 'red' : 'green'}`}></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: isIntruderSimulated ? 'var(--danger-red)' : '#fff' }}>
                  {isIntruderSimulated ? '🚨 INTRUDER / NIGHT MOVEMENT DETECTED!' : '🛡 LOW-POWER NIGHT RADAR GUARD (PERIMETER SECURE)'}
                </span>
              </div>

              <span className={`hud-badge ${isIntruderSimulated ? 'hud-badge-red' : 'hud-badge-green'}`}>
                {securityStatus}
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {isIntruderSimulated
                ? 'mmWave Radar detected human body reflection at Zone B corridor. Triggering 1-second Flash LED + 10s video recording snapshot.'
                : 'Robot is stationary at charging node. Scanning 360° for unauthorized personnel, fallen chemical containers, or temperature anomalies.'}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {!isIntruderSimulated ? (
                <button
                  onClick={handleSimulateIntruder}
                  className="btn-cyber btn-cyber-danger"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  ⚡ SIMULATE NIGHT INTRUDER DETECTION
                </button>
              ) : (
                <button
                  onClick={handleResetAlarm}
                  className="btn-cyber btn-cyber-primary"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  ✓ ACKNOWLEDGE & RESET SECURITY GUARD
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: END-OF-DAY (EOD) AUTOMATED REPORT */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="tech-corner-tl"></div>
        <div className="tech-corner-br"></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>
              END-OF-DAY (EOD) AUDIT REPORT
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Auto-Compiled by AI during Night Sleep Mode
            </span>
          </div>

          <span className="hud-badge hud-badge-green">
            {eodReport.date}
          </span>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>PICKS COMPLETED</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>
              {eodReport.picksCompleted}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ACCURACY RATE</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--eco-green)', fontWeight: 'bold' }}>
              {eodReport.inspectionAccuracy}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>NLOS PREVENTED ACCIDENTS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--tech-cyan)', fontWeight: 'bold' }}>
              {eodReport.nearMissesPreventedNLOS} Blindspots
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>DEFECTS QUARANTINED</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--warning-amber)', fontWeight: 'bold' }}>
              {eodReport.packagingDefectsQuarantined} SKU
            </div>
          </div>
        </div>

        {/* ESG Green Energy Harvest Summary */}
        <div style={{
          padding: '12px',
          background: 'rgba(0, 230, 118, 0.08)',
          border: '1px solid rgba(0, 230, 118, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          fontSize: '0.8rem'
        }}>
          <div style={{ fontWeight: 'bold', color: 'var(--eco-green)' }}>
            🌱 ESG & Green Energy Harvest Telemetry:
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Solar Ambient Harvest:</span>
            <strong style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>{eodReport.energyHarvestedSolar}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Regenerative Braking Recovery:</span>
            <strong style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>{eodReport.energyRecoveredBraking}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Facility Energy Saved:</span>
            <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--eco-green)' }}>{eodReport.totalEnergySavedPercent}</strong>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={() => alert('📄 EOD Report & Video Audit Manifest exported as PDF / Excel spreadsheet.')}
            className="btn-cyber btn-cyber-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
          >
            📥 EXPORT MANAGER EOD AUDIT REPORT
          </button>
        </div>
      </div>
    </div>
  );
}

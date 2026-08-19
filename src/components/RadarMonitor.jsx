import React, { useState, useEffect, useRef } from 'react';
import { MOCK_RADAR_BLIPS } from '../data/mockData';

export default function RadarMonitor({ onSimulateFallenItem, onTriggerSOS }) {
  const canvasRef = useRef(null);
  const [radarBlips, setRadarBlips] = useState(MOCK_RADAR_BLIPS);
  const [selectedBlip, setSelectedBlip] = useState(MOCK_RADAR_BLIPS[0]);
  const [isDarkMode100, setIsDarkMode100] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [radarRangeM, setRadarRangeM] = useState(6); // 6 meters
  const [showNLOSOnly, setShowNLOSOnly] = useState(false);

  // Canvas 360 Radar Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let animationFrameId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      // Clear Canvas
      ctx.fillStyle = isDarkMode100 ? '#020406' : '#080d14';
      ctx.fillRect(0, 0, width, height);

      // Draw Radar Concentric Circles
      ctx.lineWidth = 1;
      const rings = 4;
      for (let i = 1; i <= rings; i++) {
        const r = (radius / rings) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = isDarkMode100 ? 'rgba(0, 230, 118, 0.15)' : 'rgba(0, 176, 255, 0.2)';
        ctx.stroke();

        // Distance Labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '10px "Share Tech Mono"';
        ctx.fillText(`${((radarRangeM / rings) * i).toFixed(1)}m`, centerX + 4, centerY - r + 12);
      }

      // Draw Crosshair Lines
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.strokeStyle = 'rgba(45, 70, 95, 0.35)';
      ctx.stroke();

      // Draw Simulated Warehouse Shelves (Obstacles / Walls)
      ctx.fillStyle = 'rgba(45, 70, 95, 0.4)';
      ctx.fillRect(centerX - 110, centerY - 80, 50, 160);
      ctx.fillRect(centerX + 60, centerY - 80, 50, 160);
      ctx.fillStyle = '#8b9bb4';
      ctx.font = '9px "Share Tech Mono"';
      ctx.fillText('SHELF A-01', centerX - 105, centerY - 85);
      ctx.fillText('SHELF A-02', centerX + 65, centerY - 85);

      // Draw Sweeping Radar Beam (Sector)
      const sweepAngle = (angle * Math.PI) / 180;
      const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(0, 230, 118, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 230, 118, 0.0)');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, sweepAngle - 0.35, sweepAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();

      // Draw Leading Sweep Line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(sweepAngle),
        centerY + radius * Math.sin(sweepAngle)
      );
      ctx.strokeStyle = 'rgba(0, 230, 118, 0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Robot Center Node
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#00b0ff';
      ctx.shadowColor = '#00b0ff';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Radar Blips
      radarBlips.forEach((blip) => {
        if (showNLOSOnly && !blip.isBehindObstacle) return;

        const blipRad = (blip.angle * Math.PI) / 180;
        const distPx = (blip.distanceM / radarRangeM) * radius;
        const bx = centerX + distPx * Math.cos(blipRad);
        const by = centerY + distPx * Math.sin(blipRad);

        const isHumanNLOS = blip.type === 'NLOS_HUMAN';
        const isFallen = blip.type === 'FALLEN_ITEM';
        const color = isHumanNLOS ? '#ff1744' : isFallen ? '#ff9100' : '#00e676';

        // Blip dot
        ctx.beginPath();
        ctx.arc(bx, by, isHumanNLOS ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // NLOS Behind-Shelf Penetration Waves
        if (blip.isBehindObstacle) {
          ctx.beginPath();
          ctx.arc(bx, by, 14, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 23, 68, 0.5)';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Blip Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "Share Tech Mono"';
        ctx.fillText(blip.label.split(' ')[0], bx + 8, by - 4);
      });

      // Increment angle
      angle = (angle + 2) % 360;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [radarBlips, radarRangeM, isDarkMode100, showNLOSOnly]);

  const handleFlashOnScan = () => {
    setIsFlashActive(true);
    setTimeout(() => {
      setIsFlashActive(false);
    }, 600);
  };

  const handleAddNewBlip = () => {
    const newBlip = {
      id: `BLIP-ANOMALY-${Date.now()}`,
      angle: Math.floor(Math.random() * 340) + 10,
      distanceM: +(Math.random() * 3 + 1.2).toFixed(1),
      type: 'FALLEN_ITEM',
      label: 'Fallen Reagent Box (New Spatial Anomaly)',
      speed: '0.0 m/s',
      confidence: '98.8%',
      isBehindObstacle: false,
      urgency: 'HIGH',
    };
    setRadarBlips((prev) => [newBlip, ...prev]);
    setSelectedBlip(newBlip);
    if (onSimulateFallenItem) onSimulateFallenItem(newBlip);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '16px',
      padding: '16px',
      height: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      {/* LEFT: INTERACTIVE 360 MMWAVE RADAR CANVAS */}
      <div className="glass-panel" style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        background: isDarkMode100 ? 'rgba(3, 5, 8, 0.95)' : 'rgba(10, 16, 24, 0.85)'
      }}>
        <div className="tech-corner-tl"></div>
        <div className="tech-corner-br"></div>

        {/* Flash-On-Scan simulation overlay */}
        {isFlashActive && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.85)',
            zIndex: 999,
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-out'
          }}></div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="status-pulse green"></span>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                STANDALONE mmWAVE RADAR <span style={{ color: 'var(--eco-green)', fontSize: '0.85rem' }}>[60GHz NLOS ENGINE]</span>
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                360° Non-Line-of-Sight Wall Penetration & Obstacle Tracking
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setIsDarkMode100(!isDarkMode100)}
              className={`btn-cyber ${isDarkMode100 ? 'btn-cyber-primary' : ''}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              {isDarkMode100 ? 'DARK MODE: ON' : 'SIMULATE DARK WAREHOUSE'}
            </button>

            <button
              onClick={handleFlashOnScan}
              className="btn-cyber"
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              title="Demonstrates Flash LED activation only during scan"
            >
              FLASH-ON-SCAN
            </button>
          </div>
        </div>

        {/* Canvas Radar Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '10px 0'
        }}>
          <canvas
            ref={canvasRef}
            width={480}
            height={380}
            style={{
              borderRadius: '50%',
              border: '2px solid rgba(0, 176, 255, 0.4)',
              cursor: 'crosshair'
            }}
          />

          {/* Radar HUD Overlay Notes */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(5, 10, 16, 0.8)',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)'
          }}>
            <div style={{ color: 'var(--tech-cyan)', fontWeight: 'bold' }}>RADAR FREQ: 60-64 GHz</div>
            <div>BEAM RESOLUTION: 0.15m / 1.2°</div>
            <div>RADAR RANGE: {radarRangeM} METERS</div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <button
              onClick={handleAddNewBlip}
              className="btn-cyber"
              style={{ fontSize: '0.72rem', padding: '4px 8px', borderColor: 'var(--warning-amber)', color: 'var(--warning-amber)' }}
            >
              + TRIGGER FALLEN ITEM
            </button>
            <button
              onClick={() => setShowNLOSOnly(!showNLOSOnly)}
              className="btn-cyber"
              style={{ fontSize: '0.72rem', padding: '4px 8px' }}
            >
              {showNLOSOnly ? 'SHOW ALL TARGETS' : 'FILTER NLOS ONLY'}
            </button>
          </div>
        </div>

        {/* Bottom Feature Pill Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          padding: '10px',
          background: 'rgba(8, 14, 22, 0.7)',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.74rem'
        }}>
          <div>
            <span style={{ color: 'var(--tech-cyan)', fontWeight: 'bold' }}>1. 360° FMCW Radar:</span>
            <div style={{ color: 'var(--text-muted)' }}>Immune to zero-lux total darkness</div>
          </div>
          <div>
            <span style={{ color: 'var(--tech-cyan)', fontWeight: 'bold' }}>2. NLOS Penetration:</span>
            <div style={{ color: 'var(--text-muted)' }}>Tracks humans behind racks</div>
          </div>
          <div>
            <span style={{ color: 'var(--tech-cyan)', fontWeight: 'bold' }}>3. Fallen Safety AI:</span>
            <div style={{ color: 'var(--text-muted)' }}>Auto brakes on fallen obstacle</div>
          </div>
        </div>
      </div>

      {/* RIGHT: BLIP TELEMETRY & SPATIAL SAFETY METRICS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Selected Blip Detail Card */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="tech-corner-tl"></div>
          <div className="tech-corner-br"></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>
              TARGET TELEMETRY INSPECTOR
            </h3>
            <span className="hud-badge hud-badge-red">
              {selectedBlip?.urgency} PRIORITY
            </span>
          </div>

          {selectedBlip ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                padding: '10px',
                background: selectedBlip.isBehindObstacle ? 'rgba(255, 23, 68, 0.12)' : 'rgba(0, 176, 255, 0.1)',
                border: selectedBlip.isBehindObstacle ? '1px solid var(--danger-red)' : '1px solid var(--border-cyan)',
                borderRadius: '6px'
              }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 'bold', color: '#fff' }}>
                  {selectedBlip.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  TYPE: {selectedBlip.type} • ID: {selectedBlip.id}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '8px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>DISTANCE / AZIMUTH</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--tech-cyan)', fontWeight: 'bold' }}>
                    {selectedBlip.distanceM}m @ {selectedBlip.angle}°
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '8px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>VELOCITY VECTOR</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--eco-green)', fontWeight: 'bold' }}>
                    {selectedBlip.speed}
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '8px', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>RADAR CLOUD CONFIDENCE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#fff' }}>
                  {selectedBlip.confidence} (Waveform Micro-Doppler Match)
                </div>
              </div>

              {selectedBlip.isBehindObstacle && (
                <div style={{
                  padding: '8px 10px',
                  background: 'rgba(255, 23, 68, 0.1)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 23, 68, 0.4)',
                  fontSize: '0.78rem',
                  color: '#f8d7da',
                  lineHeight: '1.4'
                }}>
                  <strong>NLOS Anti-Collision Activated:</strong> Human is moving behind Shelf A-03 blind spot. AMR vehicle speed reduced to <strong>0.3 m/s</strong> automatically.
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '20px' }}>
              Select a target blip from the list below
            </div>
          )}
        </div>

        {/* Blips Selection List */}
        <div className="glass-panel" style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>
            DETECTED TARGETS LIST ({radarBlips.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {radarBlips.map((blip) => (
              <div
                key={blip.id}
                onClick={() => setSelectedBlip(blip)}
                style={{
                  background: selectedBlip?.id === blip.id ? 'rgba(0, 176, 255, 0.15)' : 'rgba(12, 19, 28, 0.6)',
                  border: selectedBlip?.id === blip.id ? '1px solid var(--tech-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#fff' }}>
                    {blip.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {blip.distanceM}m • {blip.speed}
                  </div>
                </div>

                <span className={`hud-badge ${blip.isBehindObstacle ? 'hud-badge-red' : 'hud-badge-green'}`} style={{ fontSize: '0.62rem' }}>
                  {blip.isBehindObstacle ? 'NLOS PENETRATE' : 'DIRECT LOS'}
                </span>
              </div>
            ))}
          </div>

          {/* SOS Lab Emergency Button */}
          <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
            <button
              onClick={() => {
                alert('SOS LAB EMERGENCY ALERT TRIGGERED!\nRadar detected person fall/unresponsive state in Lab Zone B. Immediate supervisor notified with exact coordinates!');
                if (onTriggerSOS) onTriggerSOS();
              }}
              className="btn-cyber btn-cyber-danger"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
            >
              SIMULATE LAB PERSONNEL FALL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { MOCK_RADAR_BLIPS } from '../data/mockData.js';

export default function RadarMonitor({ onSimulateFallenItem, onTriggerSOS }) {
  const canvasRef = useRef(null);
  const [radarBlips, setRadarBlips] = useState(MOCK_RADAR_BLIPS);
  const [selectedBlip, setSelectedBlip] = useState(MOCK_RADAR_BLIPS[0]);
  const [isDarkMode100, setIsDarkMode100] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [radarRangeM, setRadarRangeM] = useState(6); // 6 meters
  const [showNLOSOnly, setShowNLOSOnly] = useState(false);
  const [radarColor, setRadarColor] = useState('#00e676'); // Default Cyber Green

  // Canvas 360 Radar Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let animationFrameId;

    const hexToRgba = (hex, alpha) => {
      let r = 0, g = 230, b = 118;
      if (hex === '#00e676') { r = 0; g = 230; b = 118; }
      else if (hex === '#00e5ff') { r = 0; g = 229; b = 255; }
      else if (hex === '#f59e0b') { r = 245; g = 158; b = 11; }
      else if (hex === '#a855f7') { r = 168; g = 85; b = 247; }
      else if (hex === '#ef4444') { r = 239; g = 68; b = 68; }
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 24;

      // 1. Dark Futuristic HUD Background
      ctx.fillStyle = isDarkMode100 ? '#020408' : '#070c14';
      ctx.fillRect(0, 0, width, height);

      // Subtle Background Grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Radar Concentric Distance Rings
      ctx.lineWidth = 1;
      const rings = 4;
      for (let i = 1; i <= rings; i++) {
        const r = (radius / rings) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(radarColor, 0.3);
        ctx.stroke();

        // Distance Labels
        ctx.fillStyle = hexToRgba(radarColor, 0.85);
        ctx.font = '10px "IBM Plex Sans", "Share Tech Mono", monospace';
        ctx.fillText(`${((radarRangeM / rings) * i).toFixed(1)}m`, centerX + 6, centerY - r + 12);
      }

      // 3. Crosshair Axes
      ctx.beginPath();
      ctx.moveTo(centerX - radius - 10, centerY);
      ctx.lineTo(centerX + radius + 10, centerY);
      ctx.moveTo(centerX, centerY - radius - 10);
      ctx.lineTo(centerX, centerY + radius + 10);
      ctx.strokeStyle = hexToRgba(radarColor, 0.25);
      ctx.stroke();

      // 4. Dark Obstacle Shelf Racks (Left and Right aisles)
      // Shelf A-01 (Left)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(centerX - 130, centerY - 95, 55, 190);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.strokeRect(centerX - 130, centerY - 95, 55, 190);
      ctx.fillStyle = '#60a5fa';
      ctx.font = '10px "IBM Plex Sans", sans-serif';
      ctx.fillText('ชั้น A-01', centerX - 124, centerY - 102);

      // Shelf A-02 (Right)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(centerX + 75, centerY - 95, 55, 190);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.strokeRect(centerX + 75, centerY - 95, 55, 190);
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('ชั้น A-02', centerX + 81, centerY - 102);

      // 5. Sweeping Radar Beam (Sector)
      const sweepAngle = (angle * Math.PI) / 180;
      const gradient = ctx.createRadialGradient(centerX, centerY, 8, centerX, centerY, radius);
      gradient.addColorStop(0, hexToRgba(radarColor, 0.6));
      gradient.addColorStop(0.7, hexToRgba(radarColor, 0.15));
      gradient.addColorStop(1, hexToRgba(radarColor, 0.0));

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, sweepAngle - 0.45, sweepAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();

      // Leading Sweep Line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(sweepAngle),
        centerY + radius * Math.sin(sweepAngle)
      );
      ctx.strokeStyle = radarColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = radarColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 6. Locked AMR Robot Model at Center (Detailed Top-Down Representation)
      // Robot Body
      const rw = 24;
      const rh = 34;
      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 10;
      ctx.fillRect(centerX - rw / 2, centerY - rh / 2, rw, rh);
      ctx.strokeRect(centerX - rw / 2, centerY - rh / 2, rw, rh);
      ctx.shadowBlur = 0;

      // Wheels on Left & Right
      ctx.fillStyle = '#334155';
      ctx.fillRect(centerX - rw / 2 - 4, centerY - 12, 3, 10);
      ctx.fillRect(centerX - rw / 2 - 4, centerY + 2, 3, 10);
      ctx.fillRect(centerX + rw / 2 + 1, centerY - 12, 3, 10);
      ctx.fillRect(centerX + rw / 2 + 1, centerY + 2, 3, 10);

      // Front Heading Light
      ctx.fillStyle = '#00e676';
      ctx.fillRect(centerX - 8, centerY - rh / 2 - 2, 16, 3);

      // Center LiDAR Sensor Dome
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#00e5ff';
      ctx.fill();

      // Center Robot Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('AMR-01 [LOCKED]', centerX, centerY + rh / 2 + 14);
      ctx.textAlign = 'start';
      ctx.restore();

      // 7. Radar Blips (Targets & Detected Obstacles)
      radarBlips.forEach((blip) => {
        if (showNLOSOnly && !blip.isBehindObstacle) return;

        const blipRad = (blip.angle * Math.PI) / 180;
        const distPx = (blip.distanceM / radarRangeM) * radius;
        const bx = centerX + distPx * Math.cos(blipRad);
        const by = centerY + distPx * Math.sin(blipRad);

        const isHumanNLOS = blip.type === 'NLOS_HUMAN';
        const isFallen = blip.type === 'FALLEN_ITEM';
        const color = isHumanNLOS ? '#ff1744' : isFallen ? '#f59e0b' : '#00e676';

        // Blip Pulsating Outer Ring
        ctx.beginPath();
        ctx.arc(bx, by, isHumanNLOS ? 12 : 8, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Blip Core Dot
        ctx.beginPath();
        ctx.arc(bx, by, isHumanNLOS ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // NLOS Penetration Waves
        if (blip.isBehindObstacle) {
          ctx.beginPath();
          ctx.arc(bx, by, 16, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 23, 68, 0.6)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Blip Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "IBM Plex Sans", monospace';
        ctx.fillText(blip.label.split(' ')[0], bx + 10, by - 4);
      });

      // Increment angle
      angle = (angle + 2) % 360;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [radarBlips, radarRangeM, isDarkMode100, showNLOSOnly, radarColor]);

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
      label: 'กล่องสินค้าตกพื้น (ตรวจพบใหม่)',
      speed: '0.0 m/s',
      confidence: '98.8%',
      isBehindObstacle: false,
      urgency: 'HIGH',
    };
    setRadarBlips((prev) => [newBlip, ...prev]);
    setSelectedBlip(newBlip);
    if (onSimulateFallenItem) onSimulateFallenItem(newBlip);
  };

  const RADAR_THEMES = [
    { label: 'เขียวไซเบอร์', color: '#00e676' },
    { label: 'ฟ้าไซแอน', color: '#00e5ff' },
    { label: 'ส้มแทคติคอล', color: '#f59e0b' },
    { label: 'ม่วงนีออน', color: '#a855f7' },
    { label: 'แดงเตือนภัย', color: '#ef4444' },
  ];

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
      }}>
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

        {/* Header with Connection Badge & Color Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="status-pulse green"></span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>
                  เรดาร์ตรวจจับ mmWave <span style={{ color: 'var(--eco-green-dark)', fontSize: '0.78rem', fontWeight: 500 }}>[60GHz NLOS]</span>
                </h2>
                <span className="hud-badge hud-badge-green" style={{ fontSize: '0.64rem', padding: '1px 6px', fontWeight: '700' }}>
                  ✓ เชื่อมต่อเรดาร์หุ่นยนต์สำเร็จ
                </span>
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                ตรวจจับ 360° ทะลุสิ่งกีดขวาง · ล็อกตำแหน่งหุ่นยนต์กึ่งกลางจอ
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Radar Color Themes Palette */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: '#f1f5f9',
              padding: '2px 6px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '0.68rem', fontWeight: '600', color: '#64748b', marginRight: '2px' }}>🎨 สีเรดาร์:</span>
              {RADAR_THEMES.map((theme) => (
                <button
                  key={theme.color}
                  onClick={() => setRadarColor(theme.color)}
                  title={`เปลี่ยนสีเรดาร์เป็น: ${theme.label}`}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: theme.color,
                    border: radarColor === theme.color ? '2px solid #0f172a' : '1px solid rgba(0,0,0,0.15)',
                    transform: radarColor === theme.color ? 'scale(1.2)' : 'scale(1)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: radarColor === theme.color ? `0 0 8px ${theme.color}` : 'none'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setIsDarkMode100(!isDarkMode100)}
              className={`btn-cyber ${isDarkMode100 ? 'btn-cyber-primary' : ''}`}
              style={{ fontSize: '0.76rem', padding: '6px 12px' }}
            >
              {isDarkMode100 ? 'จำลองความมืด: เปิด' : 'จำลองคลังไฟดับ'}
            </button>

            <button
              onClick={handleFlashOnScan}
              className="btn-cyber"
              style={{ fontSize: '0.76rem', padding: '6px 12px' }}
              title="สาธิตการเปิดไฟแฟลชระหว่างสแกน"
            >
              แฟลชระหว่างสแกน
            </button>
          </div>
        </div>

        {/* Square Dark Theme Radar Canvas Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '4px 0'
        }}>
          <canvas
            ref={canvasRef}
            width={520}
            height={380}
            style={{
              borderRadius: '12px',
              border: '1px solid #1e293b',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.2)',
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
            borderRadius: '8px',
            fontSize: '0.72rem',
            color: '#fff',
          }}>
            <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>ความถี่เรดาร์: 60-64 GHz</div>
            <div>ความละเอียดลำคลื่น: 0.15m / 1.2°</div>
            <div>ระยะตรวจจับ: {radarRangeM} เมตร</div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <button
              onClick={handleAddNewBlip}
              className="btn-cyber"
              style={{ fontSize: '0.72rem', padding: '5px 9px', borderColor: 'var(--warning-amber)', color: 'var(--warning-amber)' }}
            >
              + จำลองของตกพื้น
            </button>
            <button
              onClick={() => setShowNLOSOnly(!showNLOSOnly)}
              className="btn-cyber"
              style={{ fontSize: '0.72rem', padding: '5px 9px' }}
            >
              {showNLOSOnly ? 'แสดงเป้าหมายทั้งหมด' : 'กรองเฉพาะจุดอับ'}
            </button>
          </div>
        </div>

        {/* Bottom Feature Pill Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          padding: '12px 14px',
          background: '#fafbfb',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.76rem'
        }}>
          <div>
            <span style={{ color: 'var(--tech-cyan)', fontWeight: 'bold' }}>1. เรดาร์ 360° FMCW</span>
            <div style={{ color: 'var(--text-muted)' }}>ทำงานได้แม้ไม่มีแสงเลย</div>
          </div>
          <div>
            <span style={{ color: 'var(--tech-cyan)', fontWeight: 'bold' }}>2. ทะลุสิ่งกีดขวาง</span>
            <div style={{ color: 'var(--text-muted)' }}>ตรวจจับคนหลังชั้นวางได้</div>
          </div>
          <div>
            <span style={{ color: 'var(--tech-cyan)', fontWeight: 'bold' }}>3. AI ความปลอดภัย</span>
            <div style={{ color: 'var(--text-muted)' }}>เบรกอัตโนมัติเมื่อพบสิ่งกีดขวาง</div>
          </div>
        </div>
      </div>

      {/* RIGHT: BLIP TELEMETRY & SPATIAL SAFETY METRICS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Selected Blip Detail Card */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.96rem', fontWeight: '700', margin: 0 }}>
              รายละเอียดเป้าหมาย
            </h3>
            {selectedBlip && (
              <span className="hud-badge hud-badge-red">
                ความเร่งด่วน: {selectedBlip.urgency === 'HIGH' ? 'สูง' : selectedBlip.urgency === 'MEDIUM' ? 'ปานกลาง' : 'ต่ำ'}
              </span>
            )}
          </div>

          {selectedBlip ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                padding: '10px 12px',
                background: selectedBlip.isBehindObstacle ? 'var(--danger-red-soft)' : 'var(--tech-cyan-soft)',
                borderRadius: '9px'
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                  {selectedBlip.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  ประเภท: {selectedBlip.type} • {selectedBlip.id}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '9px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>ระยะ / มุม</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--tech-cyan)', fontWeight: 'bold', marginTop: '2px' }}>
                    {selectedBlip.distanceM}m @ {selectedBlip.angle}°
                  </div>
                </div>

                <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '9px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>ความเร็ว</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--eco-green-dark)', fontWeight: 'bold', marginTop: '2px' }}>
                    {selectedBlip.speed}
                  </div>
                </div>
              </div>

              <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '9px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>ความแม่นยำในการตรวจจับ</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedBlip.confidence}
                </div>
              </div>

              {selectedBlip.isBehindObstacle && (
                <div style={{
                  padding: '9px 12px',
                  background: 'var(--danger-red-soft)',
                  borderRadius: '9px',
                  fontSize: '0.78rem',
                  color: 'var(--danger-red)',
                  lineHeight: '1.4'
                }}>
                  <strong>ระบบป้องกันการชนจุดอับทำงานแล้ว:</strong> มีคนเคลื่อนที่หลังชั้นวาง A-03 หุ่นยนต์ลดความเร็วลงเหลือ <strong>0.3 m/s</strong> โดยอัตโนมัติ
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '20px' }}>
              เลือกเป้าหมายจากรายการด้านล่าง
            </div>
          )}
        </div>

        {/* Blips Selection List */}
        <div className="glass-panel" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.86rem', fontWeight: '700' }}>
            เป้าหมายที่ตรวจพบ ({radarBlips.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {radarBlips.map((blip) => (
              <div
                key={blip.id}
                onClick={() => setSelectedBlip(blip)}
                style={{
                  background: selectedBlip?.id === blip.id ? 'var(--tech-cyan-soft)' : '#fafbfb',
                  border: selectedBlip?.id === blip.id ? '1px solid var(--tech-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: '9px',
                  padding: '9px 11px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-main)' }}>
                    {blip.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    {blip.distanceM}m • {blip.speed}
                  </div>
                </div>

                <span className={`hud-badge ${blip.isBehindObstacle ? 'hud-badge-red' : 'hud-badge-green'}`} style={{ fontSize: '0.62rem' }}>
                  {blip.isBehindObstacle ? 'จุดอับ' : 'มองเห็นตรง'}
                </span>
              </div>
            ))}
          </div>

          {/* SOS Emergency Button */}
          <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
            <button
              onClick={() => {
                alert('แจ้งเหตุฉุกเฉินแล้ว!\nเรดาร์ตรวจพบคนล้ม/ไม่ตอบสนองในโซน B แจ้งเตือนหัวหน้างานพร้อมพิกัดที่แน่นอนแล้ว');
                if (onTriggerSOS) onTriggerSOS();
              }}
              className="btn-cyber btn-cyber-danger"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.84rem', padding: '10px' }}
            >
              จำลองเหตุการณ์คนล้มในคลัง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

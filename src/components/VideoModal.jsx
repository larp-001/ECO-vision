import React, { useState, useEffect } from 'react';

const TAB_LABELS = { METRICS: 'ข้อมูลหลัก', AI_LAYER: 'การวิเคราะห์ AI', CONTEXT: 'บริบทก่อน-หลัง' };

export default function VideoModal({ log, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(3.5);
  const [activeTab, setActiveTab] = useState('METRICS'); // METRICS | AI_LAYER | CONTEXT

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= (log.durationSec || 8.0)) return 0;
          return +(prev + 0.1).toFixed(1);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, log.durationSec]);

  if (!log) return null;

  const progressPercent = (currentTime / (log.durationSec || 8.0)) * 100;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(26, 29, 36, 0.5)',
      backdropFilter: 'blur(6px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="status-pulse green"></span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0 }}>
                  วิดีโอตรวจสอบ: <span style={{ color: 'var(--tech-cyan)' }}>{log.id}</span>
                </h3>
                <span className={`hud-badge ${log.anomalyDetected ? 'hud-badge-amber' : 'hud-badge-green'}`}>
                  {log.anomalyDetected ? 'พบตำหนิ' : 'ปกติ'}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', margin: '2px 0 0' }}>
                {log.skuName} ({log.skuId}) • เวลา {log.timestamp} • {log.operator}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f1f2f4',
              border: 'none',
              color: 'var(--text-muted)',
              borderRadius: '8px',
              padding: '7px 14px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '600',
              fontFamily: 'inherit',
            }}
          >
            ✕ ปิด
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '16px',
          padding: '18px 20px',
          overflowY: 'auto',
          flex: 1
        }}>
          {/* Left: Video Player Simulation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              position: 'relative',
              borderRadius: '11px',
              overflow: 'hidden',
              height: '320px',
              background: '#f6f7f9',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Synthetic Camera HUD Elements */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 20, display: 'flex', gap: '8px' }}>
                <span className="hud-badge hud-badge-red">● กำลังบันทึก</span>
                <span className="hud-badge hud-badge-cyan">4K · 60FPS · HDR</span>
              </div>

              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 20,
                color: 'var(--text-dim)',
                fontSize: '0.78rem',
              }}>
                {log.timestamp} (+{currentTime.toFixed(1)}s)
              </div>

              {/* Simulated Robot Gripper & Shelf View */}
              <div style={{
                position: 'relative',
                width: '80%',
                height: '75%',
                border: '1px dashed #c9cdd3',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* AI Detection Bounding Box */}
                <div style={{
                  position: 'absolute',
                  width: '140px',
                  height: '140px',
                  border: log.anomalyDetected ? '2px solid var(--danger-red)' : '2px solid var(--eco-green)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '5px'
                }}>
                  <span style={{
                    fontSize: '0.64rem',
                    color: '#fff',
                    background: log.anomalyDetected ? 'var(--danger-red)' : 'var(--eco-green)',
                    padding: '2px 5px',
                    borderRadius: '4px',
                    alignSelf: 'flex-start',
                    fontWeight: 600,
                  }}>
                    {log.anomalyDetected ? 'พบตำหนิ [94%]' : 'ผ่านมาตรฐาน [99.8%]'}
                  </span>

                  <div style={{ textAlign: 'center', color: log.anomalyDetected ? 'var(--danger-red)' : 'var(--eco-green-dark)', display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                    {log.anomalyDetected ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 2v7.31L4.62 17.6A2 2 0 0 0 6.3 20.6h11.4a2 2 0 0 0 1.68-3L14 9.31V2"></path>
                      </svg>
                    )}
                  </div>

                  <span style={{
                    fontSize: '0.6rem',
                    color: '#fff',
                    background: 'rgba(26,29,36,0.7)',
                    padding: '1px 4px',
                    borderRadius: '3px',
                    textAlign: 'center'
                  }}>
                    ตำแหน่ง: {log.shelfLocation.split(' ')[0]}
                  </span>
                </div>

                {/* Simulated Gripper Arm Shadow */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  width: '60px',
                  height: '30px',
                  borderTop: '4px solid var(--tech-cyan)',
                  borderLeft: '4px solid var(--tech-cyan)',
                  borderRight: '4px solid var(--tech-cyan)',
                  borderRadius: '6px 6px 0 0',
                  opacity: 0.6
                }}></div>
              </div>

              {/* Watermark */}
              <div style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                รหัสยืนยันวิดีโอ: #SHA256_9b4e72c81a...
              </div>
            </div>

            {/* Video Player Controls */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
              background: '#fafbfb',
              border: '1px solid var(--border-subtle)',
              padding: '11px 14px',
              borderRadius: '10px',
            }}>
              {/* Timeline seek bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  00:0{currentTime.toFixed(0)}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '6px',
                    background: '#eef0f2',
                    borderRadius: '3px',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = clickX / rect.width;
                    setCurrentTime(+(newProgress * (log.durationSec || 8.0)).toFixed(1));
                  }}
                >
                  <div style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: 'var(--eco-green)',
                    borderRadius: '3px',
                  }}></div>
                  {/* Event Marker Pin */}
                  <div style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '45%',
                    width: '4px',
                    height: '14px',
                    background: 'var(--warning-amber)',
                    borderRadius: '2px',
                  }} title="จุดที่ AI แท็กเหตุการณ์"></div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  00:0{log.durationSec || 8.0}
                </span>
              </div>

              {/* Controls bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn-cyber"
                    style={{ padding: '5px 12px', fontSize: '0.8rem' }}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? 'หยุดชั่วคราว' : 'เล่น'}
                  </button>
                  <button
                    className="btn-cyber"
                    style={{ padding: '5px 12px', fontSize: '0.8rem' }}
                    onClick={() => setCurrentTime(0)}
                  >
                    ↺ เล่นซ้ำ
                  </button>
                  <button
                    className="btn-cyber"
                    style={{ padding: '5px 12px', fontSize: '0.8rem' }}
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 1.5))}
                  >
                    ย้อน 1.5 วิ
                  </button>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--eco-green-dark)', fontWeight: 600 }}>
                  ✓ ยืนยันซ้ำด้วยเรดาร์ mmWave
                </span>
              </div>
            </div>
          </div>

          {/* Right: Inspection & Verification Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', gap: '8px' }}>
              {['METRICS', 'AI_LAYER', 'CONTEXT'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab ? '2px solid var(--tech-cyan)' : '2px solid transparent',
                    color: activeTab === tab ? 'var(--tech-cyan)' : 'var(--text-muted)',
                    padding: '6px 4px',
                    fontSize: '0.84rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {TAB_LABELS[tab]}
                </button>
              ))}
            </div>

            {activeTab === 'METRICS' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px 12px', borderRadius: '9px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>รหัสรายการ</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 'bold', marginTop: '2px' }}>{log.id}</div>
                </div>

                <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px 12px', borderRadius: '9px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>ตำแหน่งชั้นวาง</div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--tech-cyan)', marginTop: '2px' }}>{log.shelfLocation}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px 12px', borderRadius: '9px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>ความแม่นยำ AI</div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--eco-green-dark)', fontWeight: 'bold', marginTop: '2px' }}>{log.confidence}</div>
                  </div>
                  <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px 12px', borderRadius: '9px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>ความยาวคลิป</div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '2px' }}>{log.durationSec} วินาที</div>
                  </div>
                </div>

                {log.anomalyDetected && (
                  <div style={{ background: 'var(--danger-red-soft)', padding: '10px 12px', borderRadius: '9px' }}>
                    <span style={{ color: 'var(--danger-red)', fontWeight: 'bold', fontSize: '0.74rem' }}>
                      หมายเหตุความผิดปกติ:
                    </span>
                    <div style={{ fontSize: '0.82rem', color: 'var(--danger-red)', marginTop: '4px' }}>
                      {log.defectReason}
                    </div>
                  </div>
                )}

                <div style={{
                  background: 'var(--eco-green-soft)',
                  padding: '11px 12px',
                  borderRadius: '9px',
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  lineHeight: '1.5'
                }}>
                  <strong style={{ color: 'var(--eco-green-dark)' }}>✓ หลักฐานตรวจสอบย้อนหลังได้ 100%:</strong> วิดีโอนี้บันทึกในตัวหุ่นยนต์และเชื่อมกับฐานข้อมูลคลังพร้อมประทับเวลา ไม่สามารถแก้ไขย้อนหลังได้
                </div>
              </div>
            )}

            {activeTab === 'AI_LAYER' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div style={{ padding: '10px 12px', background: '#fafbfb', border: '1px solid var(--border-subtle)', borderRadius: '9px' }}>
                  <strong>โมเดล Vision AI:</strong> YOLOv9-Custom-Retail
                </div>
                <div style={{ padding: '10px 12px', background: '#fafbfb', border: '1px solid var(--border-subtle)', borderRadius: '9px' }}>
                  <strong>บาร์โค้ด / QR:</strong> อ่านสำเร็จ [SKU-HEX-9821]
                </div>
                <div style={{ padding: '10px 12px', background: '#fafbfb', border: '1px solid var(--border-subtle)', borderRadius: '9px' }}>
                  <strong>สภาพบรรจุภัณฑ์:</strong> เรียบเนียน 99.4%
                </div>
                <div style={{ padding: '10px 12px', background: '#fafbfb', border: '1px solid var(--border-subtle)', borderRadius: '9px' }}>
                  <strong>ประมาณปริมาณสินค้า:</strong> แม่นยำ 98.2%
                </div>
              </div>
            )}

            {activeTab === 'CONTEXT' && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                <p><strong style={{ color: 'var(--text-main)' }}>ก่อนหยิบ (-30 วินาที):</strong> หุ่นยนต์เข้าใกล้ชั้นวางด้วยความเร็ว 0.6 m/s เรดาร์ mmWave ยืนยันทางเดินโล่งแล้ว</p>
                <p style={{ marginTop: '8px' }}><strong style={{ color: 'var(--text-main)' }}>หลังหยิบ (+30 วินาที):</strong> วางสินค้าในช่องเก็บเรียบร้อย ตรวจสอบบาร์โค้ดก่อนเคลื่อนที่ต่อ</p>
              </div>
            )}

            {/* Bottom Actions */}
            <button
              className="btn-cyber btn-cyber-primary"
              style={{ justifyContent: 'center', fontSize: '0.85rem', padding: '10px', marginTop: 'auto' }}
              onClick={() => alert(`ส่งออกคลิป ${log.id} เป็นหลักฐาน (.mp4 + ข้อมูล JSON) แล้ว`)}
            >
              ส่งออกคลิปหลักฐาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

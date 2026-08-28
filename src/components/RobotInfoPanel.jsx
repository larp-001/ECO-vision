import React, { useState } from 'react';
import { MOCK_VIDEO_LOGS } from '../data/mockData.js';
import VideoModal from './VideoModal.jsx';

// Panel that pops up when the operator clicks the robot in the 3D map.
// Shows quick telemetry + shortcuts to 7-day playback and a "live camera" view.
export default function RobotInfoPanel({ robotStatus, onClose }) {
  const [view, setView] = useState('INFO'); // INFO | HISTORY
  const [openLog, setOpenLog] = useState(null);

  if (!robotStatus) return null;

  const battery = robotStatus.battery ?? 87;
  const currentBoxes = robotStatus.currentBoxes ?? 2;
  const maxBoxes = robotStatus.maxBoxes ?? 6;
  const pickedCount = robotStatus.pickedCount ?? 0;

  const liveFeedLog = {
    id: 'LIVE-FEED',
    timestamp: 'กำลังถ่ายทอดสด',
    skuId: 'CAM-01',
    skuName: 'กล้องเรียลไทม์บนตัวหุ่นยนต์',
    action: 'LIVE_STREAM',
    durationSec: 999,
    status: 'STREAMING',
    confidence: '—',
    operator: 'มุมมองเจ้าของ (Live)',
    shelfLocation: robotStatus.target || robotStatus.currentLocation || 'กำลังปฏิบัติงาน',
    anomalyDetected: false,
    tag: 'LIVE',
    previewBg: 'linear-gradient(135deg, #031014, #052024)',
  };

  return (
    <>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '90px',
          right: '20px',
          width: '290px',
          zIndex: 960,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #e6e8eb',
          borderRadius: '14px',
          boxShadow: '0 20px 48px rgba(16,24,40,.14), 0 4px 12px rgba(16,24,40,.08)',
          padding: '16px',
          color: '#1a1d24',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontFamily: "'IBM Plex Sans Thai', 'IBM Plex Sans', sans-serif",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-pulse green"></span>
            <div>
              <div style={{ fontSize: '0.94rem', fontWeight: 700 }}>{robotStatus.name || 'ECO-Vision Sentinel Pro'}</div>
              <div style={{ fontSize: '0.7rem', color: '#9aa1ab' }}>
                {robotStatus.currentLocation || 'กำลังปฏิบัติงาน'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#f1f2f4', border: 'none', color: '#68707c', borderRadius: '6px', width: '20px', height: '20px', cursor: 'pointer', flexShrink: 0, fontSize: '0.8rem' }}
          >
            ×
          </button>
        </div>

        {view === 'INFO' ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: '#fafbfb', border: '1px solid #e6e8eb', borderRadius: '9px', padding: '9px 10px' }}>
                <div style={{ fontSize: '0.66rem', color: '#9aa1ab' }}>แบตเตอรี่</div>
                <div style={{ fontSize: '1.02rem', fontWeight: 700, color: battery > 30 ? '#15803d' : '#d97706', marginTop: '2px' }}>
                  {battery}%
                </div>
              </div>
              <div style={{ background: '#fafbfb', border: '1px solid #e6e8eb', borderRadius: '9px', padding: '9px 10px' }}>
                <div style={{ fontSize: '0.66rem', color: '#9aa1ab' }}>กำลังถือกล่อง</div>
                <div style={{ fontSize: '1.02rem', fontWeight: 700, marginTop: '2px' }}>
                  {currentBoxes} / {maxBoxes}
                </div>
              </div>
            </div>

            <div style={{ background: '#fafbfb', border: '1px solid #e6e8eb', borderRadius: '9px', padding: '9px 10px', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#9aa1ab' }}>ยกสินค้าไปแล้ววันนี้</span>
              <strong>{pickedCount} ครั้ง</strong>
            </div>

            <div style={{ background: '#fafbfb', border: '1px solid #e6e8eb', borderRadius: '9px', padding: '9px 10px', fontSize: '0.76rem' }}>
              <div style={{ color: '#9aa1ab', fontSize: '0.66rem' }}>เป้าหมายปัจจุบัน</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{robotStatus.target || '—'}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '2px' }}>
              <button
                onClick={() => setView('HISTORY')}
                style={{
                  height: '38px', borderRadius: '9px', border: '1px solid #e6e8eb', background: '#fff',
                  fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600, color: '#1a1d24', cursor: 'pointer',
                }}
              >
                ดูวิดีโอย้อนหลัง 7 วัน
              </button>
              <button
                onClick={() => setOpenLog(liveFeedLog)}
                style={{
                  height: '38px', borderRadius: '9px', border: 'none', background: '#16a34a',
                  fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600, color: '#fff', cursor: 'pointer',
                }}
              >
                ดูกล้องเรียลไทม์
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb' }}>ประวัติย้อนหลัง 7 วัน</span>
              <button onClick={() => setView('INFO')} style={{ background: 'transparent', border: 'none', color: '#68707c', fontSize: '0.72rem', cursor: 'pointer' }}>
                ← กลับ
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '260px', overflowY: 'auto' }}>
              {MOCK_VIDEO_LOGS.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setOpenLog(log)}
                  style={{
                    background: '#fafbfb',
                    border: '1px solid #e6e8eb',
                    borderRadius: '9px',
                    padding: '8px 10px',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1a1d24', fontWeight: 600 }}>
                    <span>{log.skuName}</span>
                    <span style={{ color: '#9aa1ab' }}>{log.timestamp}</span>
                  </div>
                  <div style={{ color: log.anomalyDetected ? '#dc2626' : '#68707c', marginTop: '2px' }}>
                    {log.status}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {openLog && <VideoModal log={openLog} onClose={() => setOpenLog(null)} />}
    </>
  );
}

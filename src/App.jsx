import React, { useState } from 'react';
import Factory3D from './components/Factory3D';
import AIAdvisory from './components/AIAdvisory';
import CCTVDashboard from './components/CCTVDashboard';
import RadarMonitor from './components/RadarMonitor';
import VideoModal from './components/VideoModal';
import { MOCK_VIDEO_LOGS } from './data/mockData';

export default function App() {
  const [activeOverlayTab, setActiveOverlayTab] = useState('3D_FACTORY'); // 3D_FACTORY | CCTV_LOGS | RADAR_ANALYSIS | AI_PROPOSAL
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeVideoModalLog, setActiveVideoModalLog] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#050811' }}>
      {/* 3D Interactive Factory Scene (Primary View) */}
      <Factory3D
        isNightMode={isNightMode}
        setIsNightMode={setIsNightMode}
        onRobotPickEvent={(rackName) => {
          setActiveVideoModalLog(MOCK_VIDEO_LOGS[0]);
        }}
      />

      {/* Top Overlay Tabs (Optional drill-down into detailed telemetry) */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '240px',
        zIndex: 101,
        display: 'flex',
        gap: '6px'
      }}>
        {[
          { id: '3D_FACTORY', label: '🏭 3D FACTORY' },
          { id: 'CCTV_LOGS', label: '🎥 CCTV AUDIT LOGS' },
          { id: 'RADAR_ANALYSIS', label: '📡 mmWAVE RADAR' },
          { id: 'AI_PROPOSAL', label: '🧠 AI SLOTTING PLAN' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveOverlayTab(tab.id)}
            style={{
              background: activeOverlayTab === tab.id ? 'var(--tech-cyan)' : 'rgba(8, 14, 22, 0.85)',
              color: activeOverlayTab === tab.id ? '#000' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '0.78rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              boxShadow: activeOverlayTab === tab.id ? '0 0 15px rgba(0, 176, 255, 0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Modal Drawer when user clicks detail tabs */}
      {activeOverlayTab !== '3D_FACTORY' && (
        <div style={{
          position: 'fixed',
          inset: '70px 24px 24px 24px',
          background: 'rgba(6, 12, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          border: '1px solid var(--border-cyan)',
          zIndex: 200,
          boxShadow: '0 0 50px rgba(0,0,0,0.85)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Drawer Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(10, 18, 28, 0.9)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
              {activeOverlayTab === 'CCTV_LOGS' && '🎥 VIDEO-BACKED AUDIT LOGS & POINT-TO-PICK'}
              {activeOverlayTab === 'RADAR_ANALYSIS' && '📡 STANDALONE mmWAVE RADAR 360° TELEMETRY'}
              {activeOverlayTab === 'AI_PROPOSAL' && '🧠 AI INVENTORY OPTIMIZATION & APPROVAL'}
            </h3>

            <button
              onClick={() => setActiveOverlayTab('3D_FACTORY')}
              className="btn-cyber btn-cyber-primary"
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              ✕ RETURN TO 3D FACTORY
            </button>
          </div>

          <div style={{ flex: 1, overflow: 'hidden' }}>
            {activeOverlayTab === 'CCTV_LOGS' && (
              <CCTVDashboard onOpenVideoLog={(log) => setActiveVideoModalLog(log)} />
            )}
            {activeOverlayTab === 'RADAR_ANALYSIS' && (
              <RadarMonitor />
            )}
            {activeOverlayTab === 'AI_PROPOSAL' && (
              <AIAdvisory />
            )}
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideoModalLog && (
        <VideoModal
          log={activeVideoModalLog}
          onClose={() => setActiveVideoModalLog(null)}
        />
      )}
    </div>
  );
}

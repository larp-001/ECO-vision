import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import StatusBar from './StatusBar.jsx';
import Factory3D from './Factory3D.jsx';
import CCTVDashboard from './CCTVDashboard.jsx';
import RadarMonitor from './RadarMonitor.jsx';
import InventoryPanel from './InventoryPanel.jsx';
import AIAdvisory from './AIAdvisory.jsx';
import NightSleepMode from './NightSleepMode.jsx';
import VideoModal from './VideoModal.jsx';
import AlertNotification from './AlertNotification.jsx';
import { INITIAL_ROBOT_STATUS, MOCK_SYSTEM_ALERTS } from '../data/mockData.js';

// Wireframe-level shell that wires the previously-standalone screens together:
// MAP (3D factory twin) is the landing view; the other tabs share a Sidebar + StatusBar layout.
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('MAP');
  const [activeMode, setActiveMode] = useState('ACTIVE');
  const [robotStatus] = useState(INITIAL_ROBOT_STATUS);
  const [openVideoLog, setOpenVideoLog] = useState(null);
  const [alerts, setAlerts] = useState(MOCK_SYSTEM_ALERTS.filter((a) => a.active));

  const handleDismissAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  if (activeTab === 'MAP') {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Factory3D onOpenDashboard={() => setActiveTab('CCTV')} />
      </div>
    );
  }

  const navList = [
    { id: 'MAP', label: '3D แผนผัง', icon: '🗺️' },
    { id: 'CCTV', label: 'Vision AI', icon: '📹' },
    { id: 'RADAR', label: 'เรดาร์', icon: '📡' },
    { id: 'INVENTORY', label: 'คลังสินค้า', icon: '📦' },
    { id: 'ADVISORY', label: 'AI จัดคลัง', icon: '🧠' },
    { id: 'SLEEP', label: 'พักพลังงาน', icon: '🌙' },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#f6f7f9', overflow: 'hidden', fontFamily: "'IBM Plex Sans Thai', 'IBM Plex Sans', sans-serif", position: 'relative' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} robotStatus={robotStatus} activeMode={activeMode} setPowerMode={setActiveMode} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <StatusBar robotStatus={robotStatus} activeMode={activeMode} onTriggerSimulatedAnomaly={() => {}} />

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '60px' }}>
          {activeTab === 'CCTV' && <CCTVDashboard onOpenVideoLog={setOpenVideoLog} onTriggerPick={() => {}} />}
          {activeTab === 'RADAR' && <RadarMonitor onSimulateFallenItem={() => {}} onTriggerSOS={() => {}} />}
          {activeTab === 'INVENTORY' && <InventoryPanel onDispatchPick={() => {}} />}
          {activeTab === 'ADVISORY' && <AIAdvisory />}
          {activeTab === 'SLEEP' && <NightSleepMode robotStatus={robotStatus} activeMode={activeMode} setPowerMode={setActiveMode} />}
        </div>
      </div>

      {/* Responsive Mobile / Tablet Bottom Navigation */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '56px',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid #e6e8eb',
          zIndex: 950,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '4px 6px',
          boxShadow: '0 -4px 16px rgba(16,24,40,0.06)',
        }}
      >
        {navList.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                background: isActive ? '#dcfce7' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '4px 8px',
                cursor: 'pointer',
                color: isActive ? '#15803d' : '#68707c',
                fontSize: '0.68rem',
                fontWeight: isActive ? '700' : '500',
                fontFamily: 'inherit',
                flex: 1,
                minWidth: 0,
              }}
            >
              <span style={{ fontSize: '1rem' }}>{item.icon}</span>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '54px' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {openVideoLog && <VideoModal log={openVideoLog} onClose={() => setOpenVideoLog(null)} />}
      <AlertNotification alerts={alerts} onDismiss={handleDismissAlert} onSelectAlert={() => {}} />
    </div>
  );
}

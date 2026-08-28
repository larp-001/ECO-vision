import React from 'react';

// Clean Minimalist SVG Icons
const Icons = {
  ChevronLeft: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Isometric: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  FollowBot: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7"></circle>
      <circle cx="12" cy="12" r="3"></circle>
      <line x1="12" y1="2" x2="12" y2="5"></line>
      <line x1="12" y1="19" x2="12" y2="22"></line>
      <line x1="2" y1="12" x2="5" y2="12"></line>
      <line x1="19" y1="12" x2="22" y2="12"></line>
    </svg>
  ),
  TopView: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="3" y1="15" x2="21" y2="15"></line>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <line x1="15" y1="3" x2="15" y2="21"></line>
    </svg>
  ),
  BoxAlert: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <circle cx="12" cy="16" r="0.5" fill="currentColor"></circle>
    </svg>
  ),
  Sun: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Pin: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  Wrench: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  ),
  History: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
      <polyline points="3 3 3 8 8 8"></polyline>
      <polyline points="12 7 12 12 15 15"></polyline>
    </svg>
  ),
  Save: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  ),
  Clock: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Box: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Play: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  ),
  Rotate: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"></polyline>
      <polyline points="23 20 23 14 17 14"></polyline>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
    </svg>
  )
};

export default function ToolDrawer({
  isOpen,
  setIsOpen,
  isNightMode,
  setIsNightMode,
  cameraView,
  setCameraView,
  robotStatus,
  onEditCurrentLayout,
  onEnterSettingMode,
  onRestoreDemoFactory,
  onClearAllPins,
  onDeletePin,
  isPlacingMode,
  setIsPlacingMode,
  onToggleAnomaly,
  hasAnomaly,
  pinnedTargets = [],
  onDispatchToPin,
  onTriggerIntro,
  // HISTORY TAB PROPS
  savedLayouts = [],
  onSaveCurrentLayout,
  onLoadSavedLayout,
  onDeleteSavedLayout,
  currentGridSize = { width: 60, depth: 58 },
  currentPlacedObjectsCount = 0,
  currentObjects = [],
  currentRoutes = [],
  currentRoadTiles = [],
}) {
  const [drawerTab, setDrawerTab] = React.useState('TOOLS'); // 'TOOLS' | 'HISTORY'
  const [newLayoutName, setNewLayoutName] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = () => {
    const nameToSave = newLayoutName.trim() || `ผังโรงงาน #${savedLayouts.length + 1} (${currentGridSize.width}×${currentGridSize.depth}m)`;
    if (onSaveCurrentLayout) {
      onSaveCurrentLayout(nameToSave);
    }
    setNewLayoutName('');
    setIsSaving(false);
  };

  const handleExportJSON = () => {
    const payload = {
      name: `ผังโรงงาน (${currentGridSize.width}×${currentGridSize.depth}m)`,
      gridSize: currentGridSize,
      objects: currentObjects,
      routes: currentRoutes,
      roadTiles: currentRoadTiles,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      alert('คัดลอกข้อมูลผัง (JSON) ลงในคลิปบอร์ดแล้ว! สามารถนำไปวางหรือแชร์ให้เครื่องอื่นได้ทันที');
    }).catch(() => {
      prompt('คัดลอก JSON ด้านล่างนี้:', jsonStr);
    });
  };

  const handleImportJSON = () => {
    const input = prompt('กรุณาวางโค้ด JSON ของผังที่ต้องการนำเข้า:');
    if (!input) return;
    try {
      const parsed = JSON.parse(input.trim());
      if (parsed.objects && Array.isArray(parsed.objects)) {
        if (onLoadSavedLayout) {
          onLoadSavedLayout(parsed);
          alert(`นำเข้าผัง "${parsed.name || 'ผังที่นำเข้า'}" เรียบร้อยแล้ว!`);
          setIsOpen(false);
        }
      } else {
        alert('รูปแบบ JSON ไม่ถูกต้อง');
      }
    } catch {
      alert('ไม่สามารถอ่าน JSON ได้ กรุณาตรวจสอบความถูกต้อง');
    }
  };

  return (
    <>
      {/* MINIMALIST LIGHT DRAWER TAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '50%',
          right: isOpen ? '350px' : '0px',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid #e6e8eb',
          borderRight: 'none',
          borderRadius: '12px 0 0 12px',
          padding: '12px 9px',
          color: '#1a1d24',
          cursor: 'pointer',
          boxShadow: '-4px 8px 24px rgba(16,24,40,.10)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: "'IBM Plex Sans Thai', 'IBM Plex Sans', sans-serif",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#f4f5f6';
          e.currentTarget.style.color = '#16a34a';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.96)';
          e.currentTarget.style.color = '#1a1d24';
        }}
      >
        <span style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Icons.ChevronLeft />
        </span>

        <span style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          fontSize: '0.72rem',
          letterSpacing: '0.08em',
          fontWeight: '500',
          opacity: 0.85
        }}>
          เครื่องมือ & ประวัติ
        </span>
      </button>

      {/* MINIMALIST LIGHT FROSTED GLASS DRAWER */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '350px',
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          borderLeft: '1px solid #e6e8eb',
          boxShadow: '-12px 0 40px rgba(16,24,40,.08)',
          zIndex: 999,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'IBM Plex Sans Thai', 'IBM Plex Sans', sans-serif",
          color: '#1a1d24',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* DRAWER HEADER */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e6e8eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1a1d24' }}>
              แผงควบคุม & เครื่องมือ
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: '#f4f5f6',
              border: '1px solid #e6e8eb',
              color: '#68707c',
              borderRadius: '7px',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#eef0f2'; e.currentTarget.style.color = '#1a1d24'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#f4f5f6'; e.currentTarget.style.color = '#68707c'; }}
          >
            <Icons.Close />
          </button>
        </div>

        {/* DRAWER TAB TOGGLE */}
        <div style={{
          padding: '8px 16px',
          borderBottom: '1px solid #e6e8eb',
          display: 'flex',
          gap: '6px',
          background: '#f8fafc',
          flexShrink: 0
        }}>
          <button
            onClick={() => setDrawerTab('TOOLS')}
            style={{
              flex: 1,
              background: drawerTab === 'TOOLS' ? '#ffffff' : 'transparent',
              border: drawerTab === 'TOOLS' ? '1px solid #e2e8f0' : 'none',
              boxShadow: drawerTab === 'TOOLS' ? '0 1px 3px rgba(16,24,40,0.06)' : 'none',
              color: drawerTab === 'TOOLS' ? '#2563eb' : '#64748b',
              borderRadius: '7px',
              padding: '6px 0',
              fontSize: '0.76rem',
              fontWeight: drawerTab === 'TOOLS' ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s',
              fontFamily: 'inherit'
            }}
          >
            <Icons.Wrench />
            <span>เครื่องมือ</span>
          </button>

          <button
            onClick={() => setDrawerTab('HISTORY')}
            style={{
              flex: 1,
              background: drawerTab === 'HISTORY' ? '#ffffff' : 'transparent',
              border: drawerTab === 'HISTORY' ? '1px solid #e2e8f0' : 'none',
              boxShadow: drawerTab === 'HISTORY' ? '0 1px 3px rgba(16,24,40,0.06)' : 'none',
              color: drawerTab === 'HISTORY' ? '#16a34a' : '#64748b',
              borderRadius: '7px',
              padding: '6px 0',
              fontSize: '0.76rem',
              fontWeight: drawerTab === 'HISTORY' ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s',
              fontFamily: 'inherit'
            }}
          >
            <Icons.History />
            <span>ประวัติ & บันทึก ({savedLayouts.length})</span>
          </button>
        </div>

        {/* DRAWER CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* TAB 1: HISTORY */}
          {drawerTab === 'HISTORY' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Quick Save Current Layout Card */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: '600', color: '#15803d', whiteSpace: 'nowrap' }}>
                    <Icons.Save />
                    <span style={{ whiteSpace: 'nowrap' }}>บันทึกผังปัจจุบัน</span>
                  </div>
                  <span style={{ fontSize: '0.66rem', color: '#68707c' }}>
                    {currentPlacedObjectsCount} วัตถุ ({currentGridSize.width}×{currentGridSize.depth}m)
                  </span>
                </div>

                {!isSaving ? (
                  <button
                    onClick={() => setIsSaving(true)}
                    style={{
                      background: '#16a34a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '7px 10px',
                      fontSize: '0.76rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.15s'
                    }}
                  >
                    <Icons.Plus />
                    <span>บันทึกผังนี้</span>
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <input
                      type="text"
                      placeholder={`ตั้งชื่อผัง เช่น ผังคลังโซน ${savedLayouts.length + 1}...`}
                      value={newLayoutName}
                      onChange={(e) => setNewLayoutName(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #86efac',
                        borderRadius: '5px',
                        padding: '5px 8px',
                        fontSize: '0.76rem',
                        color: '#1a1d24',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button
                        onClick={handleSave}
                        style={{
                          flex: 1,
                          background: '#16a34a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '5px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        ยืนยัน
                      </button>
                      <button
                        onClick={() => setIsSaving(false)}
                        style={{
                          background: '#f4f5f6',
                          color: '#1a1d24',
                          border: '1px solid #e6e8eb',
                          borderRadius: '5px',
                          padding: '5px 8px',
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Export / Import JSON & Quick Master Layout Loader */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={handleExportJSON}
                  title="คัดลอกข้อมูลผังเป็น JSON เพื่อนำไปแชร์ให้เครื่องอื่น"
                  style={{
                    flex: 1,
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#2563eb',
                    borderRadius: '7px',
                    padding: '6px 8px',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <span>📋 คัดลอก JSON ผัง</span>
                </button>
                <button
                  onClick={handleImportJSON}
                  title="วางโค้ด JSON เพื่อโหลดผังจากเครื่องอื่น"
                  style={{
                    flex: 1,
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    borderRadius: '7px',
                    padding: '6px 8px',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <span>📥 นำเข้า JSON</span>
                </button>
              </div>

            {/* List of Saved Layout Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#68707c' }}>
                ผังที่บันทึกไว้ ({savedLayouts.length})
              </span>

              {savedLayouts.length === 0 ? (
                <div style={{
                  padding: '20px 14px',
                  textAlign: 'center',
                  background: '#fafbfb',
                  border: '1px dashed #e6e8eb',
                  borderRadius: '8px',
                  color: '#9aa1ab',
                  fontSize: '0.74rem'
                }}>
                  ยังไม่มีผังที่บันทึกไว้
                </div>
              ) : (
                savedLayouts.map((layout, idx) => {
                  const rackCount = (layout.objects || []).filter(o => o.type === 'STORAGE_RACK').length;
                  const boxCount = (layout.objects || []).filter(o => o.type === 'PARCEL_BOX').length;
                  const routeCount = (layout.routes || []).length;

                  return (
                    <div
                      key={layout.id || idx}
                      style={{
                        background: '#fafbfb',
                        border: '1px solid #e6e8eb',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        transition: 'all 0.15s'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = '#93c5fd'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e6e8eb'; }}
                    >
                      {/* Top: Title & Date */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1a1d24' }}>
                            {layout.name}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.64rem', color: '#9aa1ab', marginTop: '2px' }}>
                            <Icons.Clock />
                            <span>{layout.savedAt || 'บันทึกเมื่อสักครู่'}</span>
                          </div>
                        </div>
                        <span style={{
                          background: '#eff6ff',
                          border: '1px solid #bfdbfe',
                          color: '#2563eb',
                          borderRadius: '4px',
                          padding: '1px 5px',
                          fontSize: '0.66rem',
                          fontFamily: 'monospace'
                        }}>
                          {layout.gridSize?.width || 52}×{layout.gridSize?.depth || 36}m
                        </span>
                      </div>

                      {/* Middle: Object Badges */}
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', fontSize: '0.66rem', color: '#68707c' }}>
                        <span style={{ background: '#f4f5f6', padding: '2px 5px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Icons.Box /> {rackCount} ชั้นวาง
                        </span>
                        <span style={{ background: '#f4f5f6', padding: '2px 5px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Icons.Box /> {boxCount} กล่อง
                        </span>
                        {routeCount > 0 && (
                          <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 5px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Icons.Pin /> {routeCount} Route
                          </span>
                        )}
                      </div>

                      {/* Bottom: Action Buttons */}
                      <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
                        <button
                          onClick={() => {
                            if (onLoadSavedLayout) onLoadSavedLayout(layout);
                            setIsOpen(false);
                          }}
                          style={{
                            flex: 1,
                            background: '#dcfce7',
                            border: '1px solid #86efac',
                            color: '#15803d',
                            borderRadius: '5px',
                            padding: '5px 8px',
                            fontSize: '0.72rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            transition: 'all 0.15s'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = '#bbf7d0'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = '#dcfce7'; }}
                        >
                          <Icons.Play />
                          <span>โหลดผัง</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`คุณต้องการลบผัง "${layout.name}" ออกจากประวัติหรือไม่?`)) {
                              if (onDeleteSavedLayout) onDeleteSavedLayout(layout.id);
                            }
                          }}
                          title="ลบผัง"
                          style={{
                            background: '#fee2e2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            borderRadius: '5px',
                            padding: '5px 7px',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = '#fecaca'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: TOOLS & CONTROLS */}
        {drawerTab === 'TOOLS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* SECTION 1: FACTORY LAYOUT BUILDER & PRESETS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#2563eb', letterSpacing: '0.04em' }}>
                จัดการผังโรงงาน
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {/* 1. Edit Current Layout */}
                <button
                  onClick={() => {
                    if (onEditCurrentLayout) onEditCurrentLayout();
                    setIsOpen(false);
                  }}
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1a1d24',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#dbeafe';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#eff6ff';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#2563eb' }}>
                      <Icons.Edit />
                    </span>
                    <div style={{ textAlign: 'left' }}>
                      <div>ปรับแต่งผังปัจจุบัน</div>
                      <div style={{ fontSize: '0.64rem', color: '#68707c', fontWeight: '400' }}>
                        แก้ไขวัตถุในผังเดิม
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#2563eb' }}>→</span>
                </button>

                {/* 2. New Blank Layout */}
                <button
                  onClick={() => {
                    if (onEnterSettingMode) onEnterSettingMode();
                    setIsOpen(false);
                  }}
                  style={{
                    background: '#fafbfb',
                    border: '1px solid #e6e8eb',
                    color: '#1a1d24',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#f4f5f6'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#fafbfb'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#68707c' }}>
                      <Icons.Plus />
                    </span>
                    <div style={{ textAlign: 'left' }}>
                      <div>สร้างผังใหม่</div>
                      <div style={{ fontSize: '0.64rem', color: '#9aa1ab' }}>
                        เคลียร์พื้น Grid ว่าง
                      </div>
                    </div>
                  </div>
                </button>

                {/* 3. Restore Demo Factory Layout */}
                <button
                  onClick={() => {
                    if (onRestoreDemoFactory) onRestoreDemoFactory();
                    setIsOpen(false);
                  }}
                  style={{
                    background: '#fafbfb',
                    border: '1px solid #e6e8eb',
                    color: '#1a1d24',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#f4f5f6'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#fafbfb'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#68707c' }}>
                      <Icons.Rotate />
                    </span>
                    <div style={{ textAlign: 'left' }}>
                      <div>โหลดผังตัวอย่าง</div>
                      <div style={{ fontSize: '0.64rem', color: '#9aa1ab' }}>
                        ผังโรงงานมาตรฐาน
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* SECTION 2: PINNED TARGET LOCATIONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#15803d', letterSpacing: '0.04em' }}>
                  จุดปักหมุด ({pinnedTargets.length})
                </span>
                {pinnedTargets.length > 0 && onClearAllPins && (
                  <button
                    onClick={() => {
                      if (confirm('คุณต้องการลบหมุดและ Route ทั้งหมดใช่หรือไม่?')) {
                        onClearAllPins();
                      }
                    }}
                    style={{
                      background: '#fee2e2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      borderRadius: '4px',
                      padding: '2px 5px',
                      fontSize: '0.64rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ลบทั้งหมด
                  </button>
                )}
              </div>

              {pinnedTargets.length === 0 ? (
                <div style={{
                  padding: '10px 12px',
                  background: '#fafbfb',
                  border: '1px dashed #e6e8eb',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  color: '#9aa1ab',
                  textAlign: 'center'
                }}>
                  ยังไม่มีจุดปักหมุดในผัง
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {pinnedTargets.map((pin) => (
                    <div
                      key={pin.id}
                      style={{
                        background: '#fafbfb',
                        border: '1px solid #e6e8eb',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.74rem',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div
                        onClick={() => onDispatchToPin && onDispatchToPin(pin)}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', flex: 1, color: '#1a1d24' }}
                        title="คลิกเพื่อให้หุ่นยนต์วิ่งไป"
                      >
                        <Icons.Pin />
                        <span style={{ fontWeight: '500' }}>{pin.name || 'หมุดหยิบ'}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          onClick={() => onDispatchToPin && onDispatchToPin(pin)}
                          style={{
                            background: '#dcfce7',
                            border: '1px solid #86efac',
                            color: '#15803d',
                            borderRadius: '4px',
                            padding: '3px 6px',
                            fontSize: '0.66rem',
                            cursor: 'pointer'
                          }}
                        >
                          วิ่งไป →
                        </button>

                        <button
                          onClick={() => {
                            if (onDeletePin) onDeletePin(pin.id);
                          }}
                          title="ลบหมุดนี้"
                          style={{
                            background: '#fee2e2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            borderRadius: '4px',
                            padding: '3px 5px',
                            fontSize: '0.66rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 3: CAMERA VIEW */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#68707c', letterSpacing: '0.04em' }}>
                  มุมมองกล้อง 3D
                </span>
                {onTriggerIntro && (
                  <button
                    onClick={onTriggerIntro}
                    style={{
                      background: '#dcfce7',
                      border: '1px solid #86efac',
                      color: '#15803d',
                      borderRadius: '5px',
                      padding: '2px 6px',
                      fontSize: '0.66rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Icons.Play />
                    <span>ซูมเข้า</span>
                  </button>
                )}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '5px',
                background: '#f4f5f6',
                padding: '3px',
                borderRadius: '8px'
              }}>
                {[
                  { id: 'ISOMETRIC', label: '3D ปกติ', icon: <Icons.Isometric /> },
                  { id: 'FOLLOW_AMR', label: 'ตามหุ่น', icon: <Icons.FollowBot /> },
                  { id: 'OVERVIEW', label: 'มุมสูง', icon: <Icons.TopView /> },
                ].map((v) => {
                  const isActive = cameraView === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setCameraView(v.id)}
                      style={{
                        background: isActive ? '#ffffff' : 'transparent',
                        color: isActive ? '#1a1d24' : '#68707c',
                        border: isActive ? '1px solid #e6e8eb' : 'none',
                        borderRadius: '6px',
                        padding: '6px 3px',
                        fontSize: '0.7rem',
                        fontWeight: isActive ? '600' : '400',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? '0 1px 3px rgba(16,24,40,.08)' : 'none',
                        fontFamily: 'inherit',
                      }}
                    >
                      <span style={{ opacity: isActive ? 1 : 0.7 }}>{v.icon}</span>
                      <span>{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 4: ROBOT SIMULATION & ANOMALY */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#68707c', letterSpacing: '0.04em' }}>
                จำลองสถานการณ์
              </span>

              <button
                onClick={onToggleAnomaly}
                style={{
                  background: hasAnomaly ? '#fee2e2' : '#fef3c7',
                  border: hasAnomaly ? '1px solid #fecaca' : '1px solid #fde68a',
                  color: hasAnomaly ? '#dc2626' : '#d97706',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '0.78rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Icons.BoxAlert />
                  <span>{hasAnomaly ? 'ตรวจพบสิ่งกีดขวาง (คลิกเพื่อเคลียร์)' : 'จำลองสิ่งกีดขวางบนทางเดิน'}</span>
                </div>
              </button>
            </div>

            {/* SECTION 5: DAY / NIGHT MODE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#68707c', letterSpacing: '0.04em' }}>
                โหมดพลังงาน
              </span>

              <button
                onClick={() => setIsNightMode(!isNightMode)}
                style={{
                  background: isNightMode ? '#f3e8fd' : '#fafbfb',
                  border: isNightMode ? '1px solid #e9d5ff' : '1px solid #e6e8eb',
                  color: '#1a1d24',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '0.78rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: isNightMode ? '#7c3aed' : '#1a1d24' }}>
                  {isNightMode ? <Icons.Moon /> : <Icons.Sun />}
                  <span>{isNightMode ? 'โหมดกลางคืน (ประหยัดไฟ)' : 'โหมดกลางวัน'}</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Telemetry Footer */}
        <div style={{
          marginTop: 'auto',
          background: '#fafbfb',
          border: '1px solid #e6e8eb',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          fontSize: '0.72rem',
          color: '#1a1d24'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#9aa1ab' }}>สถานะหุ่นยนต์:</span>
            <span style={{ color: '#15803d', fontWeight: '500' }}>{robotStatus.mode}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#9aa1ab' }}>แบตเตอรี่:</span>
            <span style={{ fontWeight: '500' }}>{robotStatus.battery}%</span>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

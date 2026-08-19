import React, { useState } from 'react';

// Crisp SVG Icons (No Emojis)
const Icons = {
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Pin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  Rotate: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
    </svg>
  ),
  Grid: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  Rack: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Box: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <line x1="10" y1="4" x2="10" y2="10"></line>
      <line x1="14" y1="4" x2="14" y2="10"></line>
    </svg>
  ),
  Machine: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
      <path d="M12 2v4M12 18v4"></path>
    </svg>
  ),
  Zap: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Alert: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  )
};

export default function ObjectInspector({
  selectedObject,
  onUpdateObject,
  onDeleteObject,
  onPinTargetForRobot,
  onClose
}) {
  const [collisionWarning, setCollisionWarning] = useState(false);

  if (!selectedObject) return null;

  const isMachine = selectedObject.type === 'MACHINE_STATION';
  const isParcel = selectedObject.type === 'PARCEL_BOX';
  const isCharging = selectedObject.type === 'CHARGING_STATION';
  const isPin = selectedObject.type === 'PICKUP_PIN';

  const typeIcon = isMachine
    ? <Icons.Machine />
    : isParcel
    ? <Icons.Box />
    : isCharging
    ? <Icons.Zap />
    : isPin
    ? <Icons.Pin />
    : <Icons.Rack />;

  const typeTitle = isMachine
    ? 'เครื่องจักรโรงงาน'
    : isParcel
    ? 'กล่องพัสดุ'
    : isCharging
    ? 'จุดชาร์จหุ่นยนต์'
    : isPin
    ? 'หมุดหยิบของ'
    : 'ชั้นวางสินค้าหนัก';

  // Calculate current grid cell footprint (Each grid cell = 2m)
  const currentGridCellsW = Math.max(1, Math.round((selectedObject.width || 4) / 2));
  const currentGridCellsD = Math.max(1, Math.round((selectedObject.depth || 2) / 2));

  const handleDimensionChange = (dimensionKey, value) => {
    const candidate = { ...selectedObject, [dimensionKey]: value };
    const success = onUpdateObject(candidate);
    if (!success) {
      setCollisionWarning(true);
      setTimeout(() => setCollisionWarning(false), 2000);
    } else {
      setCollisionWarning(false);
    }
  };

  const handleSetGridSize = (gridW, gridD) => {
    const newWidth = gridW * 2;
    const newDepth = gridD * 2;
    const candidate = { ...selectedObject, width: newWidth, depth: newDepth };
    const success = onUpdateObject(candidate);
    if (!success) {
      setCollisionWarning(true);
      setTimeout(() => setCollisionWarning(false), 2000);
    } else {
      setCollisionWarning(false);
    }
  };

  const handleStepGrid = (dimensionKey, deltaCells) => {
    const currentVal = selectedObject[dimensionKey] || 2;
    const currentCells = Math.round(currentVal / 2);
    const targetCells = Math.max(1, currentCells + deltaCells);
    handleDimensionChange(dimensionKey, targetCells * 2);
  };

  const handleRotate90 = (e) => {
    e.stopPropagation();
    const currentRot = selectedObject.rotation || 0;
    const nextRot = (currentRot + Math.PI / 2) % (Math.PI * 2);
    const candidate = { ...selectedObject, rotation: nextRot };
    const success = onUpdateObject(candidate);
    if (!success) {
      setCollisionWarning(true);
      setTimeout(() => setCollisionWarning(false), 2000);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDeleteObject && selectedObject?.id) {
      onDeleteObject(selectedObject.id);
    }
  };

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        width: '310px',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
        background: 'rgba(13, 19, 30, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '14px',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        color: '#fff',
        zIndex: 950,
        pointerEvents: 'auto'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#38bdf8' }}>{typeIcon}</span>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#f8fafc' }}>
              {typeTitle}
            </div>
            <div style={{ fontSize: '0.66rem', color: 'rgba(255, 255, 255, 0.45)', fontFamily: 'monospace' }}>
              พิกัด: [X: {selectedObject.x.toFixed(1)}, Z: {selectedObject.z.toFixed(1)}]
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '6px',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }}
        >
          <Icons.Close />
        </button>
      </div>

      {/* Collision Warning Banner */}
      {collisionWarning && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.18)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          color: '#fca5a5',
          borderRadius: '6px',
          padding: '5px 8px',
          fontSize: '0.7rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Icons.Alert />
          <span>ตำแหน่งทับซ้อนวัตถุอื่น</span>
        </div>
      )}

      {/* Name / SKU Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <label style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500' }}>
          ชื่อวัตถุ
        </label>
        <input
          type="text"
          value={selectedObject.name || ''}
          onChange={(e) => onUpdateObject({ ...selectedObject, name: e.target.value })}
          placeholder="ระบุชื่อวัตถุ..."
          style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '6px',
            padding: '6px 9px',
            color: '#fff',
            fontSize: '0.78rem',
            outline: 'none'
          }}
        />
      </div>

      {/* GRID TILE QUICK SIZE SELECTOR & ROTATION */}
      {!isPin && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.28)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '8px',
          padding: '8px 9px',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px'
        }}>
          {/* Header of Grid section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', fontWeight: '600', color: '#38bdf8' }}>
              <Icons.Grid />
              <span>ขนาด Grid (2m/ช่อง)</span>
            </div>

            {/* Quick Rotate Button */}
            <button
              onClick={handleRotate90}
              title="หมุน 90°"
              style={{
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                borderRadius: '5px',
                padding: '2px 7px',
                fontSize: '0.68rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Icons.Rotate />
              <span>หมุน 90°</span>
            </button>
          </div>

          {/* Quick Preset Chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            {[
              { label: '1×1 (2m)', w: 1, d: 1 },
              { label: '2×1 (4m)', w: 2, d: 1 },
              { label: '3×1 (6m)', w: 3, d: 1 },
              { label: '2×2 (4m)', w: 2, d: 2 },
              { label: '3×2 (6m)', w: 3, d: 2 },
              { label: '4×2 (8m)', w: 4, d: 2 },
            ].map((p) => {
              const isActive = currentGridCellsW === p.w && currentGridCellsD === p.d;
              return (
                <button
                  key={p.label}
                  onClick={() => handleSetGridSize(p.w, p.d)}
                  style={{
                    background: isActive ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: isActive ? '1px solid #00e676' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#a7f3d0' : 'rgba(255, 255, 255, 0.75)',
                    borderRadius: '5px',
                    padding: '4px 2px',
                    fontSize: '0.67rem',
                    fontWeight: isActive ? '700' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.12s',
                    textAlign: 'center'
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Direct Stepper Controls for Width and Depth */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '2px' }}>
            {/* Width Grid Stepper */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                กว้าง: <strong style={{ color: '#38bdf8' }}>{currentGridCellsW} ช่อง</strong> ({(selectedObject.width || 4).toFixed(1)}m)
              </span>
              <div style={{ display: 'flex', gap: '3px' }}>
                <button
                  onClick={() => handleStepGrid('width', -1)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    borderRadius: '4px',
                    width: '22px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: '700'
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => handleStepGrid('width', 1)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38bdf8',
                    borderRadius: '4px',
                    width: '22px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: '700'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Depth Grid Stepper */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                ยาว: <strong style={{ color: '#facc15' }}>{currentGridCellsD} ช่อง</strong> ({(selectedObject.depth || 2).toFixed(1)}m)
              </span>
              <div style={{ display: 'flex', gap: '3px' }}>
                <button
                  onClick={() => handleStepGrid('depth', -1)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    borderRadius: '4px',
                    width: '22px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: '700'
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => handleStepGrid('depth', 1)}
                  style={{
                    background: 'rgba(250, 204, 21, 0.15)',
                    border: '1px solid rgba(250, 204, 21, 0.35)',
                    color: '#facc15',
                    borderRadius: '4px',
                    width: '22px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: '700'
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Height Slider */}
      {!isPin && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.65)' }}>
            <span>ความสูง:</span>
            <span style={{ fontWeight: '600', color: '#00e676', fontFamily: 'monospace' }}>{(selectedObject.height || 5.0).toFixed(1)}m</span>
          </div>
          <input
            type="range"
            min={isParcel ? "0.8" : isCharging ? "1.2" : "2.0"}
            max={isParcel ? "4.0" : isCharging ? "3.5" : "8.0"}
            step="0.5"
            value={selectedObject.height || 5.0}
            onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#00e676', cursor: 'pointer' }}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPinTargetForRobot(selectedObject);
          }}
          style={{
            flex: 1,
            background: selectedObject.isPinned ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            border: selectedObject.isPinned ? '1px solid #00e676' : '1px solid rgba(255, 255, 255, 0.12)',
            color: selectedObject.isPinned ? '#a7f3d0' : 'rgba(255, 255, 255, 0.85)',
            borderRadius: '6px',
            padding: '7px',
            fontSize: '0.74rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.15s'
          }}
        >
          <Icons.Pin />
          <span>{selectedObject.isPinned ? 'ปักแล้ว' : 'ปักหมุด'}</span>
        </button>

        {/* Delete Object / Pin Button */}
        <button
          onClick={handleDelete}
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#fca5a5',
            borderRadius: '6px',
            padding: '7px 12px',
            fontSize: '0.74rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.15s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
            e.currentTarget.style.color = '#fca5a5';
          }}
          title="ลบออกจากผัง"
        >
          <Icons.Trash />
          <span>ลบ</span>
        </button>
      </div>
    </div>
  );
}

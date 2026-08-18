import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../data/mockData';

export default function InventoryPanel({ onDispatchPick }) {
  const [inventoryList, setInventoryList] = useState(MOCK_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSKU, setSelectedSKU] = useState(MOCK_INVENTORY[0]);
  const [activeTab, setActiveTab] = useState('GRID'); // GRID | DIGITAL_TWIN
  const [isPicking, setIsPicking] = useState(false);

  const categories = ['ALL', 'Chemical Reagents', 'Pharmaceuticals', 'Lab Glassware', 'Industrial Raw', 'Bio-Tech', 'Safety Equipment'];

  const filteredItems = inventoryList.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.shelf.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDispatchRobot = (item) => {
    setIsPicking(true);
    setTimeout(() => {
      alert(`🤖 AMR DISPATCHED TO SHELF ${item.shelf}!\nTarget SKU: ${item.name}\nVision AI will record a 5-10s verified audit clip upon pick.`);
      setIsPicking(false);
      if (onDispatchPick) onDispatchPick(item);
    }, 500);
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
      {/* LEFT COLUMN: INVENTORY CATALOG & DIGITAL TWIN VIEW */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Search & Filter Header */}
        <div className="glass-panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="tech-corner-tl"></div>
          <div className="tech-corner-br"></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                REAL-TIME INVENTORY & DIGITAL TWIN
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Cloud WMS Sync • Auto-Audited by Eco-Vision AMR
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setActiveTab('GRID')}
                className={`btn-cyber ${activeTab === 'GRID' ? 'btn-cyber-primary' : ''}`}
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                📋 CATALOG LIST
              </button>
              <button
                onClick={() => setActiveTab('DIGITAL_TWIN')}
                className={`btn-cyber ${activeTab === 'DIGITAL_TWIN' ? 'btn-cyber-primary' : ''}`}
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                🌐 3D DIGITAL TWIN
              </button>
            </div>
          </div>

          {/* Search bar & Category pills */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Search by SKU, chemical name, or shelf code (e.g. A-01-L2)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(8, 14, 22, 0.9)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: selectedCategory === cat ? '1px solid var(--eco-green)' : '1px solid var(--border-subtle)',
                  color: selectedCategory === cat ? 'var(--eco-green)' : 'var(--text-muted)',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode 1: Catalog List */}
        {activeTab === 'GRID' ? (
          <div className="glass-panel" style={{ padding: '14px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredItems.map((item) => {
              const isSelected = selectedSKU?.id === item.id;
              const isLowStock = item.stock <= item.minStock;
              const isWarning = item.inspectionStatus === 'WARNING';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedSKU(item)}
                  style={{
                    background: isSelected ? 'rgba(0, 176, 255, 0.12)' : 'rgba(12, 19, 28, 0.65)',
                    border: isSelected ? '1px solid var(--tech-cyan)' : '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(0, 230, 118, 0.4)'; }}
                  onMouseOut={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      background: 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {item.category.includes('Chemical') ? '🧪' : item.category.includes('Pharmaceuticals') ? '💉' : item.category.includes('Glassware') ? '🔬' : '📦'}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#fff' }}>
                          {item.name}
                        </span>
                        <span className={`hud-badge ${item.frequencyGrade === 'A' ? 'hud-badge-green' : 'hud-badge-cyan'}`} style={{ fontSize: '0.62rem' }}>
                          GRADE {item.frequencyGrade} (FAST)
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        SKU: {item.id} • {item.zone} [{item.shelf}] • Expiry: {item.expiry}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      fontFamily: 'var(--font-mono)',
                      color: isLowStock ? 'var(--danger-red)' : 'var(--eco-green)'
                    }}>
                      {item.stock} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.unit.split(' ')[0]}</span>
                    </div>

                    <span className={`hud-badge ${isWarning ? 'hud-badge-amber' : 'hud-badge-green'}`} style={{ fontSize: '0.65rem' }}>
                      {isWarning ? '⚠️ INSPECT SEAL' : '✓ QC VERIFIED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* View Mode 2: 3D Digital Twin Warehouse Simulator */
          <div className="glass-panel" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--tech-cyan)' }}>
                3D SPATIAL DIGITAL TWIN (FACILITY MAP)
              </div>
              <span className="hud-badge hud-badge-green">
                AMR REAL-TIME SYNC: ACTIVE
              </span>
            </div>

            {/* Warehouse Map Grid Visualizer */}
            <div style={{
              flex: 1,
              minHeight: '320px',
              background: 'linear-gradient(135deg, #050a10, #0a1420)',
              borderRadius: '8px',
              border: '1px solid var(--border-cyan)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              overflow: 'hidden'
            }}>
              <div className="scanline-overlay"></div>

              {/* Bay A (Chemical & Rapid Pick) */}
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--eco-green)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  ZONE A: CHEMICAL REAGENTS & HIGH FREQUENCY (ABC GRADE A)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {['A-01-L1', 'A-01-L2', 'A-02-L1', 'A-02-L2'].map((shelf) => (
                    <div
                      key={shelf}
                      style={{
                        height: '50px',
                        background: 'rgba(0, 230, 118, 0.1)',
                        border: '1px solid var(--eco-green)',
                        borderRadius: '4px',
                        padding: '4px 6px',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>{shelf}</span>
                      <span style={{ color: 'var(--eco-green)', fontSize: '0.62rem' }}>92% FULL</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Corridor & Moving AMR */}
              <div style={{
                height: '60px',
                borderTop: '1px dashed rgba(0, 176, 255, 0.3)',
                borderBottom: '1px dashed rgba(0, 176, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                position: 'relative'
              }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  MAIN AISLE CORRIDOR (SPEED LIMIT: 1.0 m/s)
                </span>

                {/* Animated AMR 3D Node */}
                <div style={{
                  position: 'absolute',
                  left: '42%',
                  background: 'linear-gradient(135deg, #00b0ff, #00e676)',
                  color: '#000',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  boxShadow: '0 0 15px rgba(0, 230, 118, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>🤖</span>
                  <span>ECO-AMR-01 [0.85m/s]</span>
                </div>
              </div>

              {/* Bay B (Cold Storage & Labs) */}
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--tech-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  ZONE B: COLD VAULT & PHARMACEUTICAL BUFFER
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {['B-01-L1', 'B-01-L2', 'B-02-L1', 'B-03-L1'].map((shelf) => (
                    <div
                      key={shelf}
                      style={{
                        height: '50px',
                        background: 'rgba(0, 176, 255, 0.1)',
                        border: '1px solid var(--tech-cyan)',
                        borderRadius: '4px',
                        padding: '4px 6px',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>{shelf}</span>
                      <span style={{ color: 'var(--tech-cyan)', fontSize: '0.62rem' }}>4°C CHILLED</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: SELECTED SKU TELEMETRY & DISPATCH */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="tech-corner-tl"></div>
        <div className="tech-corner-br"></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>
            SKU INSPECTOR & AMR DISPATCH
          </h3>
          <span className="hud-badge hud-badge-cyan">
            {selectedSKU?.category}
          </span>
        </div>

        {selectedSKU ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(12, 19, 28, 0.8)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#fff' }}>
                {selectedSKU.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--tech-cyan)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ID: {selectedSKU.id} • HAZARD: {selectedSKU.hazardLevel}
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>CURRENT ON-HAND</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--eco-green)', fontWeight: 'bold' }}>
                  {selectedSKU.stock} {selectedSKU.unit.split(' ')[0]}
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 33, 0.6)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>SHELF LOCATION</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--tech-cyan)', fontWeight: 'bold' }}>
                  {selectedSKU.shelf}
                </div>
              </div>
            </div>

            {/* Vision AI Quality Telemetry */}
            <div style={{
              padding: '10px 12px',
              background: 'rgba(8, 14, 22, 0.7)',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.78rem'
            }}>
              <div style={{ fontWeight: 'bold', color: 'var(--tech-cyan)' }}>
                🔍 Vision AI Real-Time Quality Telemetry:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Liquid Volume / Fill:</span>
                <strong style={{ color: 'var(--eco-green)', fontFamily: 'var(--font-mono)' }}>{selectedSKU.fillLevel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Cap / Container Seal:</span>
                <strong style={{ color: selectedSKU.capSeal.includes('Stress') ? 'var(--danger-red)' : 'var(--eco-green)' }}>
                  {selectedSKU.capSeal}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Last Video-Audited:</span>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{selectedSKU.lastAudited}</span>
              </div>
            </div>

            {/* Dispatch Action Button */}
            <div style={{ marginTop: '12px' }}>
              <button
                disabled={isPicking}
                onClick={() => handleDispatchRobot(selectedSKU)}
                className="btn-cyber btn-cyber-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem' }}
              >
                {isPicking ? '⏳ AMR EN ROUTE...' : `🚀 DISPATCH AMR TO PICK (${selectedSKU.shelf})`}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

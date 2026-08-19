import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../data/mockData';

const Icons = {
  Box: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Flask: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31L4.62 17.6A2 2 0 0 0 6.3 20.6h11.4a2 2 0 0 0 1.68-3L14 9.31V2"></path>
      <line x1="8.5" y1="2" x2="15.5" y2="2"></line>
    </svg>
  ),
  Bot: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Play: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
    </svg>
  )
};

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
      alert(`AMR DISPATCHED TO SHELF ${item.shelf}!\nTarget SKU: ${item.name}\nVision AI will record a verified audit clip.`);
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
                CATALOG LIST
              </button>
              <button
                onClick={() => setActiveTab('DIGITAL_TWIN')}
                className={`btn-cyber ${activeTab === 'DIGITAL_TWIN' ? 'btn-cyber-primary' : ''}`}
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                3D DIGITAL TWIN
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
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: 'rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.category.includes('Chemical') || item.category.includes('Glassware') ? '#38bdf8' : '#34d399'
                    }}>
                      {item.category.includes('Chemical') || item.category.includes('Glassware') ? <Icons.Flask /> : <Icons.Box />}
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
                      {isWarning ? 'INSPECT SEAL' : '✓ QC VERIFIED'}
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Icons.Bot />
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
              <div style={{ fontWeight: 'bold', color: 'var(--tech-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.Search />
                <span>Vision AI Quality Telemetry:</span>
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
                style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Icons.Play />
                <span>{isPicking ? 'AMR EN ROUTE...' : `DISPATCH AMR TO PICK (${selectedSKU.shelf})`}</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

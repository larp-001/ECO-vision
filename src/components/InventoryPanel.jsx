import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../data/mockData.js';
import TopSellingRanking from './TopSellingRanking.jsx';
import InOutSummaryModal from './InOutSummaryModal.jsx';

const Icons = {
  Box: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Drink: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l1 5v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7z"></path>
      <path d="M9 2v5h6V2"></path>
    </svg>
  ),
  Milk: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="3" width="10" height="18" rx="2"></rect>
      <path d="M10 8h4M10 12h4M10 16h2"></path>
    </svg>
  ),
  Bot: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

function categoryIcon(category) {
  if (category === 'เครื่องดื่ม') return <Icons.Drink />;
  if (category === 'นมและของหวาน') return <Icons.Milk />;
  return <Icons.Box />;
}

export default function InventoryPanel({ onDispatchPick }) {
  const [inventoryList] = useState(MOCK_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSKU, setSelectedSKU] = useState(MOCK_INVENTORY[0]);
  const [activeTab, setActiveTab] = useState('GRID'); // GRID | DIGITAL_TWIN
  const [isPicking, setIsPicking] = useState(false);
  const [showInOutSummary, setShowInOutSummary] = useState(false);

  const categories = ['ALL', 'เครื่องดื่ม', 'นมและของหวาน', 'ขนมขบเคี้ยว', 'อาหารสำเร็จรูป', 'ลูกอม & หมากฝรั่ง', 'ของใช้ในบ้าน'];

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
      alert(`สั่งหุ่นยนต์ไปที่ชั้น ${item.shelf} แล้ว!\nสินค้า: ${item.name}\nกล้อง Vision AI จะบันทึกวิดีโอยืนยันการหยิบ`);
      setIsPicking(false);
      if (onDispatchPick) onDispatchPick(item);
    }, 500);
  };

  return (
    <>
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
        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0 }}>
                คลังสินค้าและอันดับสินค้าขายดี
              </h2>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                ซิงก์กับระบบคลังกลาง • ตรวจนับอัตโนมัติโดยหุ่นยนต์ Eco-Vision
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setActiveTab('GRID')}
                className={`btn-cyber ${activeTab === 'GRID' ? 'btn-cyber-primary' : ''}`}
                style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              >
                รายการสินค้า
              </button>
              <button
                onClick={() => setActiveTab('DIGITAL_TWIN')}
                className={`btn-cyber ${activeTab === 'DIGITAL_TWIN' ? 'btn-cyber-primary' : ''}`}
                style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              >
                ผังคลัง 3 มิติ
              </button>
              <button
                onClick={() => setShowInOutSummary(true)}
                className="btn-cyber"
                style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              >
                สรุปเข้า-ออกทั้งหมด
              </button>
            </div>
          </div>

          {/* Search bar & Category pills */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <input
              type="text"
              placeholder="ค้นหาสินค้า รหัส SKU หรือตำแหน่งชั้นวาง..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: '#fbfbfc',
                border: '1px solid var(--border-subtle)',
                borderRadius: '9px',
                padding: '9px 13px',
                color: 'var(--text-main)',
                fontFamily: 'inherit',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingTop: '10px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--eco-green)' : '#fff',
                  border: selectedCategory === cat ? 'none' : '1px solid var(--border-subtle)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                  borderRadius: '999px',
                  padding: '6px 13px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                }}
              >
                {cat === 'ALL' ? 'ทั้งหมด' : cat}
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
                    background: isSelected ? 'var(--tech-cyan-soft)' : '#fafbfb',
                    border: isSelected ? '1px solid var(--tech-cyan)' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '11px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'border-color 0.15s'
                  }}
                  onMouseOver={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#c9cdd3'; }}
                  onMouseOut={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: '#eef0f2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-muted)',
                      flexShrink: 0,
                    }}>
                      {categoryIcon(item.category)}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                          {item.name}
                        </span>
                        <span className={`hud-badge ${item.frequencyGrade === 'A' ? 'hud-badge-green' : 'hud-badge-cyan'}`} style={{ fontSize: '0.6rem' }}>
                          ขายดีเกรด {item.frequencyGrade}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {item.id} • {item.zone} [{item.shelf}]
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{
                      fontSize: '1.05rem',
                      fontWeight: 'bold',
                      color: isLowStock ? 'var(--danger-red)' : 'var(--text-main)'
                    }}>
                      {item.stock} <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 400 }}>{item.unit.split(' ')[0]}</span>
                    </div>

                    <span className={`hud-badge ${isWarning ? 'hud-badge-amber' : 'hud-badge-green'}`} style={{ fontSize: '0.64rem' }}>
                      {isWarning ? 'ควรตรวจสอบ' : '✓ ผ่าน QC'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* View Mode 2: Flat digital-twin warehouse layout */
          <div className="glass-panel" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: '700' }}>
                ผังคลังสินค้าแบบ 3 มิติ (ย่อ)
              </div>
              <span className="hud-badge hud-badge-green">
                ซิงก์ตำแหน่งหุ่นยนต์แบบเรียลไทม์
              </span>
            </div>

            {/* Warehouse Map Grid Visualizer */}
            <div style={{
              flex: 1,
              minHeight: '320px',
              background: 'linear-gradient(180deg, #eef1f0, #e7ebe8)',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              overflow: 'hidden'
            }}>
              {/* Zone A: fast-moving items */}
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--eco-green-dark)', fontWeight: 600, marginBottom: '6px' }}>
                  โซน A: เครื่องดื่มและสินค้าขายเร็ว
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {['A-01-L1', 'A-01-L2', 'A-02-L1', 'A-02-L2'].map((shelf) => (
                    <div
                      key={shelf}
                      style={{
                        height: '50px',
                        background: '#fff',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '5px 7px',
                        fontSize: '0.7rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{shelf}</span>
                      <span style={{ color: 'var(--eco-green-dark)', fontSize: '0.62rem' }}>เต็ม 92%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Corridor & Moving AMR */}
              <div style={{
                height: '60px',
                borderTop: '1px dashed #c9cdd3',
                borderBottom: '1px dashed #c9cdd3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                position: 'relative'
              }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                  ทางเดินหลัก (จำกัดความเร็ว 1.0 m/s)
                </span>

                {/* Animated AMR node */}
                <div style={{
                  position: 'absolute',
                  left: '42%',
                  background: 'var(--eco-green)',
                  color: '#fff',
                  padding: '5px 11px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Icons.Bot />
                  <span>ECO-AMR-01 [0.85m/s]</span>
                </div>
              </div>

              {/* Zone B: dairy / cold storage */}
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--tech-cyan)', fontWeight: 600, marginBottom: '6px' }}>
                  โซน B: ตู้เย็นสินค้า (นมและของสด)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {['B-01-L1', 'B-01-L2', 'B-02-L1', 'B-03-L1'].map((shelf) => (
                    <div
                      key={shelf}
                      style={{
                        height: '50px',
                        background: '#fff',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '5px 7px',
                        fontSize: '0.7rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{shelf}</span>
                      <span style={{ color: 'var(--tech-cyan)', fontSize: '0.62rem' }}>แช่เย็น 4°C</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: RANKING + SELECTED SKU TELEMETRY & DISPATCH */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <TopSellingRanking />
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '0.98rem', fontWeight: '700', margin: 0 }}>
            รายละเอียดสินค้า & สั่งหุ่นยนต์หยิบ
          </h3>
          <span className="hud-badge hud-badge-cyan">
            {selectedSKU?.category}
          </span>
        </div>

        {selectedSKU ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#fafbfb', padding: '12px', borderRadius: '9px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                {selectedSKU.name}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {selectedSKU.id} • {selectedSKU.hazardLevel}
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '9px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>คงเหลือปัจจุบัน</div>
                <div style={{ fontSize: '1.15rem', color: 'var(--eco-green-dark)', fontWeight: 'bold', marginTop: '2px' }}>
                  {selectedSKU.stock} {selectedSKU.unit.split(' ')[0]}
                </div>
              </div>

              <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '9px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>ตำแหน่งชั้นวาง</div>
                <div style={{ fontSize: '1rem', color: 'var(--tech-cyan)', fontWeight: 'bold', marginTop: '2px' }}>
                  {selectedSKU.shelf}
                </div>
              </div>
            </div>

            {/* Vision AI Quality Telemetry */}
            <div style={{
              padding: '11px 13px',
              background: '#fafbfb',
              borderRadius: '9px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: '600', color: 'var(--tech-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.Search />
                <span>ตรวจสอบคุณภาพด้วย Vision AI</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>ระดับสินค้าในบรรจุภัณฑ์:</span>
                <strong style={{ color: 'var(--eco-green-dark)' }}>{selectedSKU.fillLevel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>สภาพบรรจุภัณฑ์:</span>
                <strong style={{ color: selectedSKU.capSeal.includes('ยุบ') || selectedSKU.capSeal.includes('เสีย') ? 'var(--danger-red)' : 'var(--eco-green-dark)' }}>
                  {selectedSKU.capSeal}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>ตรวจสอบล่าสุด:</span>
                <span style={{ color: 'var(--text-dim)' }}>{selectedSKU.lastAudited}</span>
              </div>
            </div>

            {/* Dispatch Action Button */}
            <button
              disabled={isPicking}
              onClick={() => handleDispatchRobot(selectedSKU)}
              className="btn-cyber btn-cyber-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}
            >
              <Icons.Play />
              <span>{isPicking ? 'กำลังส่งหุ่นยนต์ไป...' : `จ่ายหุ่นยนต์ไปหยิบ (${selectedSKU.shelf})`}</span>
            </button>
          </div>
        ) : null}
      </div>
      </div>
    </div>

    {showInOutSummary && <InOutSummaryModal onClose={() => setShowInOutSummary(false)} />}
    </>
  );
}

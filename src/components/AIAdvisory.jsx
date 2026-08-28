import React, { useState } from 'react';
import { MOCK_AI_PROPOSALS } from '../data/mockData.js';

const STATUS_LABEL = {
  PENDING_APPROVAL: 'รออนุมัติ',
  APPROVED: 'อนุมัติแล้ว',
  EXECUTED: 'ดำเนินการแล้ว',
  REJECTED: 'ปฏิเสธ',
};

const EXTRA_SLOT_SETS = [
  [
    { sku: 'SKU-DAIRY-204 (นมยูเอชทีรสจืด)', from: 'ชั้น B-03-L1 (ลึก)', to: 'ชั้น A-01-L1 (หน้าสุด ระดับอก)', reason: 'ความถี่ในการหยิบล่าสุดพุ่งสูงขึ้น +340% ใน 7 วัน', priority: 'CRITICAL' },
    { sku: 'SKU-BEV-101 (น้ำดื่มบรรจุขวด 600ml)', from: 'ชั้น A-04-L3 (สูง)', to: 'ชั้น A-02-L2 (ระดับกลาง หยิบง่าย)', reason: 'ลังหนัก ย้ายลงมาระดับต่ำช่วยลดแรงบิดแขนกลหุ่นยนต์ 42%', priority: 'HIGH' },
    { sku: 'SKU-NOODLE-305 (บะหมี่กึ่งสำเร็จรูป)', from: 'ชั้น B-04-L2 (หลัง)', to: 'ชั้น A-03-L1 (ทางวิ่งหลัก)', reason: 'สินค้า Fast-Moving ย้ายมาใกล้จุด Inbound ประหยัดเวลา 18 นาที/กะ', priority: 'HIGH' },
    { sku: 'SKU-SNACK-881 (ขนมขบเคี้ยวอบกรอบ)', from: 'ชั้น A-06-L2 (ลึก)', to: 'ชั้น A-04-L1 (ช่องจ่ายด่วน)', reason: 'ยอดสั่งช่วงโปรโมชันเพิ่มขึ้น จัดไว้แนวถนนหลักเพื่อให้ AMR เข้าถึงไว', priority: 'MEDIUM' },
  ],
  [
    { sku: 'SKU-BEV-101 (น้ำดื่มบรรจุขวด 600ml)', from: 'ชั้น A-04-L3 (สูง)', to: 'ชั้น A-01-L1 (หน้าสุด)', reason: 'ความถี่จ่ายออกสูงสุดอันดับ 1 จัดวางใกล้ปากทางวิ่ง', priority: 'CRITICAL' },
    { sku: 'SKU-CAN-502 (ปลากระป๋องปรุงรส)', from: 'ชั้น B-02-L3 (สูง)', to: 'ชั้น A-02-L1 (ระดับพื้น)', reason: 'น้ำหนักกล่องมาก ย้ายลงชั้นล่างเพื่อความปลอดภัยในการยก', priority: 'HIGH' },
    { sku: 'SKU-DAIRY-204 (นมยูเอชทีรสจืด)', from: 'ชั้น B-03-L1 (ลึก)', to: 'ชั้น A-03-L2 (ระดับอก)', reason: 'จัดกลุ่มสินค้าบริโภคเข้าด้วยกัน ลดรอบวิ่งสลับโซนของ AMR', priority: 'HIGH' },
    { sku: 'SKU-CANDY-109 (ลูกอมรสมินต์)', from: 'ชั้น B-01-L1 (หน้า)', to: 'ชั้น B-04-L3 (โซนเก็บสำรอง)', reason: 'ความถี่การหยิบลดลง ย้ายไปโซนหลังเพื่อคืนพื้นที่ทองคำด้านหน้า', priority: 'MEDIUM' },
  ]
];

export default function AIAdvisory() {
  const [proposals, setProposals] = useState(MOCK_AI_PROPOSALS);
  const [activeProposal, setActiveProposal] = useState(MOCK_AI_PROPOSALS[0]);
  const [isSimulatingExecution, setIsSimulatingExecution] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [slottingCycle, setSlottingCycle] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const handleApprove = (proposalId) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: 'APPROVED' } : p))
    );
    setActiveProposal((prev) => ({ ...prev, status: 'APPROVED' }));
    alert('อนุมัติแผนแล้ว!\nหัวหน้างานอนุมัติการจัดวางสินค้าใหม่ หุ่นยนต์จะดำเนินการในช่วงเวลาที่กำหนด');
  };

  const handleExecuteNow = () => {
    setIsSimulatingExecution(true);
    setTimeout(() => {
      setProposals((prev) =>
        prev.map((p) => (p.id === activeProposal.id ? { ...p, status: 'EXECUTED' } : p))
      );
      setActiveProposal((prev) => ({ ...prev, status: 'EXECUTED' }));
      setIsSimulatingExecution(false);
      alert('จัดวางสินค้าใหม่เรียบร้อยแล้ว!\nย้ายสินค้าขายเร็วมาไว้โซน A ด้านหน้าแล้ว พร้อมวิดีโอยืนยันการย้ายทุกจุด');
    }, 2000);
  };

  // AI Auto-Slotting Button Handler with Top-to-Bottom Smooth Cascading Animation
  const handleAutoSlotting = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const nextCycle = (slottingCycle + 1) % EXTRA_SLOT_SETS.length;
      setSlottingCycle(nextCycle);
      const newItems = EXTRA_SLOT_SETS[nextCycle];

      setActiveProposal((prev) => ({
        ...prev,
        title: `แผนจัดวางสินค้า AI กะดึก (ปรับปรุงล่าสุด #${nextCycle + 9})`,
        summary: `AI วิเคราะห์ประวัติการหยิบสินค้า 1,580 ครั้งล่าสุด และจัดเรียงสินค้า Fast-Moving ${newItems.length} รายการลงตำแหน่งที่มีระยะทางสั้นที่สุด`,
        distanceReducedDaily: `${(4.8 + (nextCycle + 1) * 0.9).toFixed(1)} กม.`,
        timeSavingsDaily: `${nextCycle === 0 ? '1 ชม. 55 นาที' : '2 ชม. 10 นาที'}`,
        energySavedPerCycle: `${(38.2 + (nextCycle + 1) * 4.5).toFixed(1)}%`,
        itemsToRelocate: newItems,
        status: 'PENDING_APPROVAL',
      }));

      setAnimKey((prev) => prev + 1);
      setIsOptimizing(false);
    }, 500);
  };

  return (
    <div className="dashboard-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '16px',
      padding: '16px',
      height: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      {/* CSS Animation Keyframes for Top-to-Bottom Smooth Slide */}
      <style>{`
        @keyframes slideDownCascade {
          from {
            opacity: 0;
            transform: translateY(-24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* LEFT COLUMN: ACTIVE AI OPTIMIZATION PROPOSAL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Header with AI Slotting Action Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="status-pulse green"></span>
              <div>
                <h2 style={{ fontSize: '1.02rem', fontWeight: '700', margin: 0 }}>
                  ผู้ช่วย AI จัดวางคลังสินค้า
                </h2>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  ต้องได้รับอนุมัติจากคนก่อนทุกครั้ง
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* PRIMARY AI AUTO-SLOTTING BUTTON */}
              <button
                onClick={handleAutoSlotting}
                disabled={isOptimizing}
                title="กดเพื่อให้ AI ประมวลผลและจัดผังคลังใหม่ทันที"
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: isOptimizing ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 3px 12px rgba(22, 163, 74, 0.35)',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span>⚡</span>
                <span>{isOptimizing ? 'AI กำลังจัดคลัง...' : 'ให้ AI จัดคลังให้'}</span>
              </button>

              <span className={`hud-badge ${activeProposal.status === 'APPROVED' ? 'hud-badge-green' : activeProposal.status === 'EXECUTED' ? 'hud-badge-cyan' : 'hud-badge-amber'}`}>
                {STATUS_LABEL[activeProposal.status] || activeProposal.status}
              </span>
            </div>
          </div>

          {/* Proposal Summary Box */}
          <div style={{
            background: 'var(--tech-cyan-soft)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
              {activeProposal.title}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              {activeProposal.summary}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--tech-cyan)' }}>
              สร้างเมื่อ: {activeProposal.generatedAt} • ช่วงเวลาที่แนะนำ: {activeProposal.recommendedWindow}
            </div>
          </div>

          {/* Quantifiable Impact Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ background: 'var(--eco-green-soft)', padding: '11px', borderRadius: '9px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--eco-green-dark)', fontWeight: 600 }}>ระยะทางที่ลดลง/วัน</div>
              <div style={{ fontSize: '1.25rem', color: 'var(--eco-green-dark)', fontWeight: 'bold', marginTop: '2px' }}>
                -{activeProposal.distanceReducedDaily}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>ลดความล้าของหุ่นยนต์ 34.6%</div>
            </div>

            <div style={{ background: 'var(--tech-cyan-soft)', padding: '11px', borderRadius: '9px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--tech-cyan)', fontWeight: 600 }}>เวลาที่ประหยัดได้/วัน</div>
              <div style={{ fontSize: '1.25rem', color: 'var(--tech-cyan)', fontWeight: 'bold', marginTop: '2px' }}>
                {activeProposal.timeSavingsDaily}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>คิวหยิบสินค้าไวขึ้น</div>
            </div>

            <div style={{ background: 'var(--warning-amber-soft)', padding: '11px', borderRadius: '9px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--warning-amber)', fontWeight: 600 }}>พลังงานที่ประหยัด/รอบ</div>
              <div style={{ fontSize: '1.25rem', color: 'var(--warning-amber)', fontWeight: 'bold', marginTop: '2px' }}>
                +{activeProposal.energySavedPerCycle}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>ยืดเวลาทำงานของแบตเตอรี่</div>
            </div>
          </div>

          {/* Relocation Item Plan with Smooth Top-to-Bottom Staggered Animation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                แผนย้ายสินค้า ({activeProposal.itemsToRelocate.length} รายการสำคัญ)
              </span>
              <span style={{ fontSize: '0.68rem', color: '#16a34a', fontWeight: '600' }}>
                ✓ จัดเรียงตามระดับความสำคัญ
              </span>
            </div>

            <div key={animKey} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeProposal.itemsToRelocate.map((item, index) => (
                <div
                  key={`${item.sku}-${index}-${animKey}`}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    animation: 'slideDownCascade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    animationDelay: `${index * 0.12}s`,
                    opacity: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        background: '#eff6ff',
                        color: '#2563eb',
                        borderRadius: '6px',
                        padding: '1px 6px',
                        fontSize: '0.68rem',
                        fontWeight: '700',
                        fontFamily: 'monospace'
                      }}>
                        #{index + 1}
                      </span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                        {item.sku}
                      </span>
                    </div>
                    <span className="hud-badge hud-badge-amber" style={{ fontSize: '0.62rem' }}>
                      {item.priority === 'CRITICAL' ? 'สำคัญมาก' : item.priority === 'HIGH' ? 'สำคัญ' : 'ปานกลาง'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--danger-red)', background: 'rgba(239,68,68,0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                      จาก: {item.from}
                    </span>
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>──►</span>
                    <span style={{ color: 'var(--eco-green-dark)', fontWeight: 'bold', background: 'rgba(22,163,74,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                      ไป: {item.to}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', background: '#f8fafc', padding: '4px 8px', borderRadius: '6px' }}>
                    💡 เหตุผลจาก AI: {item.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Approval Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            {activeProposal.status === 'PENDING_APPROVAL' ? (
              <>
                <button
                  onClick={() => handleApprove(activeProposal.id)}
                  className="btn-cyber btn-cyber-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: '11px' }}
                >
                  ✓ อนุมัติแผน (หัวหน้างานเซ็นรับทราบ)
                </button>
                <button
                  onClick={() => alert('ปฏิเสธแผนแล้ว ระบบ AI จะเรียนรู้เงื่อนไขที่หัวหน้างานต้องการ')}
                  className="btn-cyber btn-cyber-danger"
                  style={{ padding: '11px 18px' }}
                >
                  ✕ ปฏิเสธ
                </button>
              </>
            ) : activeProposal.status === 'APPROVED' ? (
              <button
                disabled={isSimulatingExecution}
                onClick={handleExecuteNow}
                className="btn-cyber btn-cyber-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '11px' }}
              >
                {isSimulatingExecution ? 'กำลังจำลองการย้ายสินค้า...' : 'จำลองการดำเนินการทันที'}
              </button>
            ) : (
              <div style={{
                width: '100%',
                padding: '11px',
                textAlign: 'center',
                background: 'var(--eco-green-soft)',
                borderRadius: '9px',
                color: 'var(--eco-green-dark)',
                fontWeight: 'bold',
                fontSize: '0.88rem'
              }}>
                ✓ ดำเนินการสำเร็จ — อัปเดตตำแหน่งในระบบคลังแล้วทุกรายการ
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: SAFETY GUARANTEES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '0.96rem', fontWeight: '700', margin: 0 }}>
            มาตรการความปลอดภัย (คนตัดสินใจสุดท้ายเสมอ)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeProposal.safetyGuarantees.map((guarantee, idx) => (
              <div
                key={idx}
                style={{
                  padding: '11px 12px',
                  background: 'var(--tech-cyan-soft)',
                  borderRadius: '9px',
                  fontSize: '0.82rem',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--tech-cyan)', flexShrink: 0 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>{guarantee}</span>
              </div>
            ))}
          </div>

          {/* Industry Rationale Box */}
          <div style={{
            background: '#fafbfb',
            border: '1px dashed var(--border-subtle)',
            borderRadius: '9px',
            padding: '13px',
            fontSize: '0.8rem',
            lineHeight: '1.5',
            color: 'var(--text-muted)'
          }}>
            <strong style={{ color: 'var(--text-main)' }}>ทำไมต้องให้คนอนุมัติก่อน:</strong>
            <p style={{ marginTop: '4px', margin: '4px 0 0' }}>
              ต่างจากหุ่นยนต์ทั่วไปที่ย้ายของเองโดยไม่แจ้งใคร Eco-Vision ให้หัวหน้างานเห็นแผนก่อน-หลังทุกครั้ง ตรวจสอบย้อนหลังได้ และมีคนควบคุมการตัดสินใจเสมอ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { MOCK_EOD_REPORT } from '../data/mockData.js';

export default function NightSleepMode({ robotStatus, activeMode, setPowerMode }) {
  const [eodReport] = useState(MOCK_EOD_REPORT);
  const [isIntruderSimulated, setIsIntruderSimulated] = useState(false);
  const [securityStatus, setSecurityStatus] = useState('เฝ้าระวังรอบพื้นที่');
  const [toast, setToast] = useState(null);

  const showToast = (message, level = 'info', duration = 4500) => {
    setToast({ message, level });
    setTimeout(() => setToast(null), duration);
  };

  const handleSimulateIntruder = () => {
    setIsIntruderSimulated(true);
    setSecurityStatus('พบผู้บุกรุก');
    setTimeout(() => {
      showToast('แจ้งเตือนความปลอดภัยตอนกลางคืน! เรดาร์ mmWave ตรวจพบคนเคลื่อนไหวในโซน B ระหว่างโหมดพักหลับ กล้องเปิดทันทีและส่งแจ้งเตือนไปยังเจ้าของแล้ว', 'danger');
    }, 400);
  };

  const handleResetAlarm = () => {
    setIsIntruderSimulated(false);
    setSecurityStatus('เฝ้าระวังรอบพื้นที่');
  };

  const isSleep = activeMode === 'DEEP_SLEEP';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '16px',
      padding: '16px',
      height: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      {/* LEFT COLUMN: POWER STATE MACHINE & NIGHT SECURITY RADAR */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="glass-panel" style={{
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="status-pulse green"></span>
              <div>
                <h2 style={{ fontSize: '1.02rem', fontWeight: '700', margin: 0 }}>
                  โหมดพักหลับ & เฝ้าระวังกลางคืน
                </h2>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  ปรับใช้พลังงานอัตโนมัติ • เฝ้าระวังพื้นที่แบบประหยัดไฟ
                </span>
              </div>
            </div>

            <button
              onClick={() => setPowerMode(isSleep ? 'ACTIVE' : 'DEEP_SLEEP')}
              className={`btn-cyber ${isSleep ? 'btn-cyber-primary' : ''}`}
              style={{ fontSize: '0.78rem', padding: '7px 14px' }}
            >
              {isSleep ? 'ปลุกให้ทำงานปกติ' : 'เข้าสู่โหมดพักหลับ'}
            </button>
          </div>

          {/* Power Saving Highlight Banner */}
          <div style={{
            background: isSleep ? '#f3e8fd' : 'var(--eco-green-soft)',
            borderRadius: '10px',
            padding: '13px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: isSleep ? '#7c3aed' : 'var(--eco-green-dark)' }}>
                {isSleep ? 'กำลังพักหลับ (ประหยัดพลังงาน 85-90%)' : 'ทำงานปกติ'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {isSleep
                  ? 'มอเตอร์ กล้อง 4K และไฟ LED ปิดหมด เหลือแค่เรดาร์ mmWave ทำงาน'
                  : 'ระบบ Vision AI และเรดาร์ 360° เปิดทำงานเต็มรูปแบบ'}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>พลังงานที่ใช้</div>
              <div style={{ fontSize: '1.3rem', color: isSleep ? '#7c3aed' : 'var(--tech-cyan)', fontWeight: 'bold' }}>
                {isSleep ? '12.4 W' : '142.0 W'}
              </div>
            </div>
          </div>

          {/* 4-State Dynamic Power Scaling Architecture */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.84rem', fontWeight: '700' }}>
              โหมดพลังงาน 4 ระดับ
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { name: '1. ทำงาน', key: 'ACTIVE', draw: '140-180W', desc: 'กล้อง + แขนกล + เรดาร์เต็มรูปแบบ', current: activeMode === 'ACTIVE', color: 'var(--eco-green-dark)' },
                { name: '2. ตรวจตรา', key: 'PATROL', draw: '45-65W', desc: 'ภาพความละเอียดต่ำ + เรดาร์', current: activeMode === 'PATROL', color: 'var(--tech-cyan)' },
                { name: '3. สแตนด์บาย', key: 'STANDBY', draw: '20-30W', desc: 'จอดที่จุดพัก', current: activeMode === 'STANDBY', color: 'var(--warning-amber)' },
                { name: '4. พักหลับ', key: 'DEEP_SLEEP', draw: '8-15W', desc: 'เฉพาะเรดาร์ + สรุปประจำวัน', current: isSleep, color: '#7c3aed' },
              ].map((state) => (
                <div
                  key={state.name}
                  onClick={() => setPowerMode(state.key)}
                  style={{
                    background: state.current ? '#fafbfb' : '#fff',
                    border: state.current ? `2px solid ${state.color}` : '1px solid var(--border-subtle)',
                    borderRadius: '9px',
                    padding: '10px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '92px'
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '0.75rem', color: state.color }}>
                    {state.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                    {state.draw}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)', lineHeight: '1.25' }}>
                    {state.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Night Security Radar Live Guarding HUD */}
          <div style={{
            background: isIntruderSimulated ? 'var(--danger-red-soft)' : '#fafbfb',
            border: isIntruderSimulated ? '1px solid #fecaca' : '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`status-pulse ${isIntruderSimulated ? 'red' : 'green'}`}></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.88rem', color: isIntruderSimulated ? 'var(--danger-red)' : 'var(--text-main)' }}>
                  {isIntruderSimulated ? 'พบผู้บุกรุก / มีการเคลื่อนไหวตอนกลางคืน!' : 'เรดาร์เฝ้าระวังกลางคืน (พื้นที่ปลอดภัย)'}
                </span>
              </div>

              <span className={`hud-badge ${isIntruderSimulated ? 'hud-badge-red' : 'hud-badge-green'}`}>
                {securityStatus}
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {isIntruderSimulated
                ? 'เรดาร์ mmWave ตรวจพบสัญญาณสะท้อนร่างกายคนที่โซน B กำลังเปิดไฟแฟลช 1 วินาที และบันทึกวิดีโอ 10 วินาที'
                : 'หุ่นยนต์จอดอยู่ที่จุดชาร์จ กำลังสแกน 360° หาบุคคลแปลกปลอม สินค้าตกพื้น หรืออุณหภูมิผิดปกติ'}
            </div>

            <div>
              {!isIntruderSimulated ? (
                <button
                  onClick={handleSimulateIntruder}
                  className="btn-cyber btn-cyber-danger"
                  style={{ fontSize: '0.78rem', padding: '7px 14px' }}
                >
                  จำลองการตรวจพบผู้บุกรุก
                </button>
              ) : (
                <button
                  onClick={handleResetAlarm}
                  className="btn-cyber btn-cyber-primary"
                  style={{ fontSize: '0.78rem', padding: '7px 14px' }}
                >
                  รับทราบ & รีเซ็ตการเฝ้าระวัง
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: END-OF-DAY (EOD) AUTOMATED REPORT */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: '700', margin: 0 }}>
              สรุปผลประจำวัน
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              สรุปอัตโนมัติโดย AI ระหว่างโหมดพักหลับ
            </span>
          </div>

          <span className="hud-badge hud-badge-green">
            {eodReport.date}
          </span>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '9px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>หยิบสินค้าสำเร็จ</div>
            <div style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 'bold', marginTop: '2px' }}>
              {eodReport.picksCompleted} ครั้ง
            </div>
          </div>

          <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '9px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>ความแม่นยำ</div>
            <div style={{ fontSize: '1.15rem', color: 'var(--eco-green-dark)', fontWeight: 'bold', marginTop: '2px' }}>
              {eodReport.inspectionAccuracy}
            </div>
          </div>

          <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '9px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>ป้องกันอุบัติเหตุจุดอับ</div>
            <div style={{ fontSize: '1.15rem', color: 'var(--tech-cyan)', fontWeight: 'bold', marginTop: '2px' }}>
              {eodReport.nearMissesPreventedNLOS} ครั้ง
            </div>
          </div>

          <div style={{ background: '#fafbfb', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '9px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>สินค้ามีตำหนิถูกกักไว้</div>
            <div style={{ fontSize: '1.15rem', color: 'var(--warning-amber)', fontWeight: 'bold', marginTop: '2px' }}>
              {eodReport.packagingDefectsQuarantined} รายการ
            </div>
          </div>
        </div>

        {/* ESG Green Energy Harvest Summary */}
        <div style={{
          padding: '13px',
          background: 'var(--eco-green-soft)',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          fontSize: '0.8rem'
        }}>
          <div style={{ fontWeight: 'bold', color: 'var(--eco-green-dark)' }}>
            พลังงานสะอาดที่เก็บเกี่ยวได้
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span>พลังงานแสงอาทิตย์:</span>
            <strong style={{ color: 'var(--text-main)' }}>{eodReport.energyHarvestedSolar}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span>พลังงานคืนจากการเบรก:</span>
            <strong style={{ color: 'var(--text-main)' }}>{eodReport.energyRecoveredBraking}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span>ประหยัดพลังงานรวมทั้งโรงงาน:</span>
            <strong style={{ color: 'var(--eco-green-dark)' }}>{eodReport.totalEnergySavedPercent}</strong>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => showToast('ส่งออกรายงานสรุปประจำวัน (PDF / Excel) แล้ว', 'success', 3000)}
          className="btn-cyber btn-cyber-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '11px', marginTop: 'auto' }}
        >
          ส่งออกรายงานสรุปประจำวัน
        </button>
      </div>

      {/* Floating in-app toast notification (replaces native browser alert()) */}
      {toast && (
        <div
          onClick={() => setToast(null)}
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3000,
            maxWidth: '520px',
            width: 'calc(100% - 40px)',
            background: '#ffffff',
            border: `1px solid ${toast.level === 'danger' ? '#fecaca' : toast.level === 'success' ? '#bbf7d0' : '#e6e8eb'}`,
            borderLeft: `4px solid ${toast.level === 'danger' ? 'var(--danger-red)' : toast.level === 'success' ? 'var(--eco-green)' : 'var(--tech-cyan)'}`,
            borderRadius: '10px',
            boxShadow: '0 12px 32px rgba(16,24,40,.14)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            cursor: 'pointer',
            animation: 'heroEntrance 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <span
            className={`status-pulse ${toast.level === 'danger' ? 'red' : toast.level === 'success' ? 'green' : 'cyan'}`}
            style={{ marginTop: '4px', flexShrink: 0 }}
          ></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '2px' }}>
              {toast.level === 'danger' ? 'แจ้งเตือนความปลอดภัย' : 'แจ้งเตือนระบบ'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {toast.message}
            </div>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', flexShrink: 0 }}>ปิด ×</span>
        </div>
      )}
    </div>
  );
}

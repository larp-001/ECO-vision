import React, { useState } from 'react';
import { MOCK_AI_PROPOSALS } from '../data/mockData';

export default function AIAdvisory() {
  const [proposals, setProposals] = useState(MOCK_AI_PROPOSALS);
  const [activeProposal, setActiveProposal] = useState(MOCK_AI_PROPOSALS[0]);
  const [isSimulatingExecution, setIsSimulatingExecution] = useState(false);

  const handleApprove = (proposalId) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: 'APPROVED' } : p))
    );
    setActiveProposal((prev) => ({ ...prev, status: 'APPROVED' }));
    alert(`✅ PROPOSAL ${proposalId} APPROVED!\nHuman Supervisor authorized slotting optimization. Robot will execute during Off-Peak window (01:30 - 03:00 AM) with video-backed audit on every move.`);
  };

  const handleExecuteNow = () => {
    setIsSimulatingExecution(true);
    setTimeout(() => {
      setProposals((prev) =>
        prev.map((p) => (p.id === activeProposal.id ? { ...p, status: 'EXECUTED' } : p))
      );
      setActiveProposal((prev) => ({ ...prev, status: 'EXECUTED' }));
      setIsSimulatingExecution(false);
      alert(`🎉 SLOTTING OPTIMIZATION COMPLETED!\n6 Fast-Moving SKUs relocated to Front Bay A. Video logs generated and WMS shelf coordinates updated.`);
    }, 2000);
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
      {/* LEFT COLUMN: ACTIVE AI OPTIMIZATION PROPOSAL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="tech-corner-tl"></div>
          <div className="tech-corner-br"></div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="status-pulse green"></span>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                  AI INVENTORY ADVISORY & SLOTTING PROPOSAL
                </h2>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Human-in-the-Loop • One-Click Manager Approval Required
                </span>
              </div>
            </div>

            <span className={`hud-badge ${activeProposal.status === 'APPROVED' ? 'hud-badge-green' : activeProposal.status === 'EXECUTED' ? 'hud-badge-cyan' : 'hud-badge-amber'}`}>
              {activeProposal.status === 'PENDING_APPROVAL' ? '⏳ WAITING MANAGER APPROVAL' : activeProposal.status}
            </span>
          </div>

          {/* Proposal Summary Box */}
          <div style={{
            background: 'rgba(10, 18, 28, 0.85)',
            border: '1px solid var(--border-cyan)',
            borderRadius: '8px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>
              {activeProposal.title}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              {activeProposal.summary}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--tech-cyan)', fontFamily: 'var(--font-mono)' }}>
              Generated: {activeProposal.generatedAt} • Scheduled Window: {activeProposal.recommendedWindow}
            </div>
          </div>

          {/* Quantifiable Impact Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.3)', padding: '10px', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>DAILY TRAVEL REDUCED</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: 'var(--eco-green)', fontWeight: 'bold' }}>
                -{activeProposal.distanceReducedDaily}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>-34.6% travel fatigue</div>
            </div>

            <div style={{ background: 'rgba(0, 176, 255, 0.08)', border: '1px solid rgba(0, 176, 255, 0.3)', padding: '10px', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>TIME SAVINGS DAILY</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: 'var(--tech-cyan)', fontWeight: 'bold' }}>
                {activeProposal.timeSavingsDaily}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Faster dispatch queues</div>
            </div>

            <div style={{ background: 'rgba(255, 145, 0, 0.08)', border: '1px solid rgba(255, 145, 0, 0.3)', padding: '10px', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ENERGY SAVED / CYCLE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: 'var(--warning-amber)', fontWeight: 'bold' }}>
                +{activeProposal.energySavedPerCycle}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Extends AMR runtime</div>
            </div>
          </div>

          {/* Relocation Item Plan (Before vs After) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>
              RELOCATION FLIGHT PLAN ({activeProposal.itemsToRelocate.length} CRITICAL ITEMS)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeProposal.itemsToRelocate.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(12, 19, 28, 0.7)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.88rem', color: '#fff' }}>
                      {item.sku}
                    </span>
                    <span className="hud-badge hud-badge-amber" style={{ fontSize: '0.62rem' }}>
                      {item.priority}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--danger-red)' }}>[FROM: {item.from}]</span>
                    <span>──►</span>
                    <span style={{ color: 'var(--eco-green)', fontWeight: 'bold' }}>[TO: {item.to}]</span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    💡 AI Rationale: {item.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Approval Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            {activeProposal.status === 'PENDING_APPROVAL' ? (
              <>
                <button
                  onClick={() => handleApprove(activeProposal.id)}
                  className="btn-cyber btn-cyber-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
                >
                  ✓ 1-CLICK APPROVE PROPOSAL (MANAGER SIGN-OFF)
                </button>
                <button
                  onClick={() => alert('Proposal rejected. AI model updated with manager preference constraints.')}
                  className="btn-cyber btn-cyber-danger"
                  style={{ padding: '10px 16px' }}
                >
                  ✕ REJECT
                </button>
              </>
            ) : activeProposal.status === 'APPROVED' ? (
              <button
                disabled={isSimulatingExecution}
                onClick={handleExecuteNow}
                className="btn-cyber btn-cyber-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
              >
                {isSimulatingExecution ? '⏳ SIMULATING OFF-PEAK RELOCATION...' : '▶ SIMULATE IMMEDIATE EXECUTION'}
              </button>
            ) : (
              <div style={{
                width: '100%',
                padding: '10px',
                textAlign: 'center',
                background: 'rgba(0, 230, 118, 0.15)',
                border: '1px solid var(--eco-green)',
                borderRadius: '6px',
                color: 'var(--eco-green)',
                fontWeight: 'bold',
                fontSize: '0.88rem'
              }}>
                ✓ EXECUTED SUCCESSFULLY — ALL COORDINATES UPDATED IN WMS
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: INDUSTRIAL TRUST & SAFETY GUARANTEES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="tech-corner-tl"></div>
          <div className="tech-corner-br"></div>

          <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>
            HUMAN-IN-THE-LOOP SAFETY PROTOCOLS
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeProposal.safetyGuarantees.map((guarantee, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px',
                  background: 'rgba(0, 176, 255, 0.06)',
                  border: '1px solid rgba(0, 176, 255, 0.25)',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ color: 'var(--tech-cyan)', fontSize: '1rem' }}>🛡</span>
                <span>{guarantee}</span>
              </div>
            ))}
          </div>

          {/* Industry Rationale Box */}
          <div style={{
            background: 'rgba(8, 14, 22, 0.8)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '0.78rem',
            lineHeight: '1.4',
            color: 'var(--text-muted)'
          }}>
            <strong style={{ color: '#fff' }}>Why Human Approval Matters:</strong>
            <p style={{ marginTop: '4px' }}>
              Unlike black-box AMRs that reorganize shelves unannounced, Eco-Vision empowers the Warehouse Manager with full auditability, Before/After spatial impact previews, and 100% legal compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

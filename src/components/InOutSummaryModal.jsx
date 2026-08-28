import React from 'react';
import { MOCK_INOUT_TODAY } from '../data/mockData.js';

export default function InOutSummaryModal({ onClose }) {
  const totalIn = MOCK_INOUT_TODAY.reduce((sum, row) => sum + row.in, 0);
  const totalOut = MOCK_INOUT_TODAY.reduce((sum, row) => sum + row.out, 0);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26, 29, 36, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>สรุปการเข้า-ออกของสินค้า (วันนี้)</h3>
          <button
            onClick={onClose}
            style={{
              background: '#f1f2f4',
              border: 'none',
              color: 'var(--text-muted)',
              borderRadius: '6px',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              fontSize: '1rem',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ background: 'var(--eco-green-soft)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--eco-green-dark)', fontWeight: 600 }}>รวมสินค้าเข้า</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--eco-green-dark)' }}>+{totalIn}</div>
          </div>
          <div style={{ background: 'var(--tech-cyan-soft)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--tech-cyan)', fontWeight: 600 }}>รวมสินค้าออก</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--tech-cyan)' }}>-{totalOut}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.02em' }}>
            แยกตามรายการสินค้า
          </div>
          {MOCK_INOUT_TODAY.map((row) => (
            <div
              key={row.skuId}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fafbfb',
                border: '1px solid var(--border-subtle)',
                borderRadius: '9px',
                padding: '9px 12px',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>{row.name}</div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', flexShrink: 0, fontWeight: 600 }}>
                <span style={{ color: 'var(--eco-green-dark)' }}>เข้า +{row.in}</span>
                <span style={{ color: 'var(--tech-cyan)' }}>ออก -{row.out}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

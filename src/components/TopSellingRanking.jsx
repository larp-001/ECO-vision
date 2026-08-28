import React from 'react';
import { MOCK_INVENTORY } from '../data/mockData.js';

export default function TopSellingRanking() {
  const top5 = [...MOCK_INVENTORY].sort((a, b) => b.pickedToday - a.pickedToday).slice(0, 5);

  return (
    <div className="glass-panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700 }}>TOP 5 สินค้าขายดี (ออกจากคลังวันนี้)</h3>
        <span className="hud-badge hud-badge-green" style={{ fontSize: '0.62rem' }}>อัปเดตวันนี้</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {top5.map((item, idx) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: idx === 0 ? 'var(--eco-green-soft)' : '#fafbfb',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9px',
              padding: '8px 10px',
            }}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                flexShrink: 0,
                borderRadius: '6px',
                background: idx === 0 ? 'var(--eco-green)' : '#eef0f2',
                color: idx === 0 ? '#fff' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.72rem',
              }}
            >
              {idx + 1}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>{item.category}</div>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontWeight: 700, color: 'var(--eco-green-dark)', fontSize: '0.95rem' }}>
                {item.pickedToday}
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>ชิ้น/วัน</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

export default function AlertNotification({ alerts, onDismiss, onSelectAlert }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: '100%'
    }}>
      {alerts.filter(a => a.active).map((alert) => {
        const isRed = alert.level === 'ALERT' || alert.level === 'DANGER';
        const isAmber = alert.level === 'WARNING';
        
        return (
          <div
            key={alert.id}
            className="glass-panel"
            style={{
              padding: '12px 16px',
              borderLeft: isRed ? '4px solid var(--danger-red)' : isAmber ? '4px solid var(--warning-amber)' : '4px solid var(--tech-cyan)',
              background: isRed ? 'var(--danger-red-soft)' : isAmber ? 'var(--warning-amber-soft)' : '#ffffff',
              boxShadow: '0 12px 28px rgba(16,24,40,.10), 0 2px 6px rgba(16,24,40,.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              animation: 'slideIn 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`status-pulse ${isRed ? 'red' : isAmber ? 'amber' : 'green'}`}></span>
                <span style={{
                  fontSize: '0.72rem',
                  color: isRed ? 'var(--danger-red)' : isAmber ? 'var(--warning-amber)' : 'var(--tech-cyan)',
                  fontWeight: '600'
                }}>
                  {alert.source}
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                {alert.timestamp}
              </span>
            </div>

            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              {alert.title}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
              {alert.description}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
              {onSelectAlert && (
                <button
                  onClick={() => onSelectAlert(alert)}
                  style={{
                    background: 'var(--tech-cyan-soft)',
                    border: 'none',
                    color: 'var(--tech-cyan)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  ดูรายละเอียด →
                </button>
              )}
              <button
                onClick={() => onDismiss(alert.id)}
                style={{
                  background: '#fff',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-dim)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                รับทราบ
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

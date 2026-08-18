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
              background: isRed ? 'rgba(30, 8, 12, 0.92)' : isAmber ? 'rgba(30, 18, 5, 0.92)' : 'rgba(10, 20, 32, 0.92)',
              boxShadow: isRed ? '0 0 20px rgba(255, 23, 68, 0.3)' : '0 0 15px rgba(255, 145, 0, 0.25)',
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: isRed ? 'var(--danger-red)' : isAmber ? 'var(--warning-amber)' : 'var(--tech-cyan)',
                  fontWeight: 'bold'
                }}>
                  [{alert.level}] {alert.source}
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {alert.timestamp}
              </span>
            </div>

            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#fff' }}>
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
                    background: 'rgba(0, 176, 255, 0.15)',
                    border: '1px solid var(--tech-cyan)',
                    color: 'var(--tech-cyan)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  VIEW TELEMETRY →
                </button>
              )}
              <button
                onClick={() => onDismiss(alert.id)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-dim)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                ACK
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

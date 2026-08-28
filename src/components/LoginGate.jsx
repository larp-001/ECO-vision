import React, { useState } from 'react';

// Mock owner-only login gate. No real backend — this is a presentation mockup.
// Wireframe stage: the form is shown for the flow/demo, but any input passes through.
export default function LoginGate({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthed) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wireframe mode: no real credential check yet — any input logs in.
    setIsAuthed(true);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        background:
          'radial-gradient(1000px 500px at 82% -10%, #eafaf0 0%, transparent 60%), radial-gradient(800px 500px at -10% 110%, #eef4ff 0%, transparent 55%), #f6f7f9',
        fontFamily: "'IBM Plex Sans Thai', 'IBM Plex Sans', -apple-system, sans-serif",
      }}
    >
      <div style={{ width: '100%', maxWidth: '392px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>

        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(22, 163, 74, 0.28)',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3.5" y="10.5" width="17" height="9" rx="2.3"></rect>
              <circle cx="12" cy="5.3" r="1.9"></circle>
              <path d="M12 7.2v3.3"></path>
              <path d="M7.5 15h.01M16.5 15h.01"></path>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.28rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#1a1d24' }}>ECO-VISION</div>
            <div style={{ fontSize: '0.86rem', color: '#68707c', marginTop: '2px' }}>ระบบบริหารจัดการหุ่นยนต์คลังสินค้าอัจฉริยะ</div>
          </div>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid #e6e8eb',
            borderRadius: '14px',
            boxShadow: '0 12px 28px rgba(16,24,40,.08), 0 2px 6px rgba(16,24,40,.05)',
            padding: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#dcfce7', borderRadius: '999px', padding: '6px 12px', width: 'fit-content', marginBottom: '22px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#15803d' }}>สำหรับเจ้าของโรงงานเท่านั้น</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.83rem', fontWeight: 500, color: '#1a1d24' }}>ชื่อผู้ใช้</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="เช่น owner"
                style={{
                  height: '42px',
                  borderRadius: '9px',
                  border: '1px solid #e6e8eb',
                  padding: '0 13px',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  color: '#1a1d24',
                  background: '#fbfbfc',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label style={{ fontSize: '0.83rem', fontWeight: 500, color: '#1a1d24' }}>รหัสผ่าน</label>
                <span style={{ fontSize: '0.76rem', color: '#15803d', cursor: 'pointer' }}>ลืมรหัสผ่าน?</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  height: '42px',
                  borderRadius: '9px',
                  border: '1px solid #e6e8eb',
                  padding: '0 13px',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  color: '#1a1d24',
                  background: '#fbfbfc',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '6px',
                height: '44px',
                border: 'none',
                borderRadius: '9px',
                background: '#16a34a',
                color: '#fff',
                fontFamily: 'inherit',
                fontSize: '0.94rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(22,163,74,0.25)',
              }}
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>

        <div style={{ fontSize: '0.78rem', color: '#9aa1ab', textAlign: 'center' }}>
          เดโม่สำหรับนำเสนอโครงการ · Eco-Smart Vision &amp; Radar Robot
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import LoginGate from './components/LoginGate.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, background: '#f6f7f9' }}>
      <LoginGate>
        <Dashboard />
      </LoginGate>
    </div>
  );
}

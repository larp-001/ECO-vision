import React, { useState } from 'react';

export default function FactoryBuilderModal({ isOpen, onClose, onGenerateFromImage }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [roomSize, setRoomSize] = useState({ width: 48, depth: 36 });
  const [gridDensity, setGridDensity] = useState('STANDARD'); // COMPACT | STANDARD | WIDE

  if (!isOpen) return null;

  const sampleImages = [
    {
      id: 'IMG_SAMPLE_1',
      name: 'รูปโรงงานตัวอย่าง (Industrial Warehouse)',
      preview: 'linear-gradient(135deg, #2b3a4a, #1a2530)',
      desc: 'ผังโรงงานมาตรฐาน 48x36 เมตร พร้อมทางเดินตรงกลาง'
    },
    {
      id: 'IMG_SAMPLE_2',
      name: 'รูปห้องปฏิบัติการเคมี (Chemical Lab Room)',
      preview: 'linear-gradient(135deg, #1b3a3a, #0d2525)',
      desc: 'ผังห้องแลปขนาด 32x24 เมตร โซนควบคุมสารเคมี'
    }
  ];

  const handleStartScanning = (imageItem) => {
    setSelectedImage(imageItem);
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      onGenerateFromImage({
        imageName: imageItem.name,
        width: roomSize.width,
        depth: roomSize.depth,
        gridDensity
      });
      onClose();
    }, 1800);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(10, 15, 24, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        background: 'rgba(20, 27, 38, 0.85)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        color: '#fff'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
              สร้างผังห้องโรงงาน 3D จากรูปภาพ
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              AI 3D Factory Floorplan & Grid Generator
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '8px',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Upload Box */}
        <div
          style={{
            border: '1.5px dashed rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
          onClick={() => handleStartScanning(sampleImages[0])}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: '500' }}>
            อัปโหลดรูปภาพโรงงานจริง / แปลนห้อง
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.45)' }}>
            รองรับไฟล์ JPG, PNG (AI แปลงเป็นพื้น Grid 3D อัตโนมัติ)
          </div>
        </div>

        {/* Or Select Sample Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)' }}>
            หรือเลือกจากรูปตัวอย่าง
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sampleImages.map((img) => (
              <div
                key={img.id}
                onClick={() => handleStartScanning(img)}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'; }}
              >
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: '500' }}>{img.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.45)' }}>{img.desc}</div>
                </div>
                <button
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                >
                  เลือกแปลงผัง →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Scanning Progress State */}
        {isScanning && (
          <div style={{
            background: 'rgba(0, 230, 118, 0.1)',
            border: '1px solid rgba(0, 230, 118, 0.3)',
            borderRadius: '10px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '500', color: '#a7f3d0' }}>
                AI กำลังประมวลผลรูปภาพและสร้างพื้น Grid 3D...
              </div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                คำนวณระนาบพื้น ขนาดห้อง และช่อง Grid สำหรับวางเชลฟ์
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

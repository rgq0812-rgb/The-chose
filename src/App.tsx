import React from 'react';
import TacticalHUD from './components/TacticalHUD';

/**
 * THE CHOSE v1.0 - POINT D'ENTRÉE TACTIQUE
 * Interface Onyx & Gold haute fidélité.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#07080a] overflow-hidden font-sans select-none antialiased">
      {/* Composant HUD Principal */}
      <TacticalHUD />

      {/* Overlays Système & Typographie */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        ::-webkit-scrollbar { display: none; }
        .custom-scrollbar { scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .select-none { user-select: none; -webkit-user-select: none; }
        
        body {
          background-color: #07080a;
          margin: 0;
          padding: 0;
        }

        /* Animation de pulsation tactique */
        @keyframes tactical-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-tactical {
          animation: tactical-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

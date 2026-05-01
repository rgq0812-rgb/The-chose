import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { Target, Mic, MessageSquare, Crosshair } from 'lucide-react';

const COLORS = { GOLD: '#c9964a', BLACK: '#000000', ONYX: '#050505' };

const HOLES = [
  { number: 1, name: "Le Départ", par: 4, distance: 340, tip: "Vise le bunker de gauche." },
  { number: 11, name: "The Abyss", par: 5, distance: 470, tip: "Liaison ANTONI. Vent de face." },
];

const TacticalContext = createContext<any>(null);

const useVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    window.speechSynthesis.speak(utterance);
  };
  const startListening = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) return;
    const rec = new Recognition();
    rec.lang = 'fr-FR';
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.start();
  };
  return { isListening, startListening, speak };
};

const TacticalHUD = () => {
  const { isListening, startListening, speak } = useVoice();
  const [showChat, setShowChat] = useState(false);
  const hole = HOLES[0];

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col font-sans overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #c9964a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute inset-0 flex items-center justify-center">
           <Crosshair size={600} strokeWidth={0.1} style={{ color: COLORS.GOLD }} />
        </div>
      </div>

      <div className="relative z-20 p-6 pt-12 flex justify-between items-center">
        <div>
          <span className="text-gold text-[8px] font-black tracking-[0.5em]" style={{ color: COLORS.GOLD }}>LEVEL: ONYX</span>
          <h1 className="text-3xl font-black italic uppercase">{hole.name}</h1>
        </div>
        <button onClick={startListening} className={`w-14 h-14 rounded-full flex items-center justify-center ${isListening ? 'bg-red-600 animate-pulse' : 'bg-gold'}`} style={!isListening ? { backgroundColor: COLORS.GOLD } : {}}>
          <Mic size={24} className={isListening ? 'text-white' : 'text-black'} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="text-[150px] font-black italic leading-none text-white">{hole.distance}</div>
        <div className="text-gold font-black tracking-[1em] text-xs" style={{ color: COLORS.GOLD }}>METERS</div>
      </div>

      <div className="relative z-20 px-6 mb-10">
        <div onClick={() => { setShowChat(!showChat); speak(hole.tip); }} className="bg-black/80 border border-gold/30 p-6 rounded-[2.5rem] backdrop-blur-xl flex items-center gap-4 border-gold">
          <MessageSquare size={20} style={{ color: COLORS.GOLD }} />
          <div>
            <div className="text-[10px] font-black text-blue-400 uppercase">ANTONI LINK</div>
            <p className="text-sm font-bold italic opacity-80">"{hole.tip}"</p>
          </div>
        </div>
      </div>

      <div className="relative z-50 bg-black border-t border-white/10 p-4 h-[80px] flex justify-around items-center">
        <Target size={24} style={{ color: COLORS.GOLD }} />
        <span className="text-[10px] font-black tracking-widest text-gold">TACTIQUE ACTIVÉE</span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <TacticalContext.Provider value={{}}>
      <TacticalHUD />
      <style>{`body { background: #000000; margin: 0; overflow: hidden; }`}</style>
    </TacticalContext.Provider>
  );
}




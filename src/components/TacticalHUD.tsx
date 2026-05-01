import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTactical } from '../context/TacticalContext';
import { COLORS } from '../constants';
import { ChevronRight, ChevronLeft, ShieldCheck, Zap, Target, BarChart3, Settings2 } from 'lucide-react';
import { Mode } from '../types';

const TacticalHUD = () => {
  const { 
    currentCourse, 
    currentHoleIndex, 
    setCurrentHoleIndex, 
    selectedTee, 
    setSelectedTee,
    caddieMode,
    setCaddieMode,
    vigor
  } = useTactical();
  
  const [showTeeSelector, setShowToleSelector] = useState(false);
  
  const holes = currentCourse.holes;
  const hole = holes[currentHoleIndex];
  
  // Personas mapping
  const PERSONAS = {
    strat: { name: 'ADAM', sub: 'STRATÈGE', icon: ShieldCheck, color: '#3b82f6', msg: 'Sécurité, milieu de fairway.' },
    mage: { name: 'ANTONI', sub: 'MAGE', icon: Target, color: '#a855f7', msg: 'Créativité (Draw/Fade/Stinger).' },
    pred: { name: 'ARNOLD', sub: 'PRÉDATEUR', icon: Zap, color: '#e11d48', msg: 'Agression totale du drapeau.' },
    clock: { name: 'JOSH', sub: 'HORLOGER', icon: BarChart3, color: '#fbbf24', msg: 'Chiffres bruts, zéro adjectif.' }
  };

  const currentPersona = PERSONAS[caddieMode];

  const handleNext = () => {
    setCurrentHoleIndex((currentHoleIndex + 1) % holes.length);
  };

  const handlePrev = () => {
    setCurrentHoleIndex((currentHoleIndex - 1 + holes.length) % holes.length);
  };

  // Vigor effect: if vigor < 50%, suggest +1 club (but distances remain real)
  const vigorWarning = vigor < 50;

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-6 flex flex-col justify-between font-sans overflow-hidden select-none relative">
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/10 rounded-full blur-[120px]" style={{ background: `${COLORS.GOLD}1a` }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-600/5 rounded-full blur-[100px]" />
      </div>

      {/* TOP HEADER: COURSE & SETTINGS */}
      <div className="relative z-20 flex justify-between items-start pt-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-3 bg-gold" style={{ backgroundColor: COLORS.GOLD }} />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">
              {currentCourse.name}
            </span>
          </div>
          <h2 className="text-xl font-black italic tracking-tighter uppercase leading-none opacity-80">
            {currentCourse.subtitle}
          </h2>
        </div>
        
        <button 
          onClick={() => setShowToleSelector(!showTeeSelector)}
          className="p-3 bg-white/5 rounded-2xl border border-white/10 active:scale-90 transition-transform"
        >
          <Settings2 size={18} className="text-white/60" />
        </button>
      </div>

      {/* MAIN HUD CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={hole.number}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="relative z-10 flex flex-col items-center py-4"
        >
          {/* HOLE INFO */}
          <div className="flex flex-col items-center mb-8">
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.5 }}
               className="text-[12px] font-black tracking-[0.5em] uppercase mb-2"
               style={{ color: COLORS.GOLD }}
             >
              TROU {hole.number}
            </motion.span>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none text-center">
              {hole.name}
            </h1>
            <div className="flex gap-4 mt-4 text-[10px] font-bold tracking-widest uppercase opacity-40">
              <span>PAR {hole.par}</span>
              <span className="w-[1px] h-3 bg-white/20" />
              <span>HCP {hole.handicap}</span>
            </div>
          </div>

          {/* DISTANCE DISPLAY */}
          <div className="relative flex flex-col items-center justify-center p-12">
             <div className="absolute inset-0 bg-gold/5 blur-[80px] pointer-events-none" style={{ background: `${currentPersona.color}1a` }} />
             
             <div className="relative z-10 flex flex-col items-center">
                <span className="text-[160px] font-black italic leading-none tracking-tighter mb-0 tabular-nums">
                  {(hole.distanceTee as any)[selectedTee] || hole.distanceTee.white}
                </span>
                
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-white/20" />
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase" style={{ color: currentPersona.color }}>
                    MÈTRES AU GREEN
                  </span>
                  <div className="h-[1px] w-8 bg-white/20" />
                </div>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CONTROLS AREA */}
      <div className="relative z-20 space-y-6">
        
        {/* TEE & PERSONA QUICK SELECT */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {(['black', 'white', 'yellow', 'red'] as const).map((tee) => (
            <button
              key={tee}
              onClick={() => setSelectedTee(tee)}
              className={`flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                selectedTee === tee 
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                : 'bg-white/5 text-white/40 border-white/10'
              }`}
            >
              {tee}
            </button>
          ))}
          <div className="w-[1px] h-8 bg-white/10 flex-none mx-2" />
          {(Object.keys(PERSONAS) as Mode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setCaddieMode(mode)}
              className={`flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                caddieMode === mode 
                ? 'bg-gold/20 text-gold border-gold/40' 
                : 'bg-white/5 text-white/40 border-white/10'
              }`}
              style={caddieMode === mode ? { backgroundColor: `${PERSONAS[mode].color}33`, color: PERSONAS[mode].color, borderColor: `${PERSONAS[mode].color}66` } : {}}
            >
              {PERSONAS[mode].name}
            </button>
          ))}
        </div>

        {/* CADDIE ADVICE BOX */}
        <motion.div 
          key={caddieMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/5 border-l-[4px] rounded-r-2xl backdrop-blur-md relative overflow-hidden"
          style={{ borderLeftColor: currentPersona.color }}
        >
          <div className="absolute top-0 right-0 p-2 opacity-5 italic text-[40px] font-black -translate-y-2 translate-x-2">
            {currentPersona.name}
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <currentPersona.icon size={14} style={{ color: currentPersona.color }} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: currentPersona.color }}>
              {currentPersona.name} • {currentPersona.sub}
            </span>
          </div>
          
          <p className="text-lg font-bold italic leading-snug text-white/90 pr-12">
            "{vigorWarning ? "Vigueur faible. Propose +1 club." : hole.tip}"
          </p>
          <p className="text-[10px] mt-2 opacity-40 uppercase tracking-widest font-bold">
            {currentPersona.msg}
          </p>
        </motion.div>

        {/* BOTTOM NAVIGATION */}
        <div className="flex gap-4 pb-8">
          <button 
            onClick={handlePrev}
            className="w-20 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button className="flex-1 h-16 bg-gold rounded-2xl flex items-center justify-center gap-4 group active:scale-95 transition-all shadow-[0_10px_40px_rgba(201,150,74,0.3)]" style={{ backgroundColor: COLORS.GOLD }}>
            <span className="text-black text-xs font-black uppercase tracking-[0.2em]">Initialiser Trajectoire</span>
            <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={handleNext}
            className="w-20 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 active:scale-90 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* TEE OVERLAY / MORE OPTIONS (could expand later) */}
      {showTeeSelector && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-[#07080a]/90 backdrop-blur-xl p-12 flex flex-col items-center justify-center"
        >
          <h2 className="text-3xl font-black italic uppercase mb-12 tracking-tighter">Paramètres Tactiques</h2>
          {/* Add more settings here if needed */}
          <button 
            onClick={() => setShowToleSelector(false)}
            className="px-12 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl"
          >
            Fermer
          </button>
        </motion.div>
      )}

      {/* PERSONA WHISPER (Voice First Feel) */}
      <div className="fixed bottom-2 right-6 opacity-20 text-[8px] font-black tracking-widest uppercase">
        Liaison confirmée • Mode {currentPersona.name} actif
      </div>
    </div>
  );
};

export default TacticalHUD;


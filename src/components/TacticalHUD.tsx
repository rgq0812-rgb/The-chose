import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTactical } from '../context/TacticalContext';
import { COLORS } from '../constants';
import { 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Zap, 
  Target, 
  BarChart3, 
  Settings2,
  Wind,
  Plus,
  Home,
  LayoutGrid,
  User,
  Navigation2
} from 'lucide-react';
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
    mage: { name: 'ANTONI', sub: 'MAGE', icon: Target, color: '#a855f7', msg: 'Liaison ANTONI. Le vent est ton allié.' },
    pred: { name: 'ARNOLD', sub: 'PRÉDATEUR', icon: Zap, color: '#e11d48', msg: 'Agression totale du drapeau.' },
    clock: { name: 'JOSH', sub: 'HORLOGER', icon: BarChart3, color: '#fbbf24', msg: 'Zéro adjectif. Chiffres bruts.' }
  };

  const currentPersona = PERSONAS[caddieMode];

  const handleNext = () => setCurrentHoleIndex((currentHoleIndex + 1) % holes.length);
  const handlePrev = () => setCurrentHoleIndex((currentHoleIndex - 1 + holes.length) % holes.length);

  const vigorWarning = vigor < 50;

  // Distances Tri-Zone (basées sur le milieu)
  const distMid = (hole.distanceTee as any)[selectedTee] || hole.distanceTee.white;
  const distFront = distMid - 14;
  const distBack = distMid + 16;

  return (
    <div className="min-h-screen bg-[#07080a] text-white flex flex-col font-sans overflow-hidden select-none relative pb-[calc(100px+env(safe-area-inset-bottom))]">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-gold/5 rounded-full blur-[150px]" style={{ background: `${COLORS.GOLD}10` }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-600/5 rounded-full blur-[120px]" />
      </div>

      {/* TOP BAR: CLIMAT & CLUB IA */}
      <div className="relative z-20 flex gap-4 p-5 pt-10">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 opacity-40 text-[8px] font-black uppercase tracking-widest">
              <Wind size={8} /> Vent
            </div>
            <div className="text-xl font-black italic">14 <span className="text-[10px] opacity-40 not-italic">KM/H</span></div>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col text-right">
            <span className="opacity-40 text-[8px] font-black uppercase tracking-widest">SENS</span>
            <Navigation2 size={16} className="rotate-45 text-gold ml-auto" style={{ color: COLORS.GOLD }} />
          </div>
        </div>

        <div className="flex-1 bg-gold rounded-2xl p-3 flex items-center gap-3 shadow-[0_0_30px_rgba(201,150,74,0.2)]" style={{ backgroundColor: COLORS.GOLD }}>
          <Zap size={18} className="text-black" />
          <div>
            <div className="text-black/60 text-[8px] font-black uppercase tracking-widest">CLUB IA</div>
            <div className="text-xl text-black font-black italic uppercase leading-none">FER 5</div>
          </div>
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 px-5 space-y-6 overflow-y-auto no-scrollbar pb-10">
        
        {/* TRI-ZONE PROTOCOL */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-black italic uppercase tracking-[0.2em] opacity-40">Protocole Tri-Zone</h3>
            <span className="text-[8px] font-black text-green-500 tracking-widest uppercase">GPS SYNC: OK</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'FRONT', dist: distFront, active: false },
              { label: 'MILIEU', dist: distMid, active: true, color: COLORS.GOLD },
              { label: 'FOND', dist: distBack, active: false }
            ].map((zone) => (
              <div 
                key={zone.label}
                className={`p-4 rounded-3xl border transition-all flex flex-col items-center justify-center relative overflow-hidden ${
                  zone.active 
                  ? 'bg-gold border-gold text-black' 
                  : 'bg-white/5 border-white/10 text-white/40'
                }`}
                style={zone.active ? { backgroundColor: zone.color, borderColor: zone.color } : {}}
              >
                <span className="text-[8px] font-black tracking-widest uppercase mb-1">{zone.label}</span>
                <div className="text-3xl font-black italic tabular-nums leading-none">
                  {zone.dist}<span className="text-[10px] ml-0.5 opacity-60 not-italic">M</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEURAL LINK ADVICE */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={caddieMode + hole.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-2 right-4 opacity-5 italic text-[60px] font-black pointer-events-none uppercase">
              {currentPersona.name}
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentPersona.color }} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80" style={{ color: currentPersona.color }}>
                {currentPersona.name} NEURAL LINK
              </span>
            </div>
            
            <p className="text-lg font-bold italic leading-tight text-white/90 pr-10">
              "{vigorWarning ? "Vigueur faible. Propose +1 club de sécurité." : hole.tip}"
            </p>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-[8px] font-black uppercase tracking-widest opacity-40">Statut: Liaison active</div>
              <Target size={24} className="opacity-10" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CADDIES SELECTION */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black italic uppercase tracking-[0.2em] opacity-40 text-center">Caddies Neuraux</h3>
          <div className="flex justify-center gap-6">
            {(Object.entries(PERSONAS) as [Mode, any][]).map(([key, p]) => (
              <button 
                key={key}
                onClick={() => setCaddieMode(key)}
                className="flex flex-col items-center gap-3 transition-transform active:scale-90"
              >
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                  caddieMode === key 
                  ? 'border-gold bg-gold/10' 
                  : 'border-white/10 bg-white/5'
                }`} style={caddieMode === key ? { borderColor: COLORS.GOLD } : {}}>
                  <p.icon size={20} style={{ color: caddieMode === key ? COLORS.GOLD : 'rgba(255,255,255,0.2)' }} />
                </div>
                <span className={`text-[10px] font-black tracking-widest uppercase ${
                  caddieMode === key ? 'text-gold' : 'opacity-40'
                }`} style={caddieMode === key ? { color: COLORS.GOLD } : {}}>
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* DÉFI INSTINCT - VERSION STABLE ONYX */}
        <button className="w-full p-8 bg-zinc-900 border border-zinc-700 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 relative group active:scale-95 transition-all">
          <span className="text-[#C9964A] text-2xl font-black italic uppercase tracking-tighter text-center">
            DÉFI INSTINCT
          </span>
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <Plus className="text-[#C9964A]" size={24} />
          </div>
          <div className="absolute top-2 right-4 opacity-10 text-[8px] font-black uppercase tracking-widest">
            Protocol Instinct v1.0
          </div>
        </button>
      </div>

      {/* BOTTOM TAB BAR - STABILIZED DESIGN */}
      <div className="fixed bottom-0 left-0 right-0 p-5 z-50 bg-gradient-to-t from-[#07080a] to-transparent pt-8">
        <div className="bg-[#101114] border border-white/10 rounded-[2.5rem] p-2 flex items-center justify-between max-w-lg mx-auto shadow-2xl">
          {[
            { icon: Home, label: 'VESTIAIRE' },
            { icon: LayoutGrid, label: 'LE HUB' },
            { icon: Target, label: 'TACTIQUE', active: true },
            { icon: User, label: 'COMPTE' }
          ].map((item) => (
            <button 
              key={item.label}
              className={`flex flex-col items-center gap-1 px-5 py-2.5 rounded-3xl transition-all ${
                item.active ? 'bg-gold text-black shadow-xl scale-105' : 'opacity-30'
              }`}
              style={item.active ? { backgroundColor: COLORS.GOLD } : {}}
            >
              <item.icon size={18} />
              <span className="text-[7px] font-black tracking-[0.2em] uppercase">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TEE SELECTOR BUTTON (Quick access bottom right) */}
      <button 
        onClick={() => setShowToleSelector(true)}
        className="fixed top-8 right-6 z-50 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl active:scale-90 transition-transform"
      >
        <Settings2 size={18} className="opacity-60" />
      </button>

      {/* OVERLAY: TEE CONFIG */}
      <AnimatePresence>
        {showTeeSelector && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-[#07080a]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
          >
            <h2 className="text-4xl font-black italic uppercase mb-16 tracking-tighter">Configuration Tactique</h2>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {(['black', 'white', 'yellow', 'red'] as const).map((tee) => (
                 <button 
                    key={tee}
                    onClick={() => { setSelectedTee(tee); setShowToleSelector(false); }}
                    className={`h-24 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      selectedTee === tee 
                      ? 'border-gold bg-gold/10' 
                      : 'border-white/10 bg-white/5'
                    }`}
                    style={selectedTee === tee ? { borderColor: COLORS.GOLD } : {}}
                 >
                    <div className={`w-3 h-3 rounded-full ${tee === 'black' ? 'bg-black border border-white/20' : tee === 'white' ? 'bg-white' : tee === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`} />
                    <span className="font-black italic uppercase tracking-widest text-xs">{tee}</span>
                 </button>
              ))}
            </div>

            <button 
              onClick={() => setShowToleSelector(false)}
              className="mt-16 w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center active:scale-95 transition-all"
            >
              <Zap size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHISPER DECOR */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 opacity-10 text-[6px] font-black tracking-[1em] uppercase pointer-events-none">
        Protocol-X • Onyx Layer
      </div>
    </div>
  );
};

export default TacticalHUD;

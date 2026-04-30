import React, { useState, useMemo } from 'react';
import { Trophy, Briefcase, ChevronRight, ShieldCheck, Zap, Activity, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { COLORS } from '../constants';
import { useTactical } from '../context/TacticalContext';

interface LockerRoomProps {
  userIndex: number;
  setUserIndex: (idx: number) => void;
  golfBag: any[];
  setGolfBag: (bag: any[]) => void;
  onClose: () => void;
}

export function LockerRoom({ userIndex, setUserIndex, golfBag, setGolfBag, onClose }: LockerRoomProps) {
  const { vigor, setVigor, touch, setTouch } = useTactical();
  const [brand, setBrand] = useState('TaylorMade');

  // --- IA PERFORMANCE ENGINE ---
  const analysis = useMemo(() => {
    const mastery = Math.round((touch * 0.6) + (vigor * 0.4) - (Math.abs(vigor - touch) * 0.2));
    const ratio = vigor / (touch || 1);
    
    let alert = "";
    let advice = "Calibrage optimal. Votre profil est équilibré pour une précision maximale.";
    
    if (vigor > 80 && touch < 50) {
      alert = "INSTABILITÉ DÉTECTÉE";
      advice = "Vigueur excessive par rapport au toucher. Risque de dispersion majeur. Réduisez la vigueur pour stabiliser votre index.";
    } else if (touch > 85 && vigor < 40) {
      alert = "MANQUE DE PUISSANCE";
      advice = "Excellent toucher, mais votre vigueur actuelle limitera vos carrys. Augmentez la puissance d'impact.";
    } else if (ratio > 1.5) {
      alert = "FORCE BRUTE";
      advice = "Profil agressif. Privilégiez les trajectoires en 'Stinger' pour garder le contrôle.";
    } else if (mastery > 85) {
      advice = "Niveau Élite confirmé. L'IA Caddie fonctionnera avec une marge d'erreur < 1%.";
    }

    return { mastery, alert, advice };
  }, [vigor, touch]);

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-8 flex flex-col justify-between font-sans overflow-y-auto">
      {/* HEADER TACTIQUE */}
      <div className="pt-12">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: COLORS.GOLD }} />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: COLORS.GOLD }}>Calibration Active</span>
        </div>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
          Le <span style={{ color: COLORS.GOLD }}>Vestiaire</span>
        </h1>
        <p className="text-white/40 text-sm mt-4 max-w-[280px]">
          Calibrage neural et synchronisation des paramètres de performance.
        </p>
      </div>

      {/* CONTENU CENTRAL (ANALYSE IA FIRST) */}
      <div className="space-y-6 my-8">
        
        {/* CARTE : IA ANALYTICS */}
        <div className="bg-white/5 border border-gold/20 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden" style={{ borderColor: `${COLORS.GOLD}33` }}>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[8px] font-black text-gold uppercase tracking-[0.3em] mb-1" style={{ color: COLORS.GOLD }}>Neural Mastery Level</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black italic tracking-tighter">{analysis.mastery}%</span>
                  <Activity size={16} className="text-gold animate-pulse" style={{ color: COLORS.GOLD }} />
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center">
                <Zap size={24} className="text-gold" style={{ color: COLORS.GOLD }} />
              </div>
            </div>

            {/* WAVE VISUALIZATION */}
            <div className="h-12 flex items-end gap-1 mb-6">
              {[...Array(20)].map((_, i) => {
                const duration = 1 + (i % 3) * 0.4;
                const delay = (i % 7) * 0.2;
                return (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [10, 20 + (i % 5) * 5, 15] 
                    }}
                    transition={{ 
                      duration: duration, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: delay
                    }}
                    className="flex-1 rounded-full bg-gold/20"
                    style={{ 
                      backgroundColor: i / 20 < analysis.mastery / 100 ? `${COLORS.GOLD}88` : `${COLORS.GOLD}1a` 
                    }}
                  />
                );
              })}
            </div>

            {/* ADVICE BOX */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
              {analysis.alert && (
                <div className="flex items-center gap-2 mb-2 text-rose-500">
                  <Info size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{analysis.alert}</span>
                </div>
              )}
              <p className="text-[11px] font-bold italic leading-relaxed text-white/60">
                "{analysis.advice}"
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[80px] pointer-events-none" />
        </div>

        {/* CARTE : CALIBRAGE PHYSIQUE */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-2">Réglages Balistiques</h3>
          
          {/* SLIDER VIGUEUR */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-black uppercase tracking-widest">Vigueur <span className="text-gold" style={{ color: COLORS.GOLD }}>(Puissance)</span></span>
              <span className="font-mono font-bold text-gold" style={{ color: COLORS.GOLD }}>{vigor}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={vigor}
              onChange={(e) => setVigor(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
              style={{ accentColor: COLORS.GOLD }}
            />
          </div>

          {/* SLIDER TOUCHER */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-black uppercase tracking-widest">Toucher <span className="text-gold" style={{ color: COLORS.GOLD }}>(Contrôle)</span></span>
              <span className="font-mono font-bold text-gold" style={{ color: COLORS.GOLD }}>{touch}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={touch}
              onChange={(e) => setTouch(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
              style={{ accentColor: COLORS.GOLD }}
            />
          </div>
        </div>

        {/* CARTE : INDEX / PERFORMANCE (INDEX RESTE SANS UNITÉ) */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center" style={{ backgroundColor: `${COLORS.GOLD}1a` }}>
               <Trophy size={18} className="text-gold" style={{ color: COLORS.GOLD }} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Profil Performance</span>
          </div>
          
          <div className="flex items-center justify-between bg-black/40 rounded-2xl p-6 border border-white/5">
            <button 
              onClick={() => setUserIndex(Math.max(0, parseFloat((userIndex - 0.1).toFixed(1))))} 
              className="text-2xl font-light w-12 h-12 active:scale-90 transition-all text-gold"
              style={{ color: COLORS.GOLD }}
            >-</button>
            <div className="text-center">
              <span className="text-5xl font-mono font-black italic" style={{ color: COLORS.GOLD }}>
                {userIndex.toFixed(1)}
              </span>
              <p className="text-[7px] font-black uppercase tracking-widest text-white/20 mt-1">Index de Précision</p>
            </div>
            <button 
              onClick={() => setUserIndex(parseFloat((userIndex + 0.1).toFixed(1)))} 
              className="text-2xl font-light w-12 h-12 active:scale-90 transition-all text-gold"
              style={{ color: COLORS.GOLD }}
            >+</button>
          </div>
        </div>

        {/* CARTE : CONFIGURATION DU SAC (UNITÉS EN MÈTRES) */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                  <Briefcase size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Arsenal (Mètres)</span>
              </div>
              <span className="text-[8px] font-black text-gold uppercase" style={{ color: COLORS.GOLD }}>{golfBag.length} CLUBS</span>
           </div>

           <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {golfBag.map((club, idx) => (
                <div key={club.id} className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: club.dist > 150 ? COLORS.GOLD : '#444' }} />
                      <span className="text-xs font-black italic tracking-tight">{club.name}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          const newBag = [...golfBag];
                          newBag[idx].dist = Math.max(0, newBag[idx].dist - 5);
                          setGolfBag(newBag);
                        }}
                        className="text-white/20 hover:text-gold transition-colors"
                      >-</button>
                      <span className="font-mono text-sm font-bold w-12 text-center text-gold" style={{ color: COLORS.GOLD }}>{club.dist}m</span>
                      <button 
                        onClick={() => {
                          const newBag = [...golfBag];
                          newBag[idx].dist = newBag[idx].dist + 5;
                          setGolfBag(newBag);
                        }}
                        className="text-white/20 hover:text-gold transition-colors"
                      >+</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* FOOTER : VALIDATION SAAS */}
      <div className="pb-8 space-y-4">
        <div className="flex items-center justify-center gap-2 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">
          <ShieldCheck size={12} /> Sync Protocole v1.2 • AI Core Connected
        </div>
        <button 
          className="w-full text-black h-20 rounded-[2rem] flex items-center justify-center gap-4 group active:scale-95 transition-all shadow-[0_10px_40px_rgba(201,150,74,0.3)]"
          style={{ backgroundColor: COLORS.GOLD }}
          onClick={onClose}
        >
          <span className="text-sm font-black uppercase tracking-[0.2em]">Sauvegarder & Retour</span>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

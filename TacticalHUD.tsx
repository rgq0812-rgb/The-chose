import React, { useState } from 'react';
import { Navigation, Wind, Target, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { COURSES, CADDIES, INITIAL_CLUBS } from './constants';

const TacticalHUD = () => {
  const [currentHoleIdx, setCurrentHoleIdx] = useState(10); // Trou 11 - The Abyss
  const [activeCaddie, setActiveCaddie] = useState(CADDIES.strat); // Adam par défaut
  
  const course = COURSES[0];
  const hole = course.holes[currentHoleIdx];

  return (
    <div className="min-h-screen bg-black text-white font-urbanist p-6 flex flex-col justify-between">
      
      {/* TOP BAR : INFO TROU */}
      <div className="flex justify-between items-start pt-8">
        <div>
          <h2 className="text-gold font-black text-xs uppercase tracking-[0.3em]">Hole {hole.number}</h2>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">{hole.name}</h1>
          <div className="flex gap-4 mt-2 opacity-50 text-[10px] font-bold uppercase tracking-widest">
            <span>Par {hole.par}</span>
            <span>HCP {hole.handicap}</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col items-center">
          <Wind size={18} className="text-gold mb-1" />
          <span className="text-[10px] font-black italic">14 km/h NO</span>
        </div>
      </div>

      {/* CENTER : LES DISTANCES DYNAMIQUES */}
      <div className="flex flex-col items-center py-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full" />
        
        <div className="text-[120px] font-black italic leading-none tracking-tighter text-white">
          190
        </div>
        <p className="text-gold font-black tracking-[0.5em] uppercase text-xs -mt-2">Mètres au Green</p>

        {/* TRI-ZONE DISPLAY */}
        <div className="grid grid-cols-3 gap-8 mt-12 w-full max-w-sm">
          <div className="text-center opacity-40">
            <p className="text-[8px] font-black uppercase mb-1">Front</p>
            <p className="text-xl font-bold">182</p>
          </div>
          <div className="text-center border-x border-white/10 px-4">
            <p className="text-[8px] font-black uppercase mb-1 text-gold">Middle</p>
            <p className="text-2xl font-black text-gold">190</p>
          </div>
          <div className="text-center opacity-40">
            <p className="text-[8px] font-black uppercase mb-1">Back</p>
            <p className="text-xl font-bold">198</p>
          </div>
        </div>
      </div>

      {/* BOTTOM : IA CADDIE COMMAND CENTER */}
      <div className="space-y-4">
        {/* SELECTEUR DE CADDIE (SYNC AVEC TON CODE) */}
        <div className="flex gap-2">
          {Object.values(CADDIES).map((c) => (
            <button 
              key={c.id}
              onClick={() => setActiveCaddie(c)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all border ${
                activeCaddie.id === c.id ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-white/40'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* CONSEIL TACTIQUE */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <div style={{ backgroundColor: activeCaddie.color }} className="w-1.5 h-1.5 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{activeCaddie.title}</span>
          </div>
          <p className="text-sm font-medium leading-relaxed italic text-white/90">
            "{hole.tip}"
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-[10px] font-black uppercase opacity-40">Club Recommandé</span>
            <span className="text-lg font-black text-gold italic">FER 4</span>
          </div>
        </div>

        {/* NAVIGATION TROU PAR TROU */}
        <div className="flex gap-2">
          <button className="flex-1 bg-white/5 h-14 rounded-2xl flex items-center justify-center"><ChevronLeft /></button>
          <button className="flex-1 bg-white/5 h-14 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-widest">Scorecard</button>
          <button className="flex-1 bg-white/5 h-14 rounded-2xl flex items-center justify-center"><ChevronRight /></button>
        </div>
      </div>

    </div>
  );
};
            

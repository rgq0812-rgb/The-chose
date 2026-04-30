/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, Lock, CreditCard, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { PackType } from '../types';
import { SAAS_CONFIG } from '../lib/saasProtocol';
import { COLORS } from '../constants';

interface PaywallProps {
  currentPack: PackType;
  onUpgrade: (pack: PackType) => void;
  onClose: () => void;
}

export function Paywall({ currentPack, onUpgrade, onClose }: PaywallProps) {
  const plans = [
    {
      id: PackType.PLAYER,
      ...SAAS_CONFIG.pricing[PackType.PLAYER],
      icon: Zap,
      color: COLORS.BRITISH_RACING_GREEN
    },
    {
      id: PackType.STUDENT,
      ...SAAS_CONFIG.pricing[PackType.STUDENT],
      icon: Sparkles,
      color: COLORS.GOLD
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl p-6 flex flex-col justify-center gap-8"
    >
      <button 
        onClick={onClose}
        className="absolute top-12 right-6 p-4 rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform"
      >
        <X size={24} />
      </button>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black italic font-cinzel">ACCÈS ÉLITE BLOQUÉ</h2>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">Passez au niveau supérieur</p>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <motion.button
            key={plan.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onUpgrade(plan.id)}
            className={`w-full p-6 rounded-[2.5rem] border text-left flex items-start gap-4 transition-all relative overflow-hidden group ${currentPack === plan.id ? 'border-white/20 bg-white/5 opacity-60' : 'border-gold bg-gold/10 shadow-2xl shadow-gold/10'}`}
            style={{ borderColor: currentPack === plan.id ? undefined : plan.color }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 shrink-0">
               <plan.icon size={24} style={{ color: plan.color }} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-black italic">{plan.name}</h3>
                <span className="text-sm font-cockpit text-white/60">{plan.price}</span>
              </div>
              <ul className="space-y-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    <CheckCircle2 size={10} className="text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {currentPack === plan.id && (
              <div className="absolute top-4 right-6 text-[8px] font-black text-white/20 uppercase tracking-widest">Plan Actuel</div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 text-white/20">
        <CreditCard size={14} />
        <span className="text-[9px] font-black tracking-widest uppercase">Paiement sécurisé via Stripe</span>
      </div>
    </motion.div>
  );
}

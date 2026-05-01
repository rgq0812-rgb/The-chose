import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Settings as SettingsIcon, 
  Zap, 
  Target, 
  Trophy, 
  ChevronRight,
  ChevronLeft,
  Navigation,
  Clock,
  Wand2,
  Share2,
  CheckCircle2,
  Globe,
  Plus,
  Map as MapIcon,
  Search,
  Wind,
  Compass,
  X,
  User,
  ShieldCheck,
  CreditCard,
  LogOut,
  Lock,
  Briefcase,
  Camera,
  Scan,
  CheckCircle,
  MapIcon as MapPin
} from 'lucide-react';

import { COLORS, CADDIES_CONFIG, THE_STUDENT_LEVELS, COURSES } from './constants';
import { CaddieType, PackType, Coordinates, GameMode } from './types';
import { getGreenZones } from './lib/geoUtils';
import { useAmbientSound } from './hooks/useAmbientSound';
import { calculateAdjustedDistance, recommendClub } from './lib/ballistics';
import { checkAccess } from './lib/saasProtocol';

import { Paywall } from './components/Paywall';
import { LockerRoom } from './components/LockerRoom';
import { useTactical } from './context/TacticalContext';

export default function App() {
  const { 
    userIndex, setUserIndex,
    golfBag, setGolfBag,
    subscription, setSubscription,
    currentCourse, setCurrentCourse,
    currentHoleIndex, setCurrentHoleIndex,
    selectedTee, setSelectedTee
  } = useTactical();

  const [activeTab, setActiveTab] = useState<'hud' | 'hub' | 'locker' | 'account'>('hub');
  const [showPaywall, setShowPaywall] = useState(false);
  const [activeCaddie, setActiveCaddie] = useState(CADDIES_CONFIG[0]);
  const [selectedLevel, setSelectedLevel] = useState(THE_STUDENT_LEVELS[0]);
  const [isIAAnswering, setIsIAAnswering] = useState(false);
  const [isCamOpen, setIsCamOpen] = useState(false);
  
  const { playWind } = useAmbientSound();
  const currentHole = currentCourse.holes[currentHoleIndex] || currentCourse.holes[0];
  const greenPos = currentHole?.green || { 
    front: { lat: 0, lng: 0 }, 
    middle: { lat: 0, lng: 0 }, 
    back: { lat: 0, lng: 0 } 
  };
  
  // Simulated GPS position (Default to Tee Box)
  const [playerPos] = useState<Coordinates>(() => ({ 
    lat: currentHole?.teeBox?.lat || 0, 
    lng: currentHole?.teeBox?.lng || 0 
  }));
  
  const [envData] = useState({
    windSpeedKmh: 14,
    windDirectionDeg: 65, 
    elevationChange: 3,
  });

  const zones = getGreenZones(playerPos, greenPos);

  const getCaddieData = useCallback(() => {
    const rawDist = zones[activeCaddie.targetZone as keyof typeof zones] as number;
    const adjustedDist = calculateAdjustedDistance(rawDist, { 
      ...envData, 
      playerHeading: zones.heading 
    });
    const recommended = recommendClub(adjustedDist, golfBag.map(c => ({ name: c.name, carryDistance: c.dist })));
    return { adjustedDist, club: recommended };
  }, [zones, activeCaddie.targetZone, envData, golfBag]);

  const { adjustedDist, club } = getCaddieData();

  const handleCaddieSelection = (caddie: any) => {
    if (caddie.isPremium && !checkAccess(caddie.id, subscription)) {
      setShowPaywall(true);
      return;
    }
    setActiveCaddie(caddie);
    playWind();
  };

  const handleTabChange = (tab: any) => {
    if (window.navigator.vibrate) window.navigator.vibrate(5);
    setActiveTab(tab);
  };

  const handleIACommand = (cmd: string) => {
    setIsIAAnswering(true);
    playWind();
    setTimeout(() => setIsIAAnswering(false), 2000);
  };

  return (
    <div className="h-[100dvh] w-screen flex flex-col overflow-hidden select-none bg-black text-white font-sans">
      
      
      {/* 4 PILLARS NAVIGATION (FIXED BOTTOM) */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-8 px-6 pointer-events-none">
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-2 flex justify-between items-center shadow-2xl pointer-events-auto max-w-lg mx-auto">
          <NavPill 
            active={activeTab === 'locker'} 
            onClick={() => handleTabChange('locker')}
            icon={<Briefcase size={20} />}
            label="Vestiaire"
          />
          <NavPill 
            active={activeTab === 'hub'} 
            onClick={() => handleTabChange('hub')}
            icon={<Globe size={20} />}
            label="Le Hub"
          />
          <NavPill 
            active={activeTab === 'hud'} 
            onClick={() => handleTabChange('hud')}
            icon={<Target size={24} />}
            label="Tactique"
            primary
          />
          <NavPill 
            active={activeTab === 'account'} 
            onClick={() => handleTabChange('account')}
            icon={<User size={20} />}
            label="Compte"
          />
        </div>
      </nav>

      {/* TABS CONTENT */}
      <main className="flex-1 overflow-y-auto pb-32 touch-pan-y overscroll-y-contain">

        <AnimatePresence mode="wait">
          {activeTab === 'locker' && (
            <motion.div key="locker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <LockerRoom 
                userIndex={userIndex} 
                setUserIndex={setUserIndex}
                golfBag={golfBag}
                setGolfBag={setGolfBag}
                onClose={() => handleTabChange('hud')}
              />
            </motion.div>
          )}

          {activeTab === 'hub' && (
            <motion.div key="hub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <HubTabView 
                currentCourse={currentCourse}
                setCurrentCourse={setCurrentCourse}
                setCurrentHoleIndex={setCurrentHoleIndex}
              />
            </motion.div>
          )}

          {activeTab === 'hud' && (
            <motion.div key="hud" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="p-6">
               <HudView 
                pack={subscription}
                activeCaddie={activeCaddie} 
                onCaddieSelect={(c: any) => handleCaddieSelection(c)}
                isIAAnswering={isIAAnswering}
                envData={envData}
                adjustedDist={adjustedDist}
                club={club}
                zones={zones}
                currentCourse={currentCourse}
                setCurrentCourse={setCurrentCourse}
                currentHoleIndex={currentHoleIndex}
                setCurrentHoleIndex={setCurrentHoleIndex}
                selectedTee={selectedTee}
                setSelectedTee={setSelectedTee}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                handleIACommand={handleIACommand}
                onOpenCam={() => setIsCamOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'account' && (
            <motion.div key="account" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <AccountTabView 
                subscription={subscription}
                setSubscription={setSubscription}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showPaywall && (
          <Paywall 
            currentPack={subscription}
            onUpgrade={(p) => {
              setSubscription(p);
              setShowPaywall(false);
            }}
            onClose={() => setShowPaywall(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCamOpen && (
          <CaddieCam 
            onClose={() => setIsCamOpen(false)} 
            distances={zones} 
          />
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar { display: none; }
        .custom-scrollbar { scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .select-none { user-select: none; -webkit-user-select: none; }
      `}</style>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavPill({ active, icon, label, onClick, primary }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-3xl transition-all duration-500 ${
        active 
          ? primary ? 'bg-gold text-black px-6 shadow-[0_0_20px_rgba(201,150,74,0.4)]' : 'text-gold' 
          : 'text-white/20 hover:text-white/40'
      }`}
      style={{ 
        backgroundColor: active && primary ? COLORS.GOLD : 'transparent',
        color: active && !primary ? COLORS.GOLD : undefined,
      }}
    >
      {icon}
      <span className="text-[7px] font-black uppercase tracking-[0.2em] mt-1 text-center leading-none">{label}</span>
      {active && !primary && (
        <motion.div 
          layoutId="active-nav-dot"
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-gold"
          style={{ backgroundColor: COLORS.GOLD }}
        />
      )}
    </button>
  );
}

function HubTabView({ currentCourse, setCurrentCourse, setCurrentHoleIndex }: any) {
  return (
    <div className="p-8 space-y-8">
      <header className="pt-8">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Le <span style={{ color: COLORS.GOLD }}>Hub</span>
        </h1>
        <p className="text-white/40 text-xs mt-2 uppercase tracking-widest font-bold">Sélection Tactique</p>
      </header>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
        <input 
          type="text"
          placeholder="RECHERCHER UN PARCOURS..."
          className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 px-16 text-[10px] font-black tracking-widest uppercase placeholder:text-white/10 outline-none focus:border-gold/30 transition-colors"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] px-2">À Proximité</h3>
        <div className="grid grid-cols-1 gap-4">
          {COURSES.map((course) => (
            <div 
              key={course.id}
              onClick={() => { setCurrentCourse(course); setCurrentHoleIndex(0); }}
              className={`relative overflow-hidden rounded-[2.5rem] border transition-all active:scale-[0.98] cursor-pointer ${
                currentCourse.id === course.id ? 'border-gold/50 bg-gold/5' : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="p-6 relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black italic tracking-tight">{course.name}</h4>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold">{course.location}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    <MapIcon size={16} className="text-gold" style={{ color: COLORS.GOLD }} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[8px] font-black text-gold uppercase tracking-[0.3em]" style={{ color: COLORS.GOLD }}>Assets GPS Chargés — PAR {course.par}</span>
                  <ChevronRight size={16} className="text-white/20" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[60px] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HudView({ 
  pack, 
  activeCaddie, 
  onCaddieSelect, 
  isIAAnswering,
  envData,
  adjustedDist,
  club,
  zones,
  currentCourse,
  setCurrentCourse,
  currentHoleIndex,
  setCurrentHoleIndex,
  selectedTee,
  setSelectedTee,
  selectedLevel,
  setSelectedLevel,
  handleIACommand,
  onOpenCam
}: any) {
  const [showCourseExplorer, setShowCourseExplorer] = useState(false);
  const currentHole = currentCourse.holes[currentHoleIndex];
  const scorecardDist = currentHole.distanceTee[selectedTee as keyof typeof currentHole.distanceTee];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. STATUS & HOLE NAV */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase italic font-serif">Liaison Parcours</h2>
          <button 
            onClick={() => setShowCourseExplorer(true)}
            className="flex items-center gap-2 group"
          >
             <span className="text-[8px] font-black text-gold border-b border-gold/20 pb-0.5" style={{ color: COLORS.GOLD }}>EXPLORATEUR GOLF</span>
             <Globe size={12} className="text-gold" style={{ color: COLORS.GOLD }} />
          </button>
        </div>
        
        <div 
          className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
            <MapIcon size={80} className="text-gold" style={{ color: COLORS.GOLD }} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="text-[8px] font-black text-gold tracking-[0.3em] uppercase" style={{ color: COLORS.GOLD }}>Liaison GPS</div>
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => currentHoleIndex > 0 && setCurrentHoleIndex(currentHoleIndex - 1)}
                className={`p-1 rounded-lg border border-white/10 active:scale-90 transition-all ${currentHoleIndex <= 0 ? 'opacity-10 pointer-events-none' : 'bg-white/5 opacity-40 hover:opacity-100'}`}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="text-xl font-black italic tracking-tighter">
                TROU {currentHole.number} <span className="text-white/30 text-sm ml-2 font-normal">PAR {currentHole.par}</span>
              </div>
              <button 
                onClick={() => currentHoleIndex < currentCourse.holes.length - 1 && setCurrentHoleIndex(currentHoleIndex + 1)}
                className={`p-1 rounded-lg border border-white/10 active:scale-90 transition-all ${currentHoleIndex >= currentCourse.holes.length - 1 ? 'opacity-10 pointer-events-none' : 'bg-white/5 opacity-40 hover:opacity-100'}`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[8px] font-black text-white/30 tracking-[0.3em] uppercase italic">Index Trou</div>
             <div className="text-xs font-bold text-gold" style={{ color: COLORS.GOLD }}>HCP {currentHole.handicap}</div>
          </div>
        </div>
      </section>

      {/* 2. BALLISTICS & AI CLUB */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex items-center gap-4">
          <div className="relative w-10 h-10 flex items-center justify-center border border-white/10 rounded-full">
             <Wind size={18} className="text-white/20" />
          </div>
          <div>
            <div className="text-[7px] font-black text-white/30 tracking-widest uppercase">Vent</div>
            <div className="text-lg font-mono font-black italic">{envData.windSpeedKmh}<span className="text-[8px] ml-1 opacity-40">KM/H</span></div>
          </div>
        </div>

        <div className="bg-gold border border-gold rounded-3xl p-4 flex items-center gap-4 text-black" style={{ backgroundColor: COLORS.GOLD, borderColor: COLORS.GOLD }}>
          <Zap size={20} fill="currentColor" />
          <div>
            <div className="text-[7px] font-black text-black/60 tracking-widest uppercase">Club IA</div>
            <div className="text-lg font-black italic leading-none">{club.name}</div>
          </div>
        </div>
      </div>

      {/* 3. TRI-ZONE DISTANCES */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-2">
           <h2 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase italic">Protocole Tri-Zone</h2>
           <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">GPS Sync: OK</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <DistanceBox label="FRONT" val={zones.front} active={activeCaddie.targetZone === 'front'} />
          <DistanceBox label="MILIEU" val={zones.middle} active={activeCaddie.targetZone === 'middle'} />
          <DistanceBox label="FOND" val={zones.back} active={activeCaddie.targetZone === 'back'} />
        </div>
      </section>

      {/* 4. CADDIE ADVICE */}
      <CaddieAdvice 
        activeCaddie={activeCaddie} 
        advice={isIAAnswering ? "Liaison neurale..." : activeCaddie.getAdvice(adjustedDist, club.name)} 
      />

      {/* 5. CADDIE SELECTOR */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase italic px-2">Caddies Neuraux</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {CADDIES_CONFIG.map((c) => {
            const isActive = activeCaddie.id === c.id;
            const isLocked = c.isPremium && !checkAccess(c.id, pack);
            return (
              <button
                key={c.id}
                onClick={() => onCaddieSelect(c)}
                className={`flex-shrink-0 w-20 p-4 rounded-[2rem] border transition-all flex flex-col items-center gap-2 ${
                  isActive ? 'bg-white/10' : 'bg-transparent border-white/5 opacity-40'
                }`}
                style={{ borderColor: isActive ? COLORS.GOLD : 'transparent' }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center relative"
                  style={{ backgroundColor: c.color }}
                >
                   {isActive ? <Zap size={16} className="text-black" /> : <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                   {isLocked && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                        <Lock size={12} className="text-white" />
                     </div>
                   )}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest">{c.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. ACTIONS */}
      <div className="grid grid-cols-2 gap-4">
        <ActionButton icon={<Camera size={26} />} label="Caddie Cam" onClick={onOpenCam} />
        <ActionButton 
          icon={<Plus size={26} />} 
          label="DÉFI INSTINCT" 
          onClick={() => handleIACommand("Défi.")}
          bgColor="bg-emerald-500/10" 
          borderColor="border-emerald-500/20" 
          iconColor="text-emerald-500" 
        />
      </div>

      {/* COURSE EXPLORER MODAL */}
      <AnimatePresence>
        {showCourseExplorer && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl p-8 flex flex-col pt-24"
          >
             <button onClick={() => setShowCourseExplorer(false)} className="absolute top-12 right-6 p-4 rounded-full bg-white/5 border border-white/10">
               <X size={20} />
             </button>
             
             <div className="mb-10">
                <h3 className="text-2xl font-black italic text-gold mb-2" style={{ color: COLORS.GOLD }}>EXPLORATEUR MONDIAL</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">Synchronisation GPS</p>
             </div>

             <div className="space-y-4 overflow-y-auto">
                {COURSES.map(course => (
                  <button 
                    key={course.id}
                    onClick={() => { 
                      setCurrentCourse(course); 
                      setCurrentHoleIndex(0); 
                      setShowCourseExplorer(false); 
                    }}
                    className={`w-full p-6 text-left rounded-3xl border transition-all ${
                      currentCourse.id === course.id ? 'border-gold bg-gold/10' : 'border-white/5 bg-white/5'
                    }`}
                    style={{ borderColor: currentCourse.id === course.id ? COLORS.GOLD : undefined }}
                  >
                    <h4 className="text-xl font-black italic">{course.name}</h4>
                    <p className="text-[9px] text-white/40 uppercase font-bold mt-1">{course.location} • PAR {course.par}</p>
                  </button>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccountTabView({ subscription }: any) {
  const { userName, setUserName, userEmail, setUserEmail, userIndex, setUserIndex } = useTactical();

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header className="pt-8">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Mon <span style={{ color: COLORS.GOLD }}>Compte</span>
        </h1>
        <p className="text-white/40 text-xs mt-2 uppercase tracking-widest font-bold">Centre de Commandement</p>
      </header>

      {/* PROFIL DATA */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] px-2">Identité Tactique</h3>
        <div className="space-y-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-6">
          <div className="space-y-1">
            <label className="text-[8px] font-black text-gold uppercase tracking-widest ml-4" style={{ color: COLORS.GOLD }}>Nom d'Opérateur</label>
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold text-white outline-none focus:border-gold/30 transition-all uppercase italic"
              placeholder="VOTRE NOM..."
            />
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-black text-gold uppercase tracking-widest ml-4" style={{ color: COLORS.GOLD }}>Liaison Cryptée (Email)</label>
            <input 
              type="email" 
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold text-white outline-none focus:border-gold/30 transition-all"
              placeholder="VOTRE EMAIL..."
            />
          </div>
        </div>
      </div>

      {/* INDEX / PERFORMANCE */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] px-2">Calibrage Précision</h3>
        <div className="flex items-center justify-between bg-white/5 border border-gold/20 rounded-[2.5rem] p-6" style={{ borderColor: `${COLORS.GOLD}33` }}>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center bg-black/40">
              <Zap size={24} className="text-gold" style={{ color: COLORS.GOLD }} />
            </div>
            <div>
              <div className="text-[8px] font-black text-gold uppercase tracking-[0.3em]" style={{ color: COLORS.GOLD }}>Index Actuel</div>
              <div className="text-3xl font-mono font-black italic">{userIndex.toFixed(1)}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setUserIndex(Math.max(0, parseFloat((userIndex - 0.1).toFixed(1))))}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl active:scale-90 transition-all"
            >-</button>
            <button 
              onClick={() => setUserIndex(parseFloat((userIndex + 0.1).toFixed(1)))}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl active:scale-90 transition-all"
            >+</button>
          </div>
        </div>
      </div>

      {/* SUBSCRIPTION */}
      <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-[2.5rem] p-8 space-y-4" style={{ borderColor: `${COLORS.GOLD}33` }}>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[10px] font-black text-gold uppercase tracking-[0.4em] mb-1" style={{ color: COLORS.GOLD }}>Tier Privilège</div>
            <h3 className="text-2xl font-black italic tracking-tight uppercase">{subscription}</h3>
          </div>
          <ShieldCheck size={32} className="text-gold" style={{ color: COLORS.GOLD }} />
        </div>
        <div className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">Accès Cloud • Caddie IA Illimité • Multiscan</div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] px-2">Sécurité & Facturation</h3>
        <div className="grid grid-cols-1 gap-3">
          <AccountAction icon={<CreditCard size={18} />} label="MODES DE PAIEMENT" />
          <AccountAction icon={<Lock size={18} />} label="PROTOCOLE SÉCURITÉ" />
          <button className="w-full bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 flex items-center gap-4 text-rose-500 active:bg-rose-500/20 transition-all group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">DÉCONNEXION UNITÉ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountAction({ icon, label }: any) {
  return (
    <button className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-white/40">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <ChevronRight size={16} className="text-white/20" />
    </button>
  );
}

function DistanceBox({ label, val, active }: any) {
  return (
    <div className={`p-4 rounded-3xl border transition-all ${active ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20' : 'bg-white/5 border-white/10 text-white/60'}`} style={{ backgroundColor: active ? COLORS.GOLD : undefined, borderColor: active ? COLORS.GOLD : undefined }}>
      <div className={`text-[7px] font-black uppercase tracking-widest ${active ? 'text-black/60' : 'text-white/20'}`}>{label}</div>
      <div className="text-2xl font-mono font-black italic">{val}<span className="text-[8px] ml-0.5 opacity-40">M</span></div>
    </div>
  );
}

function CaddieAdvice({ activeCaddie, advice }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Wand2 size={40} className="text-gold" style={{ color: COLORS.GOLD }} />
      </div>
       <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeCaddie.color }} />
          <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">{activeCaddie.name} Neural Link</span>
       </div>
       <p className="text-sm font-bold italic leading-relaxed text-white/90">"{advice}"</p>
    </div>
  );
}

function ActionButton({ icon, label, onClick, bgColor = "bg-white/5", borderColor = "border-white/10", iconColor = "text-gold" }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full ${bgColor} border ${borderColor} rounded-2xl py-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all group`}
    >
      <div className={`${iconColor} group-hover:scale-110 transition-transform`} style={{ color: iconColor === 'text-gold' ? COLORS.GOLD : undefined }}>{icon}</div>
      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30">{label}</span>
    </button>
  );
}

function CaddieCam({ onClose, distances }: { onClose: () => void; distances: any }) {
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<{ lie: string; slope: string; advice: string } | null>(null);

  const startScan = () => {
    setIsScanning(true);
    setAnalysis(null);
    setTimeout(() => {
      setAnalysis({
        lie: "Rough Épais",
        slope: "+3% (Montée)",
        advice: "Vise le FOND DE GREEN."
      });
      setIsScanning(false);
      if ('vibrate' in navigator) navigator.vibrate([30, 50, 30]);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black flex flex-col">
      <div className="relative flex-1 bg-zinc-950 overflow-hidden flex flex-col items-center justify-center">
         <div className="absolute top-20 left-10 right-10 flex justify-between items-start z-30">
            <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/10">
               <p className="text-[8px] font-black text-gold tracking-widest uppercase mb-2" style={{ color: COLORS.GOLD }}>Scan Tactique</p>
               <div className="flex gap-6 font-mono text-[11px] font-bold">
                  <span>F:{distances.front}M</span>
                  <span className="text-gold" style={{ color: COLORS.GOLD }}>M:{distances.middle}M</span>
                  <span>B:{distances.back}M</span>
               </div>
            </div>
            <button onClick={onClose} className="p-4 bg-white/5 rounded-full border border-white/10">
              <X size={20} />
            </button>
         </div>
         
         <div className={`w-64 h-64 border-2 rounded-full flex items-center justify-center transition-all duration-1000 ${isScanning ? 'border-gold border-t-transparent animate-spin' : 'border-white/10'}`} style={{ borderColor: isScanning ? COLORS.GOLD : undefined }}>
            <div className="w-4 h-4 bg-gold rounded-full" style={{ backgroundColor: COLORS.GOLD }} />
         </div>

         <AnimatePresence>
           {analysis && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-40 left-10 right-10 bg-gold p-6 rounded-3xl text-black" style={{ backgroundColor: COLORS.GOLD }}>
               <div className="flex justify-between mb-4 border-b border-black/10 pb-2">
                 <div className="text-[10px] font-bold uppercase">LIE: <span className="font-black italic ml-2">{analysis.lie}</span></div>
                 <div className="text-[10px] font-bold uppercase">PENTE: <span className="font-black italic ml-2">{analysis.slope}</span></div>
               </div>
               <p className="text-lg font-black italic tracking-tight">{analysis.advice}</p>
             </motion.div>
           )}
         </AnimatePresence>

         <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{isScanning ? 'ANALYSE DU LIE...' : 'SCANNER LE LIE'}</p>
            <button 
              onClick={startScan}
              disabled={isScanning}
              className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${isScanning ? 'border-gold/20 scale-90' : 'border-gold shadow-[0_0_50px_rgba(201,150,74,0.3)]'}`}
              style={{ borderColor: COLORS.GOLD }}
            >
               <div className="w-14 h-14 bg-gold rounded-full" style={{ backgroundColor: COLORS.GOLD }} />
            </button>
         </div>
      </div>
    </motion.div>
  );
}

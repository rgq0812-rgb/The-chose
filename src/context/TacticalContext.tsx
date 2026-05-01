import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Hole, Club, PackType } from '../types';
import { INITIAL_CLUBS, COURSES } from '../constants';

interface TacticalContextType {
  userIndex: number;
  setUserIndex: (val: number) => void;
  userName: string;
  setUserName: (val: string) => void;
  userEmail: string;
  setUserEmail: (val: string) => void;
  vigor: number;
  setVigor: (val: number) => void;
  touch: number;
  setTouch: (val: number) => void;
  golfBag: Club[];
  setGolfBag: (bag: Club[]) => void;
  subscription: PackType;
  setSubscription: (p: PackType) => void;
  currentCourse: Course;
  setCurrentCourse: (c: Course) => void;
  currentHoleIndex: number;
  setCurrentHoleIndex: (i: number) => void;
  selectedTee: 'black' | 'white' | 'ladies' | 'yellow' | 'blue' | 'red';
  setSelectedTee: (tee: any) => void;
  caddieMode: Mode;
  setCaddieMode: (m: Mode) => void;
}

const TacticalContext = createContext<TacticalContextType | undefined>(undefined);

export const TacticalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userIndex, setUserIndex] = useState(() => Number(localStorage.getItem('user_index')) || 18.0);
  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || 'ELITE PLAYER');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('user_email') || 'contact@thechose.io');
  const [vigor, setVigor] = useState(() => Number(localStorage.getItem('user_vigor')) || 70);
  const [touch, setTouch] = useState(() => Number(localStorage.getItem('user_touch')) || 60);
  const [golfBag, setGolfBag] = useState<Club[]>(() => {
    try {
      const saved = localStorage.getItem('golf_bag');
      return saved ? JSON.parse(saved) : INITIAL_CLUBS;
    } catch (e) {
      console.error("Failed to parse golf_bag", e);
      return INITIAL_CLUBS;
    }
  });
  const [subscription, setSubscription] = useState<PackType>(() => {
    return (localStorage.getItem('app_path') as PackType) || PackType.PLAYER;
  });
  const [currentCourse, setCurrentCourse] = useState<Course>(COURSES[0]);
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
  const [selectedTee, setSelectedTee] = useState<'black' | 'white' | 'ladies' | 'yellow' | 'blue' | 'red'>('white');
  const [caddieMode, setCaddieMode] = useState<Mode>('pred');

  useEffect(() => {
    localStorage.setItem('user_index', userIndex.toString());
  }, [userIndex]);

  useEffect(() => {
    localStorage.setItem('user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('user_email', userEmail);
  }, [userEmail]);

  useEffect(() => {
    localStorage.setItem('user_vigor', vigor.toString());
  }, [vigor]);

  useEffect(() => {
    localStorage.setItem('user_touch', touch.toString());
  }, [touch]);

  useEffect(() => {
    localStorage.setItem('golf_bag', JSON.stringify(golfBag));
  }, [golfBag]);

  useEffect(() => {
    localStorage.setItem('app_path', subscription);
  }, [subscription]);

  return (
    <TacticalContext.Provider value={{
      userIndex, setUserIndex,
      userName, setUserName,
      userEmail, setUserEmail,
      vigor, setVigor,
      touch, setTouch,
      golfBag, setGolfBag,
      subscription, setSubscription,
      currentCourse, setCurrentCourse,
      currentHoleIndex, setCurrentHoleIndex,
      selectedTee, setSelectedTee,
      caddieMode, setCaddieMode
    }}>
      {children}
    </TacticalContext.Provider>
  );
};

export const useTactical = () => {
  const context = useContext(TacticalContext);
  if (!context) throw new Error('useTactical must be used within TacticalProvider');
  return context;
};

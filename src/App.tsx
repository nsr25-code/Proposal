/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Stars, PartyPopper, Sparkles, RotateCcw } from 'lucide-react';

const HeartBurst: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            scale: 0, 
            x: "50%", 
            y: "50%",
            opacity: 1 
          }}
          animate={{ 
            scale: [0, 1.5, 0],
            x: `${50 + (Math.random() - 0.5) * 100}%`,
            y: `${50 + (Math.random() - 0.5) * 100}%`,
            opacity: [0, 1, 0],
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute text-rose-400/40"
        >
          <Heart fill="currentColor" size={Math.random() * 40 + 20} />
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [noMessageIndex, setNoMessageIndex] = useState(0);

  const noMessages = [
    "Are you sure?",
    "Think again!",
    "Wait! Don't click!",
    "I'll be very sad... 😢",
    "Please? 🥺",
    "You're breaking my heart! 💔",
    "Is that your final answer?",
    "Just click Yes already! ✨",
    "I'll keep running! 🏃‍♂️",
    "Catch me if you can! 😜",
    "Wrong button! ⬅️",
    "Try the other one! 👉",
  ];

  const moveNoButton = useCallback(() => {
    // Button dimensions (approximate)
    const btnWidth = 160;
    const btnHeight = 80;
    const margin = 20;

    // Check if we are on a small screen
    const isMobile = window.innerWidth < 768;
    
    // Calculate the maximum allowed displacement from the original position
    // On mobile, we need to be much more restrictive with vertical movement
    const maxX = Math.max(0, (window.innerWidth / 2) - (btnWidth / 2) - margin);
    const maxY = Math.max(0, (window.innerHeight / 2) - (btnHeight / 2) - margin - (isMobile ? 150 : 80));

    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY * 2;
    const randomRotate = (Math.random() * 40) - 20; // -20 to +20 degrees
    
    setNoButtonPos({ x: randomX, y: randomY, rotate: randomRotate });
    setIsMoving(true);
    setNoMessageIndex((prev) => (prev + 1) % noMessages.length);
  }, [noMessages.length]);

  useEffect(() => {
    if (isMoving) {
      const timer = setTimeout(() => setIsMoving(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isMoving]);

  const resetPage = () => {
    setAccepted(false);
    setNoButtonPos({ x: 0, y: 0, rotate: 0 });
    setNoMessageIndex(0);
  };

  if (accepted) {
    return (
      <div className="min-h-screen bg-[#fff5f5] flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-rose-100 rounded-full blur-[120px] opacity-60" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-pink-100 rounded-full blur-[120px] opacity-60" 
          />
        </div>

        <HeartBurst />

        {/* Top Right Reset Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ rotate: -180, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetPage}
          className="absolute top-6 right-6 z-50 p-3 bg-white/40 backdrop-blur-md rounded-full text-rose-500 shadow-lg border border-white/50 hover:bg-white transition-colors cursor-pointer"
          title="Reset Page"
        >
          <RotateCcw size={24} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-white/30 backdrop-blur-2xl p-12 md:p-20 rounded-[4rem] border border-white/50 shadow-[0_32px_64px_-16px_rgba(225,29,72,0.2)] text-center max-w-2xl w-full"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-10 relative"
          >
            <div className="absolute inset-0 bg-rose-400 blur-2xl opacity-20 animate-pulse" />
            <PartyPopper size={120} className="text-rose-500 relative z-10" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black text-rose-600 mb-6 font-sans tracking-tighter uppercase leading-none">
            YES! <br/>
            <span className="text-4xl md:text-5xl">Congratulations!</span>
          </h1>
          
          <p className="text-3xl md:text-4xl text-rose-500 font-serif font-bold mb-12 leading-relaxed">
            You just made me the happiest person alive! ❤️
          </p>
          
          <div className="flex justify-center gap-8">
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Stars className="text-amber-400" size={48} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
            >
              <Sparkles className="text-amber-400" size={48} />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating hearts background */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "vw", 
              y: "110vh",
              opacity: 0.2,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: "-10vh",
              rotate: 360
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute text-rose-300 pointer-events-none z-0"
          >
            <Heart fill="currentColor" size={32} />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5f5] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-rose-100 rounded-full blur-[100px] opacity-50" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 rounded-full blur-[100px] opacity-50" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-2xl p-12 md:p-16 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(225,29,72,0.15)] border border-white/60 text-center max-w-lg w-full relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            filter: ["drop-shadow(0 0 0px rgba(244,63,94,0))", "drop-shadow(0 0 20px rgba(244,63,94,0.4))", "drop-shadow(0 0 0px rgba(244,63,94,0))"]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-10 inline-block"
        >
          <Heart size={80} className="text-rose-500" fill="currentColor" />
        </motion.div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-rose-700 mb-10 font-serif leading-tight">
          Will u marry me?
        </h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={noMessageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-rose-500 font-black mb-10 h-6 font-sans uppercase tracking-[0.2em] text-xs"
          >
            {noMessageIndex > 0 ? noMessages[noMessageIndex] : "Waiting for your answer..."}
          </motion.p>
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(225,29,72,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAccepted(true)}
            className="px-14 py-5 bg-rose-500 text-white rounded-full text-2xl font-black shadow-xl hover:bg-rose-600 transition-all cursor-pointer min-w-[160px] font-sans uppercase tracking-[0.15em] italic"
          >
            Yes
          </motion.button>

          <motion.button
            animate={{ 
              x: noButtonPos.x, 
              y: noButtonPos.y,
              rotate: noButtonPos.rotate
            }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="px-14 py-5 bg-sky-400/20 text-sky-600 rounded-full text-2xl font-black shadow-sm backdrop-blur-md border border-sky-200/50 cursor-default min-w-[160px] font-sans uppercase tracking-[0.15em] italic"
          >
            No
          </motion.button>
        </div>
      </motion.div>

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -40, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute text-rose-200"
            style={{ 
              top: `${20 + i * 15}%`, 
              left: `${10 + (i % 3) * 30}%` 
            }}
          >
            <Heart size={40 + i * 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

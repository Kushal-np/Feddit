import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Animation Transforms
  const width = useTransform(scrollY, [0, 100], ['100%', '900px']);
  const y = useTransform(scrollY, [0, 100], [0, 24]);
  const borderRadius = useTransform(scrollY, [0, 100], [0, 50]);
  const backgroundColor = useTransform(scrollY, [0, 100], ['rgba(11, 11, 13, 0)', 'rgba(26, 20, 16, 0.85)']);
  const borderColor = useTransform(scrollY, [0, 100], ['rgba(182, 137, 56, 0)', 'rgba(182, 137, 56, 0.3)']);
  const backdropFilter = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(24px)']);
  const flashOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Logo always visible now
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-center z-[100] pointer-events-none px-4">
        <motion.nav
          className="pointer-events-auto relative flex items-center justify-between px-6 py-3.5 md:px-10 md:py-4 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ 
            width,
            y,
            borderRadius,
            backgroundColor,
            borderColor,
            backdropFilter,
            borderWidth: '1px',
            borderStyle: 'solid',
            maxWidth: '95vw'
          }}
        >
          {/* Gold Flash Animation - Subtle shimmer on scroll */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(225, 186, 115, 0.12) 50%, transparent 100%)',
              opacity: flashOpacity
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.5, 
              ease: "easeInOut",
              repeatDelay: 2
            }}
          />

          {/* Logo - ALWAYS VISIBLE with text */}
          <motion.div 
            className="relative z-10 flex items-center gap-3 shrink-0"
            style={{ scale: logoScale }}
          >
            {/* Logo Circle */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(225,186,115,0.4)]"
                 style={{
                   background: 'linear-gradient(135deg, #e1ba73, #b68938)'
                 }}>
               <span className="font-bold text-black text-lg">S</span>
            </div>
            
            {/* Logo Text - Always Visible */}
            <div className="flex items-center">
               <span className="font-bold text-white text-lg md:text-xl tracking-tight">
                 SRK<span className="text-[#e1ba73]">Task</span>
               </span>
            </div>
          </motion.div>

          {/* Desktop Links */}
          <div className="relative z-10 hidden md:flex items-center gap-8 lg:gap-10">
            {['FEATURES', 'TRUST', 'SYNERGY', 'REVIEWS'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-xs font-bold text-gray-400 hover:text-[#e1ba73] transition-colors duration-300 relative group tracking-[0.15em]"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-[#b68938] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="relative z-10 flex items-center gap-4 shrink-0">
            <button className="hidden md:block px-6 py-2.5 rounded-full bg-transparent hover:bg-[#e1ba73]/10 text-[#e1ba73] border border-[#b68938]/40 font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.02] hover:border-[#e1ba73]/60 active:scale-95 shadow-[0_0_20px_rgba(182,137,56,0.15)]">
              START EARNING
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 hover:text-[#e1ba73] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#0a0705]/98 backdrop-blur-3xl md:hidden pt-32 px-8 flex flex-col gap-6"
          >
            {['Features', 'Trust', 'Synergy', 'Reviews'].map((item, index) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-3xl font-bold text-white hover:text-[#e1ba73] transition-colors border-b border-white/5 pb-4"
              >
                {item}
              </motion.a>
            ))}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full py-5 rounded-2xl font-bold text-lg mt-4 shadow-[0_10px_40px_rgba(182,137,56,0.4)] text-black"
              style={{
                background: 'linear-gradient(135deg, #e1ba73, #b68938)'
              }}
            >
              Start Earning
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Wallet, Users, Shield, Zap, ArrowRight } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const Features = () => {
  return (
    <section id="synergy" className="py-32 px-4 relative z-10 bg-black">
      {/* Subtle background effect */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(225, 186, 115, 0.5) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Synergy of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e1ba73] via-[#b68938] to-[#e1ba73]">
              Growth
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            The perfect ecosystem loop. Creators purchase growth on{' '}
            <span className="text-white font-bold">SRK Grow</span>, which translates instantly into paid tasks for you on{' '}
            <span className="text-white font-bold">SRK Task</span>.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-auto">
          
          {/* LEFT COLUMN - Large Growth Engine Card (spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <SpotlightCard className="group hover:border-[#e1ba73]/50 transition-all duration-500 h-full">
              <div className="p-8 lg:p-12 flex flex-col h-full">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ 
                      background: 'rgba(225, 186, 115, 0.1)',
                      boxShadow: '0 0 0 1px rgba(225, 186, 115, 0.1)'
                    }}
                  >
                    <TrendingUp size={28} className="text-[#e1ba73]" strokeWidth={2} />
                  </div>
                  
                  <div className="px-4 py-1.5 rounded-full backdrop-blur-sm border"
                       style={{
                         background: 'rgba(26, 20, 16, 0.6)',
                         borderColor: 'rgba(182, 137, 56, 0.3)'
                       }}>
                    <span className="text-xs font-bold text-[#e1ba73] tracking-[0.15em] uppercase">
                      Ecosystem Core
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-auto group-hover:text-[#e1ba73] transition-colors duration-300">
                  The Growth Engine
                </h3>

                {/* Flow Cards - Positioned at bottom */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mt-12">
                  {/* Source Card */}
                  <div className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:border-[#e1ba73]/40"
                       style={{
                         background: 'rgba(26, 20, 16, 0.5)',
                         borderColor: 'rgba(182, 137, 56, 0.25)'
                       }}>
                    <div className="text-xs font-bold text-[#b68938] tracking-[0.15em] uppercase mb-3">
                      Source
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">SRK Grow</h4>
                    <p className="text-sm text-gray-400 font-medium">Creators buy engagement</p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex justify-center">
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={32} className="text-[#e1ba73]" strokeWidth={2.5} />
                    </motion.div>
                  </div>

                  {/* Arrow for mobile */}
                  <div className="md:hidden flex justify-center -my-2">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={32} className="text-[#e1ba73] rotate-90" strokeWidth={2.5} />
                    </motion.div>
                  </div>

                  {/* Destination Card */}
                  <div className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:border-[#e1ba73]/50"
                       style={{
                         background: 'rgba(42, 32, 20, 0.5)',
                         borderColor: 'rgba(225, 186, 115, 0.35)'
                       }}>
                    <div className="text-xs font-bold text-[#e1ba73] tracking-[0.15em] uppercase mb-3">
                      Destination
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">SRK Task</h4>
                    <p className="text-sm text-[#e1ba73] font-medium">You get paid instantly</p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* RIGHT COLUMN TOP - 500+ Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:row-span-1"
          >
            <SpotlightCard className="group hover:border-[#e1ba73]/50 transition-all duration-500 h-full">
              <div className="p-8 flex flex-col h-full">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    background: 'rgba(225, 186, 115, 0.1)',
                    boxShadow: '0 0 0 1px rgba(225, 186, 115, 0.1)'
                  }}
                >
                  <Target size={26} className="text-[#e1ba73]" strokeWidth={2} />
                </div>

                <div className="text-5xl font-bold text-white mb-3 group-hover:text-[#e1ba73] transition-colors">
                  500+
                </div>

                <p className="text-sm text-gray-400 font-medium mb-auto">
                  Active Tasks Available Now
                </p>

                <div className="mt-6 pt-4 border-t border-[#b68938]/20">
                  <div className="h-[2px] w-12 bg-[#b68938]/30 group-hover:w-full group-hover:bg-[#e1ba73] transition-all duration-700 ease-out" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* RIGHT COLUMN BOTTOM - ₹10L+ Payouts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:row-span-1"
          >
            <SpotlightCard className="group hover:border-[#e1ba73]/50 transition-all duration-500 h-full">
              <div className="p-8 flex flex-col h-full">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    background: 'rgba(225, 186, 115, 0.1)',
                    boxShadow: '0 0 0 1px rgba(225, 186, 115, 0.1)'
                  }}
                >
                  <Wallet size={26} className="text-[#e1ba73]" strokeWidth={2} />
                </div>

                <div className="text-5xl font-bold text-white mb-3 group-hover:text-[#e1ba73] transition-colors">
                  ₹10L+
                </div>

                <p className="text-sm text-gray-400 font-medium mb-auto">
                  Total Payouts Processed
                </p>

                <div className="mt-6 pt-4 border-t border-[#b68938]/20">
                  <div className="h-[2px] w-12 bg-[#b68938]/30 group-hover:w-full group-hover:bg-[#e1ba73] transition-all duration-700 ease-out" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* BOTTOM ROW - 3 Equal Cards */}
          
          {/* 50K+ Users with Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <SpotlightCard className="group hover:border-[#e1ba73]/50 transition-all duration-500 h-full">
              <div className="p-8 flex flex-col h-full">
                <div className="flex -space-x-3 mb-6">
                  {[1, 2, 3, 4].map((n) => (
                    <div 
                      key={n}
                      className="w-11 h-11 rounded-full border-2 flex items-center justify-center relative z-0 hover:z-10 hover:scale-110 transition-transform"
                      style={{
                        background: 'rgba(26, 20, 16, 0.8)',
                        borderColor: '#0a0705'
                      }}
                    >
                      <Users size={18} className="text-[#b68938]" />
                    </div>
                  ))}
                </div>

                <div className="text-5xl font-bold text-white mb-3 group-hover:text-[#e1ba73] transition-colors">
                  50K+
                </div>

                <p className="text-sm text-gray-400 font-medium mb-auto">
                  Happy Users Globally
                </p>

                <div className="mt-6 pt-4 border-t border-[#b68938]/20">
                  <div className="h-[2px] w-12 bg-[#b68938]/30 group-hover:w-full group-hover:bg-[#e1ba73] transition-all duration-700 ease-out" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Verified Trust */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <SpotlightCard className="group hover:border-[#e1ba73]/50 transition-all duration-500 h-full">
              <div className="p-8 flex flex-col h-full">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    background: 'rgba(225, 186, 115, 0.1)',
                    boxShadow: '0 0 0 1px rgba(225, 186, 115, 0.1)'
                  }}
                >
                  <Shield size={26} className="text-[#e1ba73]" strokeWidth={2} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e1ba73] transition-colors">
                  Verified Trust
                </h3>

                <p className="text-sm text-gray-400 font-medium mb-auto">
                  KYC & Manual Verification
                </p>

                <div className="mt-6 pt-4 border-t border-[#b68938]/20">
                  <div className="h-[2px] w-12 bg-[#b68938]/30 group-hover:w-full group-hover:bg-[#e1ba73] transition-all duration-700 ease-out" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Lightning Fast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-1"
          >
            <SpotlightCard className="group hover:border-[#e1ba73]/50 transition-all duration-500 h-full">
              <div className="p-8 flex flex-col h-full">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    background: 'rgba(225, 186, 115, 0.1)',
                    boxShadow: '0 0 0 1px rgba(225, 186, 115, 0.1)'
                  }}
                >
                  <Zap size={26} className="text-[#e1ba73]" strokeWidth={2} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e1ba73] transition-colors">
                  Lightning Fast
                </h3>

                <p className="text-sm text-gray-400 font-medium mb-auto">
                  Real-time task tracking
                </p>

                <div className="mt-6 pt-4 border-t border-[#b68938]/20">
                  <div className="h-[2px] w-12 bg-[#b68938]/30 group-hover:w-full group-hover:bg-[#e1ba73] transition-all duration-700 ease-out" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
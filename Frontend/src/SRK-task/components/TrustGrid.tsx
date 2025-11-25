import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Fingerprint, 
  ShieldCheck, 
  Globe, 
  Zap, 
  BarChart3 
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

const features = [
  {
    icon: Bot,
    title: "Zero Bot Tolerance",
    desc: "Our proprietary AI filters reject 99.9% of automated traffic. Only real humans, real engagement.",
    color: "#e1ba73"
  },
  {
    icon: Fingerprint,
    title: "100% Verified Identities",
    desc: "Every earner passes mandatory KYC verification via the SRK University portal.",
    color: "#e1ba73"
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    desc: "256-bit encryption and secure escrow systems protect every transaction.",
    color: "#e1ba73"
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    desc: "No waiting periods. Earnings are credited to your wallet in milliseconds.",
    color: "#e1ba73"
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Access a diverse network of active users from 120+ countries ready to engage.",
    color: "#e1ba73"
  },
  {
    icon: BarChart3,
    title: "Transparent Analytics",
    desc: "Real-time tracking of every click, follow, and interaction with granular reporting.",
    color: "#e1ba73"
  }
];

export const TrustGrid = () => {
  return (
    <section id="trust" className="py-32 px-4 relative z-10 bg-black">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(225, 186, 115, 0.4) 1px, transparent 1px)', 
             backgroundSize: '32px 32px' 
           }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8 px-6 py-2.5 rounded-full border backdrop-blur-sm"
            style={{
              background: 'rgba(26, 20, 16, 0.6)',
              borderColor: 'rgba(182, 137, 56, 0.3)'
            }}
          >
            <span className="text-xs font-bold text-[#e1ba73] tracking-[0.2em] uppercase">
              The SRK Standard
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Uncompromising{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e1ba73] via-[#b68938] to-[#e1ba73]">
              Quality
            </span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            We don't just connect you; we protect the integrity of every interaction. Built on a foundation of trust and technology.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <SpotlightCard 
                className="h-full group hover:border-[#e1ba73]/50 transition-all duration-500"
              >
                <div className="p-8 lg:p-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ 
                      background: 'rgba(225, 186, 115, 0.1)',
                      boxShadow: '0 0 0 1px rgba(225, 186, 115, 0.1)'
                    }}
                  >
                    <feature.icon 
                      size={28} 
                      className="text-[#e1ba73] transition-transform duration-500 group-hover:scale-110" 
                      strokeWidth={2}
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-[#e1ba73] transition-colors duration-300 leading-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm lg:text-base leading-relaxed font-medium mb-6">
                    {feature.desc}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className="mt-auto pt-6">
                    <div 
                      className="h-[2px] w-12 bg-[#b68938]/30 group-hover:w-full group-hover:bg-[#e1ba73] transition-all duration-700 ease-out"
                      style={{
                        boxShadow: '0 0 8px rgba(225, 186, 115, 0)'
                      }}
                    />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Optional: Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-6 rounded-2xl backdrop-blur-sm border"
               style={{
                 background: 'rgba(26, 20, 16, 0.3)',
                 borderColor: 'rgba(182, 137, 56, 0.2)'
               }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#e1ba73] mb-1">99.9%</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Bot Detection</div>
            </div>
            <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-[#b68938]/30 to-transparent" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#e1ba73] mb-1">100%</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">KYC Verified</div>
            </div>
            <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-[#b68938]/30 to-transparent" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#e1ba73] mb-1">256-bit</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Encryption</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
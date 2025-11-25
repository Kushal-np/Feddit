import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Shield, Target, Coins } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

export const Hero = () => {
  const { scrollY } = useScroll();

  const steps = [
    { title: "Connect", desc: "Link SRK University Account", icon: Users },
    { title: "Verify", desc: "Complete KYC Process", icon: Shield },
    { title: "Task", desc: "Follow & Engage", icon: Target },
    { title: "Earn", desc: "Instant Wallet Credit", icon: Coins }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-[#0a0705] to-black" />
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(182, 137, 56, 0.2), transparent 60%)' }} 
      />
      {/* Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(182, 137, 56, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(182, 137, 56, 0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
           {/* Badge - FIXED STYLING */}
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl border mx-auto lg:mx-0"
              style={{
                  background: 'rgba(26, 20, 16, 0.6)',
                  borderColor: 'rgba(182, 137, 56, 0.4)',
                  boxShadow: '0 4px 16px rgba(182, 137, 56, 0.15)'
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e1ba73] animate-pulse" />
              <span className="text-xs font-bold text-[#e1ba73] tracking-widest uppercase">
                Welcome to SRK Task Portal
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#e1ba73] animate-pulse" />
            </motion.div>

            {/* Headline - FIXED WITH TWO LINES */}
            <div className="relative">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
                >
                  {/* First Line - White */}
                  <span className="block text-white mb-3">
                    Earn Through
                  </span>
                  
                  {/* Second Line - GOLD GRADIENT */}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e1ba73] via-[#b68938] to-[#e1ba73]" 
                        style={{
                          backgroundSize: '200% auto',
                          animation: 'gradient 3s ease infinite'
                        }}>
                    Tasks
                  </span>
                </motion.h1>
            </div>

            {/* Subtext - FIXED STYLING */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Join thousands completing simple tasks.
                <br />
                Multiple schemes coming soon.
              </p>
              <p className="text-lg md:text-xl text-[#b68938] max-w-lg mx-auto lg:mx-0 leading-relaxed font-semibold">
                Start your journey with SRK Group.
              </p>
            </motion.div>

            {/* Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <MagneticButton className="shadow-[0_0_30px_rgba(225,186,115,0.3)]">
                Join Now & Start Earning <ArrowRight size={20} className="ml-2" />
              </MagneticButton>
            </motion.div>

            {/* Trust Indicators - FIXED STYLING */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-6 pt-8 border-t border-white/5"
            >
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div 
                          key={i} 
                          className="w-11 h-11 rounded-full border-2 border-[#0a0705] flex items-center justify-center text-[#b68938] relative z-0 hover:z-10 hover:scale-110 transition-transform bg-[#1a1410]"
                        >
                           <Users size={18} />
                        </div>
                    ))}
                </div>
                <div className="text-left">
                    <div className="text-white font-bold text-base">50K+ Active Members</div>
                    <div className="text-sm text-[#b68938] font-semibold">Verified by SRK University</div>
                </div>
            </motion.div>
        </div>

        {/* Right Content - Process Steps */}
        <div className="relative hidden lg:block h-[600px] pl-10">
            <motion.div 
               className="absolute left-[39px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#b68938]/40 to-transparent"
               initial={{ scaleY: 0 }}
               animate={{ scaleY: 1 }}
               transition={{ duration: 1.5 }}
            />
            
            <div className="flex flex-col justify-between h-full py-8">
                {steps.map((step, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: 50 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 0.5 + i * 0.2 }}
                       className="relative group pl-16"
                    >
                        {/* Node */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-[#0a0705] border-2 border-[#e1ba73] z-10 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_15px_rgba(225,186,115,0.5)]" />
                            <div className="absolute w-8 h-[1px] bg-[#b68938]/30 right-1/2 top-1/2" />
                        </div>
                        
                        {/* Card */}
                        <div 
                          className="backdrop-blur-sm p-6 rounded-2xl w-full max-w-md transition-all duration-500 hover:scale-105"
                          style={{
                              background: 'rgba(26, 20, 16, 0.6)',
                              border: '1px solid rgba(182, 137, 56, 0.3)',
                          }}
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-3.5 rounded-xl bg-[#b68938]/10 text-[#e1ba73] group-hover:bg-[#e1ba73] group-hover:text-black transition-colors duration-300">
                                    <step.icon size={22} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg group-hover:text-[#e1ba73] transition-colors">{step.title}</h4>
                                    <p className="text-sm text-gray-500 font-medium">{step.desc}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>

      {/* Add gradient animation keyframes to your global CSS */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};
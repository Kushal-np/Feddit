import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Zap, Users, Award, TrendingUp, Lock, Smartphone, Eye, Star, ChevronRight, Play, X } from 'lucide-react';

// Enhanced easing curves
const easing = {
  smooth: [0.2, 0.8, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  elastic: [0.68, -0.55, 0.265, 1.55]
};

// Magnetic button component with advanced interactions
function MagneticButton({ children, variant = 'primary', className = '', onClick, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const baseClasses = variant === 'primary'
    ? 'bg-[#D4AF37] text-[#0B0B0D] hover:bg-[#B8941F] rounded-lg'
    : 'border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/80 rounded-lg';

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative px-8 py-4 font-bold overflow-hidden ${baseClasses} ${className}`}
      {...props}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={isHovered ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0.5 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '200%' } : { x: '-100%' }}
        transition={{ duration: 0.8, ease: easing.smooth }}
      />
      
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
}

// Parallax card component
function ParallaxCard({ children, className = '', index = 0 }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easing.smooth }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated counter
function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Main component
export default function PageDoesntExist() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setCursorPosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const howItWorks = [
    {
      step: '01',
      title: 'Enter SRK University Task Panel',
      desc: 'Access the task section from your SRK University dashboard',
      details: 'Log into your verified SRK University account and navigate to the dedicated Task Panel. Your account status and verification level determine available tasks.'
    },
    {
      step: '02',
      title: 'Verification & Access SRKTask.com',
      desc: 'Complete verification to unlock the task marketplace',
      details: 'Complete KYC verification including ID proof and mobile verification. This ensures genuine users and protects both creators and task-doers.'
    },
    {
      step: '03',
      title: 'Choose Tasks',
      desc: 'Select from verified follow requests generated by SRKGrow packages',
      details: 'Browse available tasks filtered by reward amount, platform, and time requirement. Each task shows clear instructions and expected completion time.'
    },
    {
      step: '04',
      title: 'Earn Rewards Instantly',
      desc: 'Complete tasks and receive instant payments to your wallet',
      details: 'Submit proof of completion. Our automated system verifies within seconds and credits rewards directly to your SRK wallet for immediate withdrawal.'
    }
  ];

  const features = [
    { icon: Shield, title: 'Verified Task System', desc: 'Every task is verified and authenticated through SRK University', stat: '99.9%' },
    { icon: Zap, title: 'Instant Rewards', desc: 'Receive payments immediately after task completion', stat: '<30s' },
    { icon: Lock, title: 'Anti-Bot System', desc: 'Advanced verification ensures genuine user engagement', stat: '100%' },
    { icon: Users, title: 'SRK Ecosystem Integration', desc: 'Seamlessly connected with SRK University and SRKGrow', stat: '3 platforms' },
    { icon: Eye, title: 'Task Transparency', desc: 'Complete visibility into task requirements and rewards', stat: 'Full' },
    { icon: Smartphone, title: 'Mobile Friendly', desc: 'Complete tasks anywhere with full mobile optimization', stat: '24/7' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Student, Mumbai',
      text: 'Earned ₹15,000 in my first month completing simple follow tasks. The instant payment system is incredible.',
      avatar: 'RK',
      rating: 5,
      tasks: 142
    },
    {
      name: 'Priya Sharma',
      role: 'Freelancer, Delhi',
      text: 'SRKTask provides consistent earning opportunities. The verification system makes it trustworthy.',
      avatar: 'PS',
      rating: 5,
      tasks: 298
    },
    {
      name: 'Amit Patel',
      role: 'Professional, Bangalore',
      text: 'Perfect side income platform. Clean interface and reliable payments every time.',
      avatar: 'AP',
      rating: 5,
      tasks: 187
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F2F2F2] font-['Inter',sans-serif] overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#D4AF37] origin-left z-[100]"
        style={{ scaleX: smoothProgress }}
      />

      {/* Custom cursor glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-[60] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          x: cursorPosition.x - 192,
          y: cursorPosition.y - 192
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: easing.smooth }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-[#0B0B0D]/95 backdrop-blur-xl border-b border-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="w-12 h-12 bg-[#D4AF37] rounded-md flex items-center justify-center font-bold text-[#0B0B0D] text-base relative overflow-hidden group cursor-pointer">
              <motion.div
                className="absolute inset-0 bg-[#B8941F]"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">SRK</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">Task</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-3 text-sm font-semibold">
            {['How It Works', 'Features', 'SRK University', 'SRK Grow'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                className="relative px-4 py-2.5 text-[#A5A5A5] hover:text-[#F2F2F2] transition-all duration-300 rounded-lg border border-[#D4AF37]/0 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <MagneticButton className="rounded-lg">
            <span>Start Earning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </MagneticButton>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37] opacity-[0.03] blur-[120px] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-1.5 border border-[#D4AF37]/20 text-xs font-medium text-[#D4AF37] tracking-wide relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-[#D4AF37]/10"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">POWERED BY SRK UNIVERSITY</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easing.smooth }}
                className="text-[56px] leading-[1.1] font-black tracking-tight"
              >
                Earn Rewards by<br />
                <span className="relative inline-block">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Completing Social Tasks
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[18px] leading-relaxed text-[#A5A5A5] max-w-[540px]"
              >
                SRKTask connects users from SRK University to a verified task-based reward ecosystem. Complete follows, tasks, and earn instantly.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <MagneticButton className="rounded-xl">
                  <span>Start Earning Tasks</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </MagneticButton>
                
                <MagneticButton variant="secondary" className="rounded-xl">
                  <Play className="w-4 h-4" />
                  <span>How It Works</span>
                </MagneticButton>
              </motion.div>

              {/* Animated Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-3 gap-8 pt-12 border-t border-[#D4AF37]/10"
              >
                {[
                  { value: 50, suffix: 'K+', label: 'Active Users' },
                  { value: 2, suffix: 'M+', label: 'Tasks Completed' },
                  { value: 10, suffix: 'L+', label: 'Total Earned', prefix: '₹' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-3xl font-semibold text-[#D4AF37]">
                      {stat.prefix}<AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-[#A5A5A5] mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right - Enhanced Flow Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-[500px]">
                <div className="space-y-6">
                  {[
                    { label: 'SRK University', icon: Users, active: false },
                    { label: 'Verification', icon: Shield, active: false },
                    { label: 'SRKTask', icon: CheckCircle, active: true },
                    { label: 'Rewards', icon: Award, active: false }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                      className="relative"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, x: 8 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`relative bg-[#111113] border ${
                          item.active ? 'border-[#D4AF37]/40' : 'border-[#D4AF37]/10'
                        } p-6 transition-all duration-500 group cursor-pointer rounded-xl overflow-hidden`}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {item.active && (
                          <>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                              className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-xl"
                              animate={{ 
                                boxShadow: [
                                  '0 0 20px rgba(212,175,55,0.2)',
                                  '0 0 40px rgba(212,175,55,0.4)',
                                  '0 0 20px rgba(212,175,55,0.2)'
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </>
                        )}
                        <div className="relative flex items-center space-x-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`w-12 h-12 ${
                              item.active ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/10'
                            } flex items-center justify-center transition-all duration-300 group-hover:bg-[#D4AF37]`}
                          >
                            <item.icon
                              className={`w-6 h-6 ${
                                item.active ? 'text-[#0B0B0D]' : 'text-[#D4AF37]'
                              } transition-colors group-hover:text-[#0B0B0D]`}
                            />
                          </motion.div>
                          <div className="flex-1">
                            <div
                              className={`font-semibold ${
                                item.active ? 'text-[#D4AF37]' : 'text-[#F2F2F2]'
                              } transition-colors`}
                            >
                              {item.label}
                            </div>
                            <div className="text-sm text-[#A5A5A5] mt-0.5">Step {idx + 1}</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#D4AF37]/40 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                        </div>
                      </motion.div>
                      {idx < 3 && (
                        <motion.div
                          className="absolute left-6 top-full w-[2px] h-6 bg-gradient-to-b from-[#D4AF37]/40 to-transparent"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section id="how-it-works" className="py-32 px-8 bg-[#111113] relative overflow-hidden">
        {/* Animated mesh gradient background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Dynamic grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]/10 blur-3xl"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black mb-4 tracking-tight">How SRK Task Works</h2>
            <p className="text-lg text-[#A5A5A5] max-w-[600px] mx-auto font-medium">
              Four simple steps to start earning rewards through verified social tasks
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, idx) => (
              <ParallaxCard key={idx} index={idx} className="h-full">
                <motion.div
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setActiveModal(idx)}
                  whileHover={{ y: -6 }}
                  className="group relative bg-[#0B0B0D] border border-[#D4AF37]/10 p-8 h-full transition-all duration-300 hover:border-[#D4AF37]/60 cursor-pointer rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: hoveredCard === idx ? '0 8px 32px rgba(212, 175, 55, 0.15), 0 0 60px rgba(212, 175, 55, 0.1)' : 'none'
                  }}
                >
                  <motion.div
                    className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/60 to-transparent rounded-l-2xl"
                    initial={{ scaleY: 0.15, opacity: 0.15 }}
                    animate={{
                      scaleY: hoveredCard === idx ? 1 : 0.15,
                      opacity: hoveredCard === idx ? 1 : 0.15
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Enhanced glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === idx ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative">
                    <motion.div
                      className="text-6xl font-black text-[#D4AF37]/20 mb-6"
                      animate={{
                        scale: hoveredCard === idx ? 1.1 : 1,
                        color: hoveredCard === idx ? 'rgba(212, 175, 55, 0.35)' : 'rgba(212, 175, 55, 0.2)'
                      }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#A5A5A5] text-sm leading-relaxed font-medium">{item.desc}</p>
                    
                    <motion.div
                      className="mt-4 text-xs font-bold text-[#D4AF37] flex items-center space-x-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === idx ? 1 : 0 }}
                    >
                      <span>Learn more</span>
                      <ChevronRight className="w-3 h-3" />
                    </motion.div>
                  </div>
                </motion.div>
              </ParallaxCard>
            ))}
          </div>
        </div>

        {/* Modal for step details */}
        <AnimatePresence>
          {activeModal !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-8"
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111113] border border-[#D4AF37]/20 p-10 max-w-lg w-full relative"
              >
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 text-[#A5A5A5] hover:text-[#D4AF37] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="text-4xl font-bold text-[#D4AF37]/30 mb-4">
                  {howItWorks[activeModal].step}
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {howItWorks[activeModal].title}
                </h3>
                <p className="text-[#A5A5A5] leading-relaxed">
                  {howItWorks[activeModal].details}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SRK Grow Connection - Enhanced */}
      <section className="py-32 px-8 relative overflow-hidden">
        {/* Cursor-reactive spotlight */}
        <motion.div
          className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[5]"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
            x: cursorPosition.x - 300,
            y: cursorPosition.y - 300,
            filter: 'blur(40px)'
          }}
        />
        
        {/* Animated gradient orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 40}px`,
              height: `${150 + i * 40}px`,
              left: `${15 + i * 20}%`,
              top: `${30 + (i % 2) * 30}%`,
              background: `radial-gradient(circle, rgba(212,175,55,${0.1 - i * 0.02}) 0%, transparent 70%)`,
              filter: 'blur(60px)'
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Particle field */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4 tracking-tight">Connection with SRK Grow</h2>
            <p className="text-lg text-[#A5A5A5] max-w-[700px] mx-auto font-medium">
              Creators and businesses choose follower packages from SRKGrow.com. These packages generate follow tasks for users inside SRKTask.
            </p>
          </motion.div>

          <div className="relative max-w-[900px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ParallaxCard index={0}>
                <div className="relative bg-[#111113] border border-[#D4AF37]/15 p-10 group hover:border-[#D4AF37]/40 transition-all duration-300 h-full rounded-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Enhanced glow on hover */}
                  <motion.div
                    className="absolute -inset-20 bg-[#D4AF37]/10 blur-3xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300"
                    >
                      <TrendingUp className="w-7 h-7 text-[#D4AF37] group-hover:text-[#0B0B0D] transition-colors" />
                    </motion.div>
                    <h3 className="text-2xl font-black mb-3">SRK Grow</h3>
                    <p className="text-[#A5A5A5] font-medium">Packages selected by creators</p>
                    <motion.div
                      className="mt-6 flex items-center space-x-2 text-sm text-[#D4AF37] font-bold"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span>Visit SRKGrow</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </ParallaxCard>

              <ParallaxCard index={1}>
                <div className="relative bg-[#111113] border border-[#D4AF37]/15 p-10 group hover:border-[#D4AF37]/40 transition-all duration-300 h-full rounded-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Enhanced glow on hover */}
                  <motion.div
                    className="absolute -inset-20 bg-[#D4AF37]/10 blur-3xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300"
                    >
                      <Users className="w-7 h-7 text-[#D4AF37] group-hover:text-[#0B0B0D] transition-colors" />
                    </motion.div>
                    <h3 className="text-2xl font-black mb-3">SRK Task</h3>
                    <p className="text-[#A5A5A5] font-medium">Tasks completed by users</p>
                    <motion.div
                      className="mt-6 flex items-center space-x-2 text-sm text-[#D4AF37] font-bold"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span>Start Earning</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </ParallaxCard>
            </div>
            
            {/* Enhanced Connection Line with Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <motion.div className="relative w-16 h-[2px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/60 via-[#D4AF37] to-[#D4AF37]/60" />
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/50"
                  animate={{ x: [0, 48, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Enhanced Grid */}
      <section id="features" className="py-32 px-8 bg-[#111113]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-semibold mb-4 tracking-tight">Why SRK Task?</h2>
            <p className="text-lg text-[#A5A5A5]">Built on trust, transparency, and verified engagement</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <ParallaxCard key={idx} index={idx}>
                <div className="group relative bg-[#0B0B0D] border border-[#D4AF37]/10 p-8 h-full transition-all duration-300 hover:border-[#D4AF37] overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 w-[2px] h-full bg-[#D4AF37]"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originY: 0 }}
                  />
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-[#D4AF37]/5 blur-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, ease: easing.smooth }}
                        className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors duration-300"
                      >
                        <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1"
                      >
                        {feature.stat}
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[#A5A5A5] text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced Carousel */}
      <section className="py-32 px-8 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/5 via-transparent to-transparent opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-semibold mb-4 tracking-tight">Trusted by Thousands</h2>
            <p className="text-lg text-[#A5A5A5]">Real stories from our community</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <ParallaxCard key={idx} index={idx}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative bg-[#111113]/80 backdrop-blur-sm border border-[#D4AF37]/10 p-8 h-full transition-all duration-300 hover:border-[#D4AF37]/40"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <div className="relative">
                    {/* Rating stars */}
                    <div className="flex space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 + i * 0.05 }}
                        >
                          <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <p className="text-[#A5A5A5] leading-relaxed mb-6">{testimonial.text}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-[#D4AF37]/10">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-12 h-12 bg-[#D4AF37]/20 flex items-center justify-center font-semibold text-[#D4AF37] border border-[#D4AF37]/30"
                        >
                          {testimonial.avatar}
                        </motion.div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-[#A5A5A5]">{testimonial.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#D4AF37]">{testimonial.tasks}</div>
                        <div className="text-xs text-[#A5A5A5]">tasks</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Preview - Enhanced 3D Effect */}
      <section className="py-32 px-8 bg-[#111113]">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-semibold mb-4 tracking-tight">Available Everywhere</h2>
            <p className="text-lg text-[#A5A5A5] mb-16">Complete tasks seamlessly on any device</p>
          </motion.div>
          
          <div className="relative flex justify-center items-end space-x-6">
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: easing.smooth }}
                whileHover={{ 
                  y: idx === 1 ? -10 : idx === 0 ? 10 : 10,
                  scale: 1.05
                }}
                className="relative"
                style={{
                  transform: `translateY(${idx === 1 ? 0 : idx === 0 ? '20px' : '20px'})`
                }}
              >
                <div className="w-64 bg-[#0B0B0D] border-8 border-[#1a1a1c] rounded-[2.5rem] p-4 shadow-2xl">
                  <div className="bg-[#111113] rounded-[1.5rem] h-[480px] p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-sm font-semibold">SRK Task</div>
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 bg-[#D4AF37] flex items-center justify-center text-[#0B0B0D] text-xs font-bold"
                      >
                        S
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + i * 0.1 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                          className="bg-[#0B0B0D] border border-[#D4AF37]/20 p-4 rounded-lg cursor-pointer hover:border-[#D4AF37]/40 transition-all"
                        >
                          <div className="text-xs text-[#A5A5A5] mb-1">Task #{i}</div>
                          <div className="text-sm font-medium mb-2">Follow @creator{i}</div>
                          <div className="text-xs text-[#D4AF37]">₹{25 + i * 5}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                {idx === 1 && (
                  <motion.div
                    className="absolute -inset-4 bg-[#D4AF37] opacity-10 blur-3xl -z-10 rounded-full"
                    animate={{
                      opacity: [0.1, 0.15, 0.1],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-32 px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#111113] border border-[#D4AF37]/20 p-16 text-center overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            
            {/* Ambient particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
            
            <div className="relative z-10 space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-semibold tracking-tight"
              >
                Start Completing Tasks Inside<br />SRK University and Earn Instantly
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <MagneticButton className="text-base">
                  <span>Start Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </MagneticButton>
                
                <MagneticButton variant="secondary" className="text-base">
                  <span>Learn More About SRK</span>
                </MagneticButton>
              </motion.div>
              
              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 pt-8"
              >
                {['KYC Verified', 'Secure Payouts', '24/7 Support'].map((badge, i) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 text-sm text-[#A5A5A5]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                    <span>{badge}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-[#000] py-16 px-8 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-9 h-9 bg-[#D4AF37] flex items-center justify-center font-bold text-[#000] text-sm"
                >
                  SRK
                </motion.div>
                <span className="text-lg font-semibold">Task</span>
              </div>
              <p className="text-[#A5A5A5] text-sm">
                Part of the SRK ecosystem. Empowering users through verified task completion.
              </p>
            </motion.div>
            
            {[
              {
                title: 'Ecosystem',
                links: [
                  { name: 'SRK University', href: 'https://thesrkuniversity.com' },
                  { name: 'SRK Task', href: 'https://srktask.com' },
                  { name: 'SRK Grow', href: 'https://srkgrow.com' }
                ]
              },
              {
                title: 'Resources',
                links: [
                  { name: 'How It Works', href: '#' },
                  { name: 'Features', href: '#' },
                  { name: 'Support', href: '#' }
                ]
              },
              {
                title: 'Legal',
                links: [
                  { name: 'Privacy Policy', href: '#' },
                  { name: 'Terms of Service', href: '#' },
                  { name: 'Contact', href: '#' }
                ]
              }
            ].map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (idx + 1) }}
              >
                <h4 className="font-semibold mb-4 text-sm">{section.title}</h4>
                <ul className="space-y-3 text-sm text-[#A5A5A5]">
                  {section.links.map((link) => (
                    <motion.li key={link.name} whileHover={{ x: 5 }}>
                      <a href={link.href} className="hover:text-[#D4AF37] transition-colors inline-flex items-center space-x-1">
                        <span>{link.name}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-[#D4AF37]/10 text-center text-sm text-[#A5A5A5]"
          >
            © 2024 SRK Task. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
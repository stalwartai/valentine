import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, Gift, Brain, ArrowRight, Lock, Zap, Quote, MessageCircleHeart, Star, Clock, Shield, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Floating Hearts Component - Soft Pink
const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%",
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            y: "-10%",
            opacity: [0, 0.5, 0.7, 0.5, 0],
            rotate: [0, 10, -8, 12, 0],
            scale: [0.5, 0.9, 0.7, 0.9, 0.5]
          }}
          transition={{ 
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          style={{ left: `${5 + i * 10}%` }}
        >
          <Heart 
            className={`${
              i % 3 === 0 ? "w-6 h-6 text-[#E75480] fill-[#E75480]" : 
              i % 3 === 1 ? "w-4 h-4 text-[#FF8FA3] fill-[#FF8FA3]" : 
              "w-5 h-5 text-[#FFB3C1] fill-[#FFB3C1]"
            }`}
            style={{ opacity: 0.4 + Math.random() * 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Animated Section with Scroll Reveal
const ScrollReveal = ({ children, className = "", direction = "up", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const variants = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Real-Time Countdown Clock Component
const CountdownClock = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const valentinesDay = new Date('2026-02-14T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = valentinesDay - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="inline-flex flex-col items-center gap-3 mb-6"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#E75480]/20 shadow-sm">
        <Clock className="w-4 h-4 text-[#E75480]" />
        <span className="text-sm font-medium text-[#3D3D3D]">
          Valentine's Day 2026
        </span>
        <Heart className="w-4 h-4 text-[#E75480] fill-[#E75480] animate-heartbeat" />
      </div>
      
      {/* Real-time countdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[52px] shadow-sm border border-[#FFB3C1]/30">
          <span className="text-xl sm:text-2xl font-bold text-[#E75480]">{timeLeft.days}</span>
          <span className="text-[10px] text-[#888] uppercase tracking-wider">Days</span>
        </div>
        <span className="text-[#E75480] font-bold text-lg">:</span>
        <div className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[52px] shadow-sm border border-[#FFB3C1]/30">
          <span className="text-xl sm:text-2xl font-bold text-[#E75480]">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[10px] text-[#888] uppercase tracking-wider">Hours</span>
        </div>
        <span className="text-[#E75480] font-bold text-lg">:</span>
        <div className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[52px] shadow-sm border border-[#FFB3C1]/30">
          <span className="text-xl sm:text-2xl font-bold text-[#E75480]">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[10px] text-[#888] uppercase tracking-wider">Mins</span>
        </div>
        <span className="text-[#E75480] font-bold text-lg">:</span>
        <div className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[52px] shadow-sm border border-[#FFB3C1]/30">
          <motion.span 
            key={timeLeft.seconds}
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xl sm:text-2xl font-bold text-[#E75480]"
          >
            {String(timeLeft.seconds).padStart(2, '0')}
          </motion.span>
          <span className="text-[10px] text-[#888] uppercase tracking-wider">Secs</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function NewLandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] overflow-x-hidden">
      
      {/* ===== SECTION 1: HERO ===== */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        data-testid="hero-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        {/* Soft Pink Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFE8ED] via-[#FFF0F3] to-[#FFF5F7]" />
        
        {/* Decorative Soft Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFB3C1]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-[#E75480]/10 rounded-full blur-3xl" />
        
        {/* Floating Hearts Animation */}
        <FloatingHearts />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-4 sm:space-y-5"
          >
            {/* Real-Time Countdown Clock */}
            <CountdownClock />
            
            {/* Main Headline */}
            <h1 
              data-testid="hero-headline"
              className="font-heading font-bold text-[#3D3D3D] leading-tight"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}
            >
              Turn Your Memories Into{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#E75480] via-[#FF8FA3] to-[#FFB3C1] bg-clip-text text-transparent">
                The Perfect Gift
              </span>{" "}
              <motion.span 
                className="inline-block"
                animate={{ scale: [1, 1.1, 1, 1.12, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="inline w-8 h-8 sm:w-10 sm:h-10 text-[#E75480] fill-[#E75480]" />
              </motion.span>
            </h1>
            
            {/* Subheadline */}
            <p 
              data-testid="hero-subheadline"
              className="text-base sm:text-lg text-[#555] font-body max-w-2xl mx-auto leading-relaxed px-4"
            >
              Share a special moment. Get <strong className="text-[#E75480]">4 personalized gift ideas</strong>
              <br className="hidden sm:block" />
              that truly honor your relationship.
            </p>
            
            <p className="text-sm text-[#777] font-body">
              Human intuition meets AI emotional intelligence.
            </p>
            
            {/* CTA Button - Soft Rose */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="pt-3"
            >
              <Button
                data-testid="hero-cta-btn"
                onClick={() => navigate('/form')}
                className="bg-gradient-to-r from-[#E75480] to-[#FF8FA3] hover:from-[#D14570] hover:to-[#E75480] text-white rounded-full px-10 sm:px-12 py-6 sm:py-7 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                Find The Perfect Gift
                <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              data-testid="hero-trust-badges"
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs sm:text-sm text-[#666]"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E75480]" />
                <span>Takes 3 minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#FF8FA3] fill-[#FF8FA3]" />
                <span>Personalized for you</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-[#E75480]" />
                <span>100% Free</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Visual Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 sm:mt-12 relative max-w-sm mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-[#FFB3C1]/30 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E75480] to-[#FF8FA3] flex items-center justify-center shadow-md">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-[#999] font-body uppercase tracking-wider">AI Gift Suggestion</p>
                  <p className="font-heading font-semibold text-[#3D3D3D]">Memory Journal</p>
                </div>
              </div>
              <p className="text-sm text-[#666] font-body leading-relaxed text-left italic border-l-2 border-[#E75480] pl-3">
                "A handcrafted leather journal with her initials, perfect for new memories..."
              </p>
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#E75480] fill-[#E75480]" />
                ))}
                <span className="text-xs text-[#999] ml-2">98% Match</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection('how-it-works')}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-[#999]"
          >
            <span className="text-xs font-body">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-[#E75480]/40 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#E75480]"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ===== SECTION 2: HOW IT WORKS ===== */}
      <section 
        id="how-it-works"
        data-testid="how-it-works-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-40 h-40 bg-[#FFB3C1]/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-[#E75480]/5 rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal direction="up" className="text-center mb-12 sm:mb-16">
            <h2 
              data-testid="how-it-works-title"
              className="font-heading font-bold text-[#3D3D3D] mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              How It Works{" "}
              <Sparkles className="inline w-6 h-6 sm:w-8 sm:h-8 text-[#E75480]" />
            </h2>
            <p className="text-sm sm:text-base text-[#666] font-body max-w-lg mx-auto">
              Three simple steps to find a gift that speaks from the heart
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: MessageCircleHeart,
                title: "Share Your Memory",
                description: "Tell us about a special moment you shared together",
                color: "from-[#E75480] to-[#FF8FA3]",
                bgColor: "bg-[#FFF5F7]",
                delay: 0.1
              },
              {
                icon: Brain,
                title: "AI Understands",
                description: "We analyze the emotional meaning behind your story",
                color: "from-[#D14570] to-[#E75480]",
                bgColor: "bg-[#FFE8ED]",
                delay: 0.2
              },
              {
                icon: Gift,
                title: "Get Gift Ideas",
                description: "Receive 4 personalized suggestions that honor your bond",
                color: "from-[#FF8FA3] to-[#FFB3C1]",
                bgColor: "bg-[#FFF5F7]",
                delay: 0.3
              }
            ].map((step, index) => (
              <ScrollReveal key={index} direction="up" delay={step.delay}>
                <div 
                  data-testid={`step-card-${index + 1}`}
                  className={`${step.bgColor} rounded-2xl p-6 sm:p-8 text-center group cursor-default hover:shadow-lg transition-all duration-400 border border-[#FFB3C1]/20`}
                >
                  <div className="relative mb-5">
                    <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <step.icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-sm font-bold text-[#E75480]">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-[#3D3D3D] text-lg sm:text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#666] font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: EMOTIONAL HOOK ===== */}
      <section 
        data-testid="emotional-hook-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF5F7] to-[#FFE8ED] relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <Heart className="w-24 h-24 text-[#E75480]" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Heart className="w-32 h-32 text-[#FF8FA3]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal direction="up" className="text-center mb-10 sm:mb-14">
            <h2 
              data-testid="emotional-hook-title"
              className="font-heading font-bold text-[#3D3D3D] mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
            >
              Not Just Gift Ideas.
              <br />
              <span className="bg-gradient-to-r from-[#E75480] to-[#FF8FA3] bg-clip-text text-transparent">
                Emotional Understanding.
              </span>
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Human Touch Card */}
            <ScrollReveal direction="left" delay={0.1}>
              <div 
                data-testid="human-touch-card"
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-[#FFB3C1]/20 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E75480] to-[#FF8FA3] flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white fill-white" />
                </div>
                <h3 className="font-heading font-semibold text-[#3D3D3D] text-lg sm:text-xl mb-3 text-center">
                  Your Human Touch
                </h3>
                <p className="text-sm text-[#666] font-body leading-relaxed text-center">
                  Your gift idea comes from <strong className="text-[#E75480]">lived experience</strong> and deep knowing. That intuition matters.
                </p>
              </div>
            </ScrollReveal>
            
            {/* AI Insight Card */}
            <ScrollReveal direction="right" delay={0.2}>
              <div 
                data-testid="ai-insight-card"
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-[#FFB3C1]/20 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D14570] to-[#E75480] flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-[#3D3D3D] text-lg sm:text-xl mb-3 text-center">
                  AI's Insight
                </h3>
                <p className="text-sm text-[#666] font-body leading-relaxed text-center">
                  AI finds <strong className="text-[#E75480]">patterns you might have missed</strong> - revealing deeper ways to express love.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SOCIAL PROOF ===== */}
      <section 
        data-testid="testimonial-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-2xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10">
            <h2 
              data-testid="testimonial-title"
              className="font-heading font-bold text-[#3D3D3D] mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)' }}
            >
              Real Love Stories
            </h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#E75480] fill-[#E75480]" />
              ))}
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="scale" delay={0.1}>
            <div 
              data-testid="testimonial-card"
              className="bg-gradient-to-br from-[#FFF5F7] to-[#FFE8ED] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden border border-[#FFB3C1]/20"
            >
              {/* Decorative Quotes */}
              <Quote className="absolute top-4 left-4 w-8 h-8 text-[#E75480] opacity-15" />
              <Quote className="absolute bottom-4 right-4 w-8 h-8 text-[#E75480] opacity-15 rotate-180" />
              
              <p className="text-base sm:text-lg text-[#3D3D3D] font-body leading-relaxed italic mb-6 relative z-10 px-2">
                "I was stuck between 3 gift ideas. This showed me why my original instinct was right AND gave me a way to make it even more special. <strong className="text-[#E75480]">She cried when she opened it.</strong>"
              </p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-4 h-4 text-[#E75480] fill-[#E75480]" />
                ))}
              </div>
              <p className="text-[#555] font-heading font-medium">
                — Arjun, Mumbai
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 5: FINAL CTA ===== */}
      <section 
        data-testid="final-cta-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#E75480] via-[#FF8FA3] to-[#FFB3C1] relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4
              }}
            >
              <Heart className="w-5 h-5 text-white/25 fill-white/25" />
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <h2 
              data-testid="final-cta-headline"
              className="font-heading font-bold text-white mb-5 sm:mb-6 leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              This Valentine's Day 2026
              <br />
              Give Something <span className="underline decoration-wavy decoration-white/40 underline-offset-4">Meaningful</span>
            </h2>
            
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="mb-6"
            >
              <Button
                data-testid="final-cta-btn"
                onClick={() => navigate('/form')}
                className="bg-white hover:bg-[#FFF5F7] text-[#E75480] rounded-full px-10 sm:px-12 py-6 sm:py-7 text-base sm:text-lg font-bold shadow-xl hover:shadow-lg transition-all duration-300"
              >
                Start Now - It's Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Free forever</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer 
        data-testid="footer"
        className="py-8 sm:py-10 px-4 bg-[#FFF5F7] border-t border-[#FFB3C1]/20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-6 h-6 text-[#E75480] fill-[#E75480] animate-heartbeat" />
            <span className="font-heading font-bold text-[#3D3D3D] text-xl">Memori</span>
          </div>
          <p className="text-sm text-[#666] font-body mb-1">
            Made with <Heart className="inline w-3.5 h-3.5 text-[#E75480] fill-[#E75480] mx-0.5" /> for meaningful connections
          </p>
          <p className="text-xs text-[#999]">
            © 2026 Memori
          </p>
        </div>
      </footer>
    </div>
  );
}

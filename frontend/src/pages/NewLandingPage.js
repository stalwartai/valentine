import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, Gift, Brain, ArrowRight, Lock, Zap, Quote, MessageCircleHeart, Star, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

// Floating Hearts Component - Deep Red
const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
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
            opacity: [0, 0.8, 1, 0.8, 0],
            rotate: [0, 15, -10, 20, 0],
            scale: [0.5, 1, 0.8, 1, 0.5]
          }}
          transition={{ 
            duration: 10 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut"
          }}
          style={{ left: `${5 + i * 8}%` }}
        >
          <Heart 
            className={`${
              i % 3 === 0 ? "w-8 h-8 text-[#C41E3A] fill-[#C41E3A]" : 
              i % 3 === 1 ? "w-5 h-5 text-[#DC143C] fill-[#DC143C]" : 
              "w-6 h-6 text-[#E63950] fill-[#E63950]"
            }`}
            style={{ opacity: 0.6 + Math.random() * 0.4 }}
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
    up: { hidden: { opacity: 0, y: 80 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -80 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Countdown to Valentine's 2026
const CountdownBadge = () => {
  const valentinesDay = new Date('2026-02-14');
  const now = new Date();
  const daysLeft = Math.ceil((valentinesDay - now) / (1000 * 60 * 60 * 24));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000]/10 rounded-full border border-[#C41E3A]/30 mb-6"
    >
      <Clock className="w-4 h-4 text-[#C41E3A]" />
      <span className="text-sm font-medium text-[#8B0000]">
        {daysLeft} days until Valentine's Day 2026
      </span>
      <Heart className="w-4 h-4 text-[#DC143C] fill-[#DC143C] animate-heartbeat" />
    </motion.div>
  );
};

export default function NewLandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] overflow-x-hidden">
      
      {/* ===== SECTION 1: HERO ===== */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        data-testid="hero-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        {/* Deep Red Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFE0E6] via-[#FFF0F3] to-[#FFF5F5]" />
        
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#C41E3A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-[#DC143C]/8 rounded-full blur-3xl" />
        
        {/* Floating Hearts Animation */}
        <FloatingHearts />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Countdown Badge */}
            <CountdownBadge />
            
            {/* Main Headline */}
            <h1 
              data-testid="hero-headline"
              className="font-heading font-bold text-[#2D2D2D] leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
            >
              Turn Your Memories Into{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#8B0000] via-[#C41E3A] to-[#DC143C] bg-clip-text text-transparent">
                The Perfect Gift
              </span>{" "}
              <motion.span 
                className="inline-block"
                animate={{ scale: [1, 1.15, 1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Heart className="inline w-10 h-10 sm:w-14 sm:h-14 text-[#C41E3A] fill-[#C41E3A]" />
              </motion.span>
            </h1>
            
            {/* Subheadline */}
            <p 
              data-testid="hero-subheadline"
              className="text-base sm:text-lg lg:text-xl text-[#4A4A4A] font-body max-w-2xl mx-auto leading-relaxed px-4"
            >
              Share a special moment. Get <strong className="text-[#C41E3A]">4 personalized gift ideas</strong>
              <br className="hidden sm:block" />
              that truly honor your relationship.
            </p>
            
            <p className="text-sm sm:text-base text-[#666666] font-body">
              Human intuition meets AI emotional intelligence.
            </p>
            
            {/* CTA Button - Deep Red */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Button
                data-testid="hero-cta-btn"
                onClick={() => navigate('/form')}
                className="bg-gradient-to-r from-[#8B0000] via-[#C41E3A] to-[#DC143C] hover:from-[#720520] hover:via-[#A31530] hover:to-[#C41E3A] text-white rounded-full px-10 sm:px-14 py-7 sm:py-8 text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse-glow"
              >
                Find The Perfect Gift
                <ArrowRight className="ml-3 w-6 h-6 sm:w-7 sm:h-7" />
              </Button>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              data-testid="hero-trust-badges"
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 text-xs sm:text-sm text-[#555555]"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C41E3A]" />
                <span>Takes 3 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#DC143C] fill-[#DC143C]" />
                <span>Personalized for your story</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#C41E3A]" />
                <span>Ready for Valentine's 2026</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Visual Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-14 sm:mt-16 relative max-w-md mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#C41E3A]/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C41E3A] to-[#DC143C] flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-[#888] font-body uppercase tracking-wider">AI Gift Suggestion</p>
                  <p className="font-heading font-semibold text-[#2D2D2D] text-lg">Memory Journal</p>
                </div>
              </div>
              <p className="text-sm text-[#555] font-body leading-relaxed text-left italic border-l-3 border-[#C41E3A] pl-4">
                "A handcrafted leather journal with her initials embossed in gold, perfect for capturing new memories together..."
              </p>
              <div className="flex items-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#C41E3A] fill-[#C41E3A]" />
                ))}
                <span className="text-xs text-[#888] ml-2">Emotional Match: 98%</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection('how-it-works')}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-[#888]"
          >
            <span className="text-xs font-body">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-[#C41E3A]/50 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#C41E3A]"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ===== SECTION 2: HOW IT WORKS ===== */}
      <section 
        id="how-it-works"
        data-testid="how-it-works-section"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-40 h-40 bg-[#C41E3A]/5 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-[#DC143C]/5 rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal direction="up" className="text-center mb-14 sm:mb-20">
            <h2 
              data-testid="how-it-works-title"
              className="font-heading font-bold text-[#2D2D2D] mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              How It Works{" "}
              <Sparkles className="inline w-8 h-8 sm:w-10 sm:h-10 text-[#C41E3A]" />
            </h2>
            <p className="text-base sm:text-lg text-[#666] font-body max-w-xl mx-auto">
              Three simple steps to find a gift that speaks from the heart
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                icon: MessageCircleHeart,
                title: "Share Your Memory",
                description: "Tell us about a special moment you shared together - the more details, the more personal your gift",
                color: "from-[#C41E3A] to-[#E63950]",
                bgColor: "bg-[#FFF0F3]",
                delay: 0.1
              },
              {
                icon: Brain,
                title: "AI Understands Your Story",
                description: "Our AI analyzes the emotional meaning and finds patterns you might have missed",
                color: "from-[#8B0000] to-[#C41E3A]",
                bgColor: "bg-[#FFE0E6]",
                delay: 0.25
              },
              {
                icon: Gift,
                title: "Get Perfect Gift Ideas",
                description: "Receive 4 personalized suggestions that honor your unique connection and story",
                color: "from-[#DC143C] to-[#FF6B7F]",
                bgColor: "bg-[#FFF0F3]",
                delay: 0.4
              }
            ].map((step, index) => (
              <ScrollReveal key={index} direction="up" delay={step.delay}>
                <div 
                  data-testid={`step-card-${index + 1}`}
                  className={`${step.bgColor} rounded-3xl p-8 sm:p-10 text-center group cursor-default hover:shadow-2xl transition-all duration-500 border border-[#C41E3A]/10 hover:border-[#C41E3A]/30`}
                >
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <step.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-[#C41E3A]">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-[#2D2D2D] text-xl sm:text-2xl mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#555] font-body leading-relaxed">
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
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF0F3] to-[#FFE0E6] relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Heart className="w-32 h-32 text-[#C41E3A]" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Heart className="w-40 h-40 text-[#DC143C]" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal direction="up" className="text-center mb-12 sm:mb-16">
            <h2 
              data-testid="emotional-hook-title"
              className="font-heading font-bold text-[#2D2D2D] mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              Not Just Gift Ideas.
              <br />
              <span className="bg-gradient-to-r from-[#8B0000] via-[#C41E3A] to-[#DC143C] bg-clip-text text-transparent">
                Emotional Understanding.
              </span>
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
            {/* Human Touch Card */}
            <ScrollReveal direction="left" delay={0.1}>
              <div 
                data-testid="human-touch-card"
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#C41E3A]/10 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C41E3A] to-[#DC143C] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                <h3 className="font-heading font-bold text-[#2D2D2D] text-xl sm:text-2xl mb-4 text-center">
                  Your Human Touch
                </h3>
                <p className="text-sm sm:text-base text-[#555] font-body leading-relaxed text-center">
                  Your gift idea comes from <strong className="text-[#C41E3A]">lived experience</strong>, shared memories, and deep knowing. That intuition matters more than any algorithm.
                </p>
              </div>
            </ScrollReveal>
            
            {/* AI Insight Card */}
            <ScrollReveal direction="right" delay={0.2}>
              <div 
                data-testid="ai-insight-card"
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#C41E3A]/10 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#C41E3A] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-[#2D2D2D] text-xl sm:text-2xl mb-4 text-center">
                  AI's Insight
                </h3>
                <p className="text-sm sm:text-base text-[#555] font-body leading-relaxed text-center">
                  AI analyzes your story to find <strong className="text-[#C41E3A]">patterns you might have missed</strong> - revealing deeper ways to express what you feel.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SOCIAL PROOF ===== */}
      <section 
        data-testid="testimonial-section"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 
              data-testid="testimonial-title"
              className="font-heading font-bold text-[#2D2D2D] mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Created With Love By Real Couples
            </h2>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-[#C41E3A] fill-[#C41E3A]" />
              ))}
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="scale" delay={0.15}>
            <div 
              data-testid="testimonial-card"
              className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE0E6] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#C41E3A]/10"
            >
              {/* Decorative Quotes */}
              <Quote className="absolute top-6 left-6 w-12 h-12 text-[#C41E3A] opacity-20" />
              <Quote className="absolute bottom-6 right-6 w-12 h-12 text-[#C41E3A] opacity-20 rotate-180" />
              
              <p className="text-lg sm:text-xl lg:text-2xl text-[#2D2D2D] font-body leading-relaxed italic mb-8 relative z-10 px-4">
                "I was stuck between 3 gift ideas. This showed me why my original instinct was right AND gave me a way to make it even more special. <strong className="text-[#C41E3A]">She cried when she opened it.</strong>"
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-5 h-5 text-[#C41E3A] fill-[#C41E3A]" />
                ))}
              </div>
              <p className="text-[#555] font-heading font-semibold text-lg">
                — Arjun, Mumbai
              </p>
              <p className="text-xs text-[#888] mt-1">Valentine's Day 2025</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 5: FINAL CTA ===== */}
      <section 
        data-testid="final-cta-section"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#8B0000] via-[#C41E3A] to-[#DC143C] relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              <Heart className="w-6 h-6 text-white/20 fill-white/20" />
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <h2 
              data-testid="final-cta-headline"
              className="font-heading font-bold text-white mb-6 sm:mb-8 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
            >
              This Valentine's Day 2026, Give Something
              <br />
              That Shows You <span className="underline decoration-wavy decoration-white/50 underline-offset-8">Really Understand</span> Them
            </h2>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mb-8"
            >
              <Button
                data-testid="final-cta-btn"
                onClick={() => navigate('/form')}
                className="bg-white hover:bg-[#FFF5F5] text-[#C41E3A] rounded-full px-10 sm:px-14 py-7 sm:py-8 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-xl transition-all duration-300"
              >
                Start Finding Your Perfect Gift
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span>Your story stays private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Results in 60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>100% Free to try</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer 
        data-testid="footer"
        className="py-10 sm:py-14 px-4 bg-[#FFF5F5] border-t border-[#C41E3A]/10"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-[#C41E3A] fill-[#C41E3A] animate-heartbeat" />
            <span className="font-heading font-bold text-[#2D2D2D] text-2xl">Memori</span>
          </div>
          <p className="text-sm text-[#666] font-body mb-2">
            Made with <Heart className="inline w-4 h-4 text-[#C41E3A] fill-[#C41E3A] mx-1" /> for meaningful connections
          </p>
          <p className="text-xs text-[#888]">
            © 2026 Memori. Turn your memories into gifts and stories.
          </p>
        </div>
      </footer>
    </div>
  );
}

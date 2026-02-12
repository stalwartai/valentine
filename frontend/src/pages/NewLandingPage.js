import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Heart, Sparkles, Gift, Brain, ArrowRight, Lock, Zap, Quote, MessageCircleHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Floating Hearts Component
const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%",
            opacity: 0 
          }}
          animate={{ 
            y: "-10%",
            opacity: [0, 0.6, 0.8, 0.6, 0],
            rotate: [0, 10, -10, 15, 0]
          }}
          transition={{ 
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          style={{ left: `${10 + i * 12}%` }}
        >
          <Heart 
            className={`text-primary-300 fill-primary-200 ${
              i % 2 === 0 ? "w-6 h-6" : "w-4 h-4"
            }`}
            style={{ opacity: 0.5 + Math.random() * 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Section Animation Wrapper
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function NewLandingPage() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      
      {/* ===== SECTION 1: HERO ===== */}
      <section 
        data-testid="hero-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        {/* Soft Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-300/40 via-primary-200/20 to-cream" />
        
        {/* Floating Hearts Animation */}
        <FloatingHearts />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Main Headline */}
            <h1 
              data-testid="hero-headline"
              className="font-heading font-bold text-neutral-900 leading-tight"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}
            >
              Turn Your Memories Into{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient-romance">The Perfect Gift</span>{" "}
              <span className="inline-block animate-heartbeat">
                <Heart className="inline w-8 h-8 sm:w-12 sm:h-12 text-accent-500 fill-accent-500" />
              </span>
            </h1>
            
            {/* Subheadline */}
            <p 
              data-testid="hero-subheadline"
              className="text-base sm:text-lg lg:text-xl text-neutral-700 font-body max-w-2xl mx-auto leading-relaxed px-4"
            >
              Share a special moment. Get <strong>4 personalized gift ideas</strong>
              <br className="hidden sm:block" />
              that truly honor your relationship.
            </p>
            
            <p className="text-sm sm:text-base text-neutral-600 font-body">
              Human intuition meets AI emotional intelligence.
            </p>
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Button
                data-testid="hero-cta-btn"
                onClick={() => navigate('/form')}
                className="bg-accent-500 hover:bg-accent-600 text-white rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold shadow-lg hover:shadow-glow-cta transition-all duration-300 animate-pulse-glow"
              >
                Find The Perfect Gift
                <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </motion.div>
            
            {/* Supporting Text */}
            <div 
              data-testid="hero-trust-badges"
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 text-xs sm:text-sm text-neutral-600"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent-500" />
                <span>Takes 3 minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />
                <span>Personalized for your story</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-accent-500" />
                <span>Ready for Valentine's Day</span>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Visual - Abstract Romantic Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12 sm:mt-16 relative max-w-lg mx-auto"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-primary-200/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-romance flex items-center justify-center shadow-md">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-neutral-500 font-body">Sample Gift Idea</p>
                  <p className="font-heading font-semibold text-neutral-900">Personalized Memory Journal</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 font-body leading-relaxed text-left italic">
                "A handcrafted journal with her initials, capturing the essence of your bookstore date where everything changed..."
              </p>
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
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-neutral-500"
          >
            <span className="text-xs font-body">Scroll to learn more</span>
            <div className="w-6 h-10 rounded-full border-2 border-neutral-400 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-neutral-400"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SECTION 2: HOW IT WORKS ===== */}
      <section 
        id="how-it-works"
        data-testid="how-it-works-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 
              data-testid="how-it-works-title"
              className="font-heading font-bold text-neutral-900 mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              How It Works <Sparkles className="inline w-6 h-6 sm:w-8 sm:h-8 text-accent-500" />
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-body max-w-xl mx-auto">
              Three simple steps to find a gift that speaks from the heart
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: MessageCircleHeart,
                title: "Share Your Memory",
                description: "Tell us about a special moment you shared together",
                color: "bg-primary-300",
                delay: 0.1
              },
              {
                icon: Brain,
                title: "AI Understands Your Story",
                description: "We analyze the emotional meaning behind your relationship",
                color: "bg-accent-400",
                delay: 0.2
              },
              {
                icon: Gift,
                title: "Get Perfect Gift Ideas",
                description: "Receive 4 personalized suggestions that honor your unique connection",
                color: "bg-primary-400",
                delay: 0.3
              }
            ].map((step, index) => (
              <AnimatedSection key={index} delay={step.delay}>
                <div 
                  data-testid={`step-card-${index + 1}`}
                  className="glass-card rounded-2xl p-6 sm:p-8 text-center group cursor-default"
                >
                  <div className={`${step.color} w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-neutral-900 text-lg sm:text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: EMOTIONAL HOOK ===== */}
      <section 
        data-testid="emotional-hook-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-primary-100/50"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <h2 
              data-testid="emotional-hook-title"
              className="font-heading font-bold text-neutral-900 mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
            >
              Not Just Gift Ideas.
              <br />
              <span className="text-gradient-romance">Emotional Understanding.</span>
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Human Touch Card */}
            <AnimatedSection delay={0.1}>
              <div 
                data-testid="human-touch-card"
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-primary-200/50"
              >
                <div className="w-14 h-14 rounded-full bg-primary-200 flex items-center justify-center mx-auto mb-5">
                  <Heart className="w-7 h-7 text-accent-500 fill-accent-500" />
                </div>
                <h3 className="font-heading font-semibold text-neutral-900 text-lg sm:text-xl mb-3 text-center">
                  Your Human Touch
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 font-body leading-relaxed text-center">
                  Your gift idea comes from lived experience, shared memories, and deep knowing. That intuition matters.
                </p>
              </div>
            </AnimatedSection>
            
            {/* AI Insight Card */}
            <AnimatedSection delay={0.2}>
              <div 
                data-testid="ai-insight-card"
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-primary-200/50"
              >
                <div className="w-14 h-14 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-7 h-7 text-accent-500" />
                </div>
                <h3 className="font-heading font-semibold text-neutral-900 text-lg sm:text-xl mb-3 text-center">
                  AI's Insight
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 font-body leading-relaxed text-center">
                  AI analyzes your story to find patterns you might have missed - revealing deeper ways to express what you feel.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SOCIAL PROOF ===== */}
      <section 
        data-testid="testimonial-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 
              data-testid="testimonial-title"
              className="font-heading font-bold text-neutral-900 mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Created With Love By Real Couples
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <div 
              data-testid="testimonial-card"
              className="glass-card rounded-3xl p-6 sm:p-10 text-center relative"
            >
              {/* Decorative Quotes */}
              <Quote className="absolute top-4 left-4 w-8 h-8 text-primary-200 opacity-60" />
              <Quote className="absolute bottom-4 right-4 w-8 h-8 text-primary-200 opacity-60 rotate-180" />
              
              <p className="text-base sm:text-lg lg:text-xl text-neutral-700 font-body leading-relaxed italic mb-6 sm:mb-8 relative z-10 px-4">
                "I was stuck between 3 gift ideas. This showed me why my original instinct was right AND gave me a way to make it even more special. She cried when she opened it."
              </p>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-4 h-4 text-accent-500 fill-accent-500" />
                ))}
              </div>
              <p className="text-neutral-600 font-heading font-medium mt-3">
                — Arjun, Mumbai
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SECTION 5: FINAL CTA ===== */}
      <section 
        data-testid="final-cta-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-500 via-primary-400 to-primary-300"
      >
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 
              data-testid="final-cta-headline"
              className="font-heading font-bold text-white mb-6 sm:mb-8 leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              This Valentine's Day, Give Something
              <br />
              That Shows You <span className="underline decoration-wavy decoration-white/50">Really Understand</span> Them
            </h2>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                data-testid="final-cta-btn"
                onClick={() => navigate('/form')}
                className="bg-white hover:bg-neutral-50 text-accent-600 rounded-full px-8 sm:px-12 py-6 sm:py-7 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Finding Your Perfect Gift
                <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </motion.div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 text-white/90 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Your story stays private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Results in 60 seconds</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer 
        data-testid="footer"
        className="py-8 sm:py-12 px-4 bg-cream border-t border-primary-200/50"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-accent-500 fill-accent-500" />
            <span className="font-heading font-semibold text-neutral-900 text-lg">Memori</span>
          </div>
          <p className="text-sm text-neutral-600 font-body mb-3">
            Made with <Heart className="inline w-4 h-4 text-accent-500 fill-accent-500 animate-heartbeat" /> for meaningful connections
          </p>
          <p className="text-xs text-neutral-500">
            Turn your memories into gifts and stories
          </p>
        </div>
      </footer>
    </div>
  );
}

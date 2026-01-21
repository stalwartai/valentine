import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Sparkles, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Glow */}
        <div className="absolute inset-0 romantic-glow" />
        
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/30 backdrop-blur-sm rounded-full border border-secondary">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered Gift Discovery</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              Find the Perfect Gift with AI
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground font-body leading-relaxed">
              See if AI can understand your partner as well as you do. Get 4 personalized gift ideas in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                data-testid="get-started-btn"
                onClick={() => navigate('/form')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium shadow-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Start Finding Gifts
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-secondary text-foreground rounded-full px-8 py-6 text-lg font-medium hover:bg-secondary/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Heart className="mr-2 w-5 h-5" />
                How It Works
              </Button>
            </div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-card">
              <img
                src="https://images.pexels.com/photos/17435006/pexels-photo-17435006.jpeg"
                alt="Romantic couple"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-full p-6 shadow-soft"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 bg-white rounded-full p-6 shadow-soft"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gift className="w-8 h-8 text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Three simple steps to discover the perfect gift
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Share Your Story",
                description: "Tell us about your partner—their hobbies, interests, personality, and your special memories together.",
                icon: Heart,
                delay: 0
              },
              {
                number: "02",
                title: "AI Generates Ideas",
                description: "Our AI analyzes your relationship and creates 3 thoughtful gift alternatives to compare with your original idea.",
                icon: Sparkles,
                delay: 0.2
              },
              {
                number: "03",
                title: "Choose & Perfect",
                description: "Browse 4 personalized gift options and get actionable tips to make your chosen gift extra special.",
                icon: Gift,
                delay: 0.4
              }
            ].map((step) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-card border border-muted hover:border-primary/30 hover:shadow-soft transition-all duration-300 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-secondary/30 rounded-full p-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-5xl font-heading font-bold text-secondary/50">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              data-testid="how-it-works-cta-btn"
              onClick={() => navigate('/form')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium shadow-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-muted">
        <p className="text-sm text-muted-foreground font-body">
          Made with <Heart className="inline w-4 h-4 text-primary fill-primary" /> for Valentine's Day 2025
        </p>
      </footer>
    </div>
  );
}

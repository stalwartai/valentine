import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Sparkles, Gift, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-dreamy" />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary-300">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-neutral-800">AI-Powered Memory Transformation</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-neutral-900 leading-tight">
              Turn Your <span className="text-gradient-romance">Memories</span>
              <br />Into Gifts & Stories
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 font-body max-w-3xl mx-auto leading-relaxed">
              Share your story. Get AI-crafted gift ideas that capture your emotions.
              <br className="hidden sm:block" />
              Then transform it into a beautiful illustrated storybook.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                data-testid="start-journey-btn"
                onClick={() => navigate('/form')}
                size="lg"
                className="bg-gradient-romance text-white rounded-full px-10 py-7 text-lg font-semibold shadow-glow-primary hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-neutral-300 text-neutral-700 rounded-full px-8 py-7 text-lg font-medium hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <BookOpen className="mr-2 w-5 h-5" />
                See How It Works
              </Button>
            </div>
            
            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-8"
            >
              <p className="text-sm text-neutral-500 mb-3">Perfect for Valentine's Day 2025</p>
              <div className="flex items-center justify-center gap-6 text-neutral-600">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary-500 fill-primary-500" />
                  <span className="text-sm font-medium">Personalized Gifts</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-secondary-500" />
                  <span className="text-sm font-medium">AI Storybooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-accent-500" />
                  <span className="text-sm font-medium">Emotional Impact</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 relative max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-3xl p-8 border-2 border-primary-200 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-romance flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-heading font-semibold text-neutral-900">4 Gift Ideas</h3>
                      <p className="text-sm text-neutral-600">Personalized for your story</p>
                    </div>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-4 text-left">
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      "A handcrafted journal with her initials, capturing the essence of your bookstore date..."
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-sunset flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-heading font-semibold text-neutral-900">8-Page Storybook</h3>
                      <p className="text-sm text-neutral-600">You both as characters</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4 text-left">
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      "Once upon a time, in a cozy bookstore cafe..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 font-body max-w-2xl mx-auto">
              Three simple steps to create an unforgettable gift experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Story",
                description: "Tell us about your partner and a special memory you both cherish. The more details, the more personal.",
                icon: Heart,
                gradient: "bg-gradient-romance"
              },
              {
                step: "02",
                title: "Get Gift Ideas",
                description: "AI analyzes your story and generates 4 personalized gift ideas that capture your emotions.",
                icon: Gift,
                gradient: "bg-gradient-sunset"
              },
              {
                step: "03",
                title: "Create Storybook",
                description: "Transform your memory into an 8-page illustrated storybook where you're both the heroes.",
                icon: BookOpen,
                gradient: "bg-gradient-romance"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card rounded-2xl p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${item.gradient} rounded-full p-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-5xl font-heading font-bold text-neutral-200">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 font-body leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => navigate('/form')}
              size="lg"
              className="bg-gradient-romance text-white rounded-full px-10 py-6 text-lg font-semibold shadow-glow-primary hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Create Your Gift Story Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-neutral-600 font-body mb-4">
            Perfect for Valentine's Day, Anniversaries, Birthdays & Special Moments
          </p>
          <p className="text-xs text-neutral-500">
            Made with <Heart className="inline w-4 h-4 text-primary-500 fill-primary-500" /> for meaningful connections
          </p>
        </div>
      </footer>
    </div>
  );
}

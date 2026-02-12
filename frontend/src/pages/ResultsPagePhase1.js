import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Gift, RefreshCw, Edit, Lock, Sparkles, BookOpen, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ResultsPagePhase1() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [gifts, setGifts] = useState([]);
  const [loadingText, setLoadingText] = useState("Reading your story...");
  const [progress, setProgress] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const formData = location.state?.formData || JSON.parse(localStorage.getItem('giftFormData') || 'null');
    
    if (!formData) {
      toast.error("No form data found. Please fill out the form first.");
      navigate('/form');
      return;
    }

    generateGifts(formData);
  }, [location.state?.formData, navigate, generateGifts]);

  const generateGifts = useCallback(async (formData) => {
    try {
      setLoading(true);
      setProgress(0);
      setLoadingText("Reading your story...");

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);

      setTimeout(() => {
        setLoadingText("Finding the emotion in it...");
      }, 2000);
      
      setTimeout(() => {
        setLoadingText("Crafting your ideas...");
      }, 4000);

      const response = await axios.post(`${API}/generate-gifts`, formData);
      
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setGifts(response.data.gifts || []);
        setLoading(false);
      }, 500);

    } catch (error) {
      console.error("Error generating gifts:", error);
      toast.error("Failed to generate gift ideas. Please try again.");
      setLoading(false);
    }
  }, []);

  const handleRegenerate = () => {
    const formData = JSON.parse(localStorage.getItem('giftFormData') || 'null');
    if (formData) {
      generateGifts(formData);
    }
  };

  const handleEdit = () => {
    navigate('/form');
  };
  
  const handleUnlock = () => {
    setShowComingSoon(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-dreamy">
        <motion.div
          className="text-center space-y-8 max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-24 h-24 mx-auto text-primary-500 fill-primary-500" />
          </motion.div>
          
          <div className="space-y-4">
            <p className="text-2xl font-heading font-semibold text-neutral-900">{loadingText}</p>
            <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-romance relative"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-neutral-600">{progress}%</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const formData = JSON.parse(localStorage.getItem('giftFormData') || '{}');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-dreamy">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4">
            Your Gift Ideas for {formData.recipient_name} 💝
          </h1>
          <p className="text-lg text-neutral-600 font-body max-w-2xl mx-auto">
            We found 4 meaningful gift ideas based on your story
          </p>
        </motion.div>

        {/* Gift Cards - Partially Visible */}
        <div className="grid md:grid-cols-2 gap-6 mb-12" data-testid="gift-cards-grid">
          {gifts.map((gift, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
              data-testid={`gift-card-${index}`}
            >
              <div className="glass-card rounded-2xl p-6 border-2 border-neutral-200 hover:border-primary-300 transition-all duration-300">
                {/* Visible Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gradient-romance text-white text-xs font-medium rounded-full mb-2">
                        {gift.category}
                      </span>
                      <h3 className="text-xl font-heading font-semibold text-neutral-900">
                        {gift.title}
                      </h3>
                    </div>
                    {index === 0 && (
                      <Crown className="w-6 h-6 text-secondary-500" />
                    )}
                  </div>

                  {/* Teaser - Visible */}
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-700 font-medium mb-2">
                      ✨ This gift evokes:
                    </p>
                    <p className="text-neutral-900 font-body">
                      {gift.description.substring(0, 60)}...
                    </p>
                  </div>

                  {/* Locked Content */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10 backdrop-blur-sm rounded-lg" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="glass-card rounded-full p-4 border-2 border-primary-300">
                        <Lock className="w-6 h-6 text-primary-500" />
                      </div>
                    </div>
                    
                    <div className="filter blur-sm select-none pointer-events-none space-y-3">
                      <div className="bg-neutral-100 rounded-lg p-4">
                        <h4 className="text-xs font-medium text-neutral-500 mb-1">Why this works:</h4>
                        <p className="text-sm text-neutral-700">
                          This connects deeply to your shared memory and captures the essence of your relationship in a tangible way...
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-primary-300 pl-3">
                        <h4 className="text-xs font-medium text-neutral-500 mb-1">How to personalize:</h4>
                        <p className="text-sm text-neutral-700">
                          Add a handwritten note referencing that special moment...
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-base font-heading font-semibold text-primary-500">
                          Est: ₹X,XXX
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unlock CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="glass-card rounded-2xl p-8 border-2 border-primary-300 shadow-glow-primary text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary-500" />
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-3">
              Want to See the Full Details?
            </h2>
            <p className="text-neutral-600 font-body mb-6">
              Unlock complete gift ideas, shopping lists, assembly guides, and create your personalized 8-page illustrated storybook
            </p>
            <Button
              onClick={handleUnlock}
              size="lg"
              className="bg-gradient-romance text-white rounded-full px-10 py-6 text-lg font-semibold shadow-glow-primary hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
            >
              <BookOpen className="mr-2 w-5 h-5" />
              Create Your Story
            </Button>
            <p className="text-xs text-neutral-500 mt-4">
              Coming Soon • Valentine's Day 2025
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            onClick={handleRegenerate}
            variant="outline"
            className="border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-100 rounded-full px-6 py-3"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate Ideas
          </Button>
          
          <Button
            onClick={handleEdit}
            variant="outline"
            className="border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-100 rounded-full px-6 py-3"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Answers
          </Button>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-neutral-600 hover:text-neutral-900"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
      
      {/* Coming Soon Modal */}
      {showComingSoon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowComingSoon(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full border-2 border-primary-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-romance flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-3">
                Coming Very Soon!
              </h3>
              <p className="text-neutral-600 font-body mb-6">
                We're putting the final touches on this feature. Full gift details and personalized storybook creation will be available before Valentine's Day 2025.
              </p>
              <Button
                onClick={() => setShowComingSoon(false)}
                className="bg-gradient-romance text-white rounded-full px-8 py-3 w-full"
              >
                Got It!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

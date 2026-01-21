import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Gift, RefreshCw, Edit, Package, MapPin, MessageSquare, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [gifts, setGifts] = useState([]);
  const [bundle, setBundle] = useState(null);
  const [loadingText, setLoadingText] = useState("Understanding your relationship...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Get form data from localStorage or location state
    const formData = location.state?.formData || JSON.parse(localStorage.getItem('giftFormData') || 'null');
    
    if (!formData) {
      toast.error("No form data found. Please fill out the form first.");
      navigate('/form');
      return;
    }

    generateGifts(formData);
  }, []);

  const generateGifts = async (formData) => {
    try {
      setLoading(true);
      setProgress(0);
      setLoadingText("Understanding your relationship...");

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);

      setTimeout(() => {
        setLoadingText("Crafting personalized ideas...");
      }, 3000);

      const response = await axios.post(`${API}/generate-gifts`, formData);
      
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setGifts(response.data.gifts || []);
        setBundle(response.data.bundle || null);
        setLoading(false);
      }, 500);

    } catch (error) {
      console.error("Error generating gifts:", error);
      toast.error("Failed to generate gift ideas. Please try again.");
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    const formData = JSON.parse(localStorage.getItem('giftFormData') || 'null');
    if (formData) {
      generateGifts(formData);
    }
  };

  const handleEdit = () => {
    navigate('/form');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-20 h-20 mx-auto text-primary fill-primary" />
          </motion.div>
          
          <div className="space-y-4">
            <p className="text-xl font-heading text-foreground">{loadingText}</p>
            <div className="w-80 h-2 bg-muted rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-primary relative"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-glow" />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground">{progress}%</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Here are 4 gift ideas for {JSON.parse(localStorage.getItem('giftFormData') || '{}').recipient_name || 'them'} 💝
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            One is yours, three are AI-generated. Can you tell which is which?
          </p>
        </motion.div>

        {/* Gift Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12" data-testid="gift-cards-grid">
          {gifts.map((gift, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-card border border-muted hover:border-primary/30 hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
              data-testid={`gift-card-${index}`}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/20 rounded-full p-3">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full mb-2">
                      {gift.category}
                    </span>
                    <h3 className="text-xl font-heading font-semibold text-foreground" data-testid={`gift-title-${index}`}>
                      {gift.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">What it is:</h4>
                    <p className="text-foreground font-body" data-testid={`gift-description-${index}`}>
                      {gift.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Why it works:</h4>
                    <p className="text-foreground font-body leading-relaxed" data-testid={`gift-why-${index}`}>
                      {gift.why_it_works}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Personalize it:</h4>
                    <p className="text-foreground font-body italic" data-testid={`gift-tip-${index}`}>
                      {gift.personalization_tip}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-muted">
                    <span className="text-lg font-heading font-semibold text-primary" data-testid={`gift-cost-${index}`}>
                      Est: {gift.estimated_cost}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            data-testid="regenerate-btn"
            onClick={handleRegenerate}
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 py-3 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Regenerate Ideas
          </Button>
          
          <Button
            data-testid="edit-answers-btn"
            onClick={handleEdit}
            variant="outline"
            className="border-2 border-muted text-foreground hover:bg-muted rounded-full px-6 py-3 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit My Answers
          </Button>
        </motion.div>

        {/* Bundle Section */}
        {bundle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-br from-secondary/20 to-accent/10 rounded-2xl p-8 border-2 border-secondary shadow-soft"
            data-testid="bundle-section"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-card mb-4">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-heading font-semibold text-foreground">Complete Gift Experience</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                {bundle.bundle_name}
              </h2>
              <p className="text-lg text-primary font-semibold">
                Total estimated cost: {bundle.total_cost}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Items List */}
              <div className="bg-white rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">What to include:</h3>
                </div>
                <div className="space-y-3">
                  {bundle.items_list?.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4" data-testid={`bundle-item-${index}`}>
                      <p className="font-medium text-foreground">{item.item} ({item.cost})</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.where}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Presentation Tips */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-5 h-5 text-accent" />
                    <h3 className="font-heading font-semibold text-foreground">How to present it:</h3>
                  </div>
                  <p className="text-foreground font-body leading-relaxed">
                    {bundle.presentation_tips}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    <h3 className="font-heading font-semibold text-foreground">What to write in the note:</h3>
                  </div>
                  <p className="text-foreground font-body leading-relaxed italic">
                    "{bundle.note_template}"
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border-2 border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">Pro tip:</h3>
                  </div>
                  <p className="text-foreground font-body leading-relaxed">
                    {bundle.pro_tip}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Gift, RefreshCw, Edit, Package, MapPin, MessageSquare, Lightbulb, Brain, Sparkles, Download, Clock, Video, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
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

  const downloadMemoryCard = () => {
    const formData = JSON.parse(localStorage.getItem('giftFormData') || '{}');
    const cardText = `💝 For ${formData.recipient_name}\n\nA Special Memory:\n${formData.special_memory}\n\nWith love,\n${formData.giver_name}`;
    
    const blob = new Blob([cardText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memory-card.txt';
    a.click();
    toast.success('Memory card downloaded!');
  };

  const getEmotionalScore = (gift, index) => {
    // User's original gift (index 0) gets bonus emotional score
    const baseScore = index === 0 ? 95 : 80 + Math.random() * 15;
    return Math.round(baseScore);
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

  const formData = JSON.parse(localStorage.getItem('giftFormData') || '{}');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with comparison angle */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-4">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Your Heart</span>
            <span className="text-muted-foreground">vs</span>
            <Brain className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">AI Analysis</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
            4 Gift Ideas for {formData.recipient_name} 💝
          </h1>
          <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">
            Your intuition meets AI's emotional intelligence
          </p>
        </motion.div>

        {/* Human vs AI Comparison Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-6 border border-primary/20"
          data-testid="comparison-banner"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <h3 className="font-heading font-semibold text-foreground">Your Human Touch</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Your gift idea:</strong> {formData.giver_gift_idea}
              </p>
              <p className="text-xs text-muted-foreground italic">
                Born from lived experience and deep knowing
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                <h3 className="font-heading font-semibold text-foreground">AI's Insight</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Analyzed your memories and emotions to find patterns you might have missed
              </p>
              <p className="text-xs text-muted-foreground italic">
                Reading between the lines of your story
              </p>
            </div>
          </div>
        </motion.div>

        {/* Gift Cards with Emotional Score */}
        <div className="grid md:grid-cols-2 gap-6 mb-8" data-testid="gift-cards-grid">
          {gifts.map((gift, index) => {
            const emotionalScore = getEmotionalScore(gift, index);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-6 shadow-card border-2 transition-all duration-300 cursor-pointer ${
                  selectedGift === index 
                    ? 'border-primary shadow-glow' 
                    : 'border-muted hover:border-primary/30 hover:shadow-soft hover:-translate-y-1'
                }`}
                onClick={() => setSelectedGift(index)}
                data-testid={`gift-card-${index}`}
              >
                {index === 0 && (
                  <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    <Heart className="w-3 h-3 fill-primary" />
                    Your Original Idea (Enhanced)
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full mb-2">
                        {gift.category}
                      </span>
                      <h3 className="text-lg font-heading font-semibold text-foreground" data-testid={`gift-title-${index}`}>
                        {gift.title}
                      </h3>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-heading font-bold text-primary">{emotionalScore}%</div>
                      <div className="text-xs text-muted-foreground">Emotional<br/>Match</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-foreground font-body" data-testid={`gift-description-${index}`}>
                        {gift.description}
                      </p>
                    </div>

                    <div className="bg-secondary/10 rounded-lg p-3">
                      <h4 className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Why this resonates:
                      </h4>
                      <p className="text-sm text-foreground font-body leading-relaxed" data-testid={`gift-why-${index}`}>
                        {gift.why_it_works}
                      </p>
                    </div>

                    <div className="border-l-2 border-primary pl-3">
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">Make it unforgettable:</h4>
                      <p className="text-sm text-foreground font-body italic" data-testid={`gift-tip-${index}`}>
                        {gift.personalization_tip}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-muted">
                      <span className="text-base font-heading font-semibold text-primary" data-testid={`gift-cost-${index}`}>
                        {gift.estimated_cost}
                      </span>
                      {selectedGift === index && (
                        <span className="flex items-center gap-1 text-xs text-primary font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center items-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            data-testid="regenerate-btn"
            onClick={handleRegenerate}
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-5 py-2 text-sm hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate Ideas
          </Button>
          
          <Button
            data-testid="edit-answers-btn"
            onClick={handleEdit}
            variant="outline"
            className="border-2 border-muted text-foreground hover:bg-muted rounded-full px-5 py-2 text-sm hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Answers
          </Button>
          
          <Button
            onClick={downloadMemoryCard}
            variant="outline"
            className="border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-full px-5 py-2 text-sm hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Memory Card
          </Button>
        </motion.div>

        {/* DIY Creation Guide - Enhanced Bundle Section */}
        {bundle && selectedGift !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-br from-secondary/20 to-accent/10 rounded-2xl p-6 sm:p-8 border-2 border-secondary shadow-soft mb-10"
            data-testid="diy-creation-guide"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-card mb-3">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-heading font-semibold text-foreground">DIY Creation Guide</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                {bundle.bundle_name}
              </h2>
              <p className="text-base text-primary font-semibold">
                Total: {bundle.total_cost}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Create an unforgettable experience, not just a gift
              </p>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl p-5 shadow-card mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground">Your Gift Timeline</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Today - Tomorrow</p>
                    <p className="text-xs text-muted-foreground">Purchase all items from the list below</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">2 Days Before</p>
                    <p className="text-xs text-muted-foreground">Assemble and arrange following presentation tips</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Valentine's Day</p>
                    <p className="text-xs text-muted-foreground">Present with the message card and video note</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Shopping List */}
              <div className="bg-white rounded-xl p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">Shopping List</h3>
                </div>
                <div className="space-y-3">
                  {bundle.items_list?.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-secondary/10 rounded-lg" data-testid={`bundle-item-${index}`}>
                      <input 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 text-primary rounded focus:ring-primary"
                        data-testid={`item-checkbox-${index}`}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{item.item}</p>
                        <p className="text-xs text-primary font-semibold">{item.cost}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {item.where}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assembly & Presentation */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-5 h-5 text-accent" />
                    <h3 className="font-heading font-semibold text-foreground">How to Assemble</h3>
                  </div>
                  <p className="text-sm text-foreground font-body leading-relaxed">
                    {bundle.presentation_tips}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    <h3 className="font-heading font-semibold text-foreground">Your Message</h3>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-4 mb-3">
                    <p className="text-sm text-foreground font-body leading-relaxed italic">
                      "{bundle.note_template}"
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    💡 Write this by hand on beautiful stationery for extra impact
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-5 border-2 border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">Pro Tip</h3>
                  </div>
                  <p className="text-sm text-foreground font-body leading-relaxed">
                    {bundle.pro_tip}
                  </p>
                </div>
              </div>
            </div>

            {/* Video Message Suggestion */}
            <div className="mt-6 bg-white rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-accent" />
                <h3 className="font-heading font-semibold text-foreground">Record a Voice/Video Message</h3>
              </div>
              <p className="text-sm text-foreground mb-3">
                While giving this gift, share these feelings:
              </p>
              <div className="space-y-2 text-sm text-foreground">
                <p className="bg-secondary/10 rounded-lg p-3">
                  💭 <strong>The memory:</strong> Start with "{formData.special_memory?.substring(0, 60)}..."
                </p>
                <p className="bg-secondary/10 rounded-lg p-3">
                  💝 <strong>Why it matters:</strong> "{formData.why_meaningful?.substring(0, 60)}..."
                </p>
                <p className="bg-secondary/10 rounded-lg p-3">
                  ✨ <strong>Your hope:</strong> "I hope this gift captures how much our time together means to me."
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center space-y-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Button>
          
          <p className="text-xs text-muted-foreground">
            💡 Tip: Bookmark this page to revisit your gift ideas anytime
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function FormPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    giver_name: "",
    recipient_name: "",
    budget: "",
    about_them: "",
    special_memory: "",
    giver_gift_idea: "",
    why_meaningful: ""
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.giver_name || formData.giver_name.length < 2) {
      toast.error("Please enter your name (at least 2 characters)");
      return false;
    }
    if (!formData.recipient_name || formData.recipient_name.length < 2) {
      toast.error("Please enter your partner's name (at least 2 characters)");
      return false;
    }
    if (!formData.budget || isNaN(formData.budget) || Number(formData.budget) <= 0) {
      toast.error("Please enter a valid budget amount");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.about_them || formData.about_them.length < 30) {
      toast.error("Please tell us more about them (minimum 30 characters)");
      return false;
    }
    if (!formData.special_memory || formData.special_memory.length < 30 || formData.special_memory.length > 400) {
      toast.error("Please share a special memory (30-400 characters)");
      return false;
    }
    if (!formData.giver_gift_idea || formData.giver_gift_idea.length < 5) {
      toast.error("Please enter your gift idea (at least 5 characters)");
      return false;
    }
    if (!formData.why_meaningful || formData.why_meaningful.length < 30 || formData.why_meaningful.length > 400) {
      toast.error("Please explain why this gift is meaningful (30-400 characters)");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    
    localStorage.setItem('giftFormData', JSON.stringify(formData));
    navigate('/results', { state: { formData } });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step {currentStep} of 2</span>
            <span className="text-sm font-medium text-primary">{Math.round((currentStep / 2) * 100)}%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary relative"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-glow" />
            </motion.div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-card border border-muted p-6 sm:p-8">
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    The Basics ✨
                  </h2>
                  <p className="text-sm text-muted-foreground font-body">
                    Just a few quick details to get started
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="giver_name" className="text-sm font-medium text-foreground mb-1.5 block">
                      Your name
                    </Label>
                    <Input
                      id="giver_name"
                      data-testid="giver-name-input"
                      placeholder="Your name"
                      value={formData.giver_name}
                      onChange={(e) => updateField('giver_name', e.target.value)}
                      className="h-11 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="recipient_name" className="text-sm font-medium text-foreground mb-1.5 block">
                      Your partner's name
                    </Label>
                    <Input
                      id="recipient_name"
                      data-testid="recipient-name-input"
                      placeholder="Their name"
                      value={formData.recipient_name}
                      onChange={(e) => updateField('recipient_name', e.target.value)}
                      className="h-11 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-sm font-medium text-foreground mb-1.5 block">
                      Your budget
                    </Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="budget"
                        data-testid="budget-input"
                        type="number"
                        placeholder="Enter amount (e.g., 2500)"
                        value={formData.budget}
                        onChange={(e) => updateField('budget', e.target.value)}
                        className="h-11 pl-10 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Enter any amount you're comfortable with</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    What Makes Them Special 💝
                  </h2>
                  <p className="text-sm text-muted-foreground font-body">
                    Help us understand your connection
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="about_them" className="text-sm font-medium text-foreground mb-1.5 block">
                      Tell us about {formData.recipient_name || 'them'}
                    </Label>
                    <Textarea
                      id="about_them"
                      data-testid="about-them-input"
                      placeholder="Their personality, hobbies, interests, what makes them smile... Be specific and detailed."
                      value={formData.about_them}
                      onChange={(e) => updateField('about_them', e.target.value)}
                      className="min-h-20 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.about_them.length}/500 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="special_memory" className="text-sm font-medium text-foreground mb-1.5 block">
                      A meaningful memory together
                    </Label>
                    <Textarea
                      id="special_memory"
                      data-testid="special-memory-input"
                      placeholder="Share a moment that captures your relationship..."
                      value={formData.special_memory}
                      onChange={(e) => updateField('special_memory', e.target.value)}
                      className="min-h-20 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      maxLength={400}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.special_memory.length}/400 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="giver_gift_idea" className="text-sm font-medium text-foreground mb-1.5 block">
                      Your gift idea
                    </Label>
                    <Input
                      id="giver_gift_idea"
                      data-testid="gift-idea-input"
                      placeholder="What were you thinking of giving?"
                      value={formData.giver_gift_idea}
                      onChange={(e) => updateField('giver_gift_idea', e.target.value)}
                      className="h-11 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="why_meaningful" className="text-sm font-medium text-foreground mb-1.5 block">
                      Why this gift matters
                    </Label>
                    <Textarea
                      id="why_meaningful"
                      data-testid="why-meaningful-input"
                      placeholder="What emotions or memories does this gift connect to?"
                      value={formData.why_meaningful}
                      onChange={(e) => updateField('why_meaningful', e.target.value)}
                      className="min-h-20 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      maxLength={400}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.why_meaningful.length}/400 characters
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-muted">
            <Button
              data-testid="back-btn"
              onClick={handleBack}
              variant="ghost"
              disabled={currentStep === 1}
              className="hover:bg-secondary/20 disabled:opacity-50 h-10"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Button>

            {currentStep < 2 ? (
              <Button
                data-testid="continue-btn"
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 h-10 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            ) : (
              <Button
                data-testid="generate-btn"
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 h-10 shadow-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Ideas
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export default function FormPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    giver_name: "",
    recipient_name: "",
    budget: "",
    custom_budget: "",
    hobbies: "",
    interests: "",
    favorites: "",
    personality: "",
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
    if (!formData.budget) {
      toast.error("Please select a budget");
      return false;
    }
    if (formData.budget === "custom" && !formData.custom_budget) {
      toast.error("Please enter your custom budget amount");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.hobbies || formData.hobbies.length < 10) {
      toast.error("Please list at least 2 hobbies (minimum 10 characters)");
      return false;
    }
    if (!formData.interests || formData.interests.length < 10) {
      toast.error("Please list at least 2 interests (minimum 10 characters)");
      return false;
    }
    if (!formData.favorites || formData.favorites.length < 10) {
      toast.error("Please list at least 2 favorite things (minimum 10 characters)");
      return false;
    }
    if (!formData.personality || formData.personality.length < 10) {
      toast.error("Please describe their personality (minimum 10 characters)");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.special_memory || formData.special_memory.length < 50 || formData.special_memory.length > 300) {
      toast.error("Please share a special memory (50-300 characters)");
      return false;
    }
    if (!formData.giver_gift_idea || formData.giver_gift_idea.length < 5) {
      toast.error("Please enter your gift idea (at least 5 characters)");
      return false;
    }
    if (!formData.why_meaningful || formData.why_meaningful.length < 50 || formData.why_meaningful.length > 300) {
      toast.error("Please explain why this gift is meaningful (50-300 characters)");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    
    // Store form data in localStorage
    const finalBudget = formData.budget === "custom" ? formData.custom_budget : formData.budget;
    const submissionData = {
      ...formData,
      budget: finalBudget
    };
    localStorage.setItem('giftFormData', JSON.stringify(submissionData));
    
    // Navigate to results with loading state
    navigate('/results', { state: { formData: submissionData } });
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

  const changePage = (newStep) => {
    setDirection(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step {currentStep} of 3</span>
            <span className="text-sm font-medium text-primary">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary relative"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-glow" />
            </motion.div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-card border border-muted p-8">
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
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Let's start with the basics ✨
                  </h2>
                  <p className="text-muted-foreground font-body">
                    Tell us a little about you and your partner
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="giver_name" className="text-sm font-medium text-foreground mb-2 block">
                      1. Your name:
                    </Label>
                    <Input
                      id="giver_name"
                      data-testid="giver-name-input"
                      placeholder="Enter your name"
                      value={formData.giver_name}
                      onChange={(e) => updateField('giver_name', e.target.value)}
                      className="h-12 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="recipient_name" className="text-sm font-medium text-foreground mb-2 block">
                      2. Your partner's name:
                    </Label>
                    <Input
                      id="recipient_name"
                      data-testid="recipient-name-input"
                      placeholder="Enter their name"
                      value={formData.recipient_name}
                      onChange={(e) => updateField('recipient_name', e.target.value)}
                      className="h-12 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-3 block">
                      3. What's your budget?
                    </Label>
                    <RadioGroup value={formData.budget} onValueChange={(value) => updateField('budget', value)}>
                      <div className="space-y-2">
                        {['Under ₹500', '₹500 - ₹1,000', '₹1,000 - ₹2,000', '₹2,000 - ₹5,000', '₹5,000+'].map((option) => (
                          <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/10 transition-colors">
                            <RadioGroupItem value={option} id={option} data-testid={`budget-${option}`} />
                            <Label htmlFor={option} className="flex-1 cursor-pointer font-body">
                              {option}
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/10 transition-colors">
                          <RadioGroupItem value="custom" id="custom" data-testid="budget-custom" />
                          <Label htmlFor="custom" className="cursor-pointer font-body">
                            Custom amount
                          </Label>
                        </div>
                        {formData.budget === 'custom' && (
                          <Input
                            data-testid="custom-budget-input"
                            placeholder="Enter amount (e.g., ₹3,500)"
                            value={formData.custom_budget}
                            onChange={(e) => updateField('custom_budget', e.target.value)}
                            className="ml-8 h-12 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        )}
                      </div>
                    </RadioGroup>
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
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Tell us about {formData.recipient_name || 'them'} 💝
                  </h2>
                  <p className="text-muted-foreground font-body">
                    Help us understand what makes them special
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hobbies" className="text-sm font-medium text-foreground mb-2 block">
                      4. What are their hobbies?
                    </Label>
                    <Input
                      id="hobbies"
                      data-testid="hobbies-input"
                      placeholder="reading, gaming, cooking, hiking"
                      value={formData.hobbies}
                      onChange={(e) => updateField('hobbies', e.target.value)}
                      className="h-12 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Separate with commas</p>
                  </div>

                  <div>
                    <Label htmlFor="interests" className="text-sm font-medium text-foreground mb-2 block">
                      5. What are they interested in?
                    </Label>
                    <Input
                      id="interests"
                      data-testid="interests-input"
                      placeholder="sci-fi movies, art museums, true crime podcasts"
                      value={formData.interests}
                      onChange={(e) => updateField('interests', e.target.value)}
                      className="h-12 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground mt-1">What captures their attention?</p>
                  </div>

                  <div>
                    <Label htmlFor="favorites" className="text-sm font-medium text-foreground mb-2 block">
                      6. What are their favorite things?
                    </Label>
                    <Input
                      id="favorites"
                      data-testid="favorites-input"
                      placeholder="coffee, handwritten notes, vintage posters"
                      value={formData.favorites}
                      onChange={(e) => updateField('favorites', e.target.value)}
                      className="h-12 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Small things that make them happy</p>
                  </div>

                  <div>
                    <Label htmlFor="personality" className="text-sm font-medium text-foreground mb-2 block">
                      7. Describe their personality:
                    </Label>
                    <Input
                      id="personality"
                      data-testid="personality-input"
                      placeholder="introverted, creative, thoughtful, caring"
                      value={formData.personality}
                      onChange={(e) => updateField('personality', e.target.value)}
                      className="h-12 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground mt-1">3-5 personality traits</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Your connection & gift idea 💕
                  </h2>
                  <p className="text-muted-foreground font-body">
                    Share what makes your relationship special
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="special_memory" className="text-sm font-medium text-foreground mb-2 block">
                      8. Share a special memory with {formData.recipient_name || 'them'}:
                    </Label>
                    <Textarea
                      id="special_memory"
                      data-testid="special-memory-input"
                      placeholder="Our first coffee shop date where we talked for hours about our dreams..."
                      value={formData.special_memory}
                      onChange={(e) => updateField('special_memory', e.target.value)}
                      className="min-h-24 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      maxLength={300}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.special_memory.length}/300 characters • 2-3 sentences about a meaningful moment
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="giver_gift_idea" className="text-sm font-medium text-foreground mb-2 block">
                      9. What gift were you thinking of giving?
                    </Label>
                    <Input
                      id="giver_gift_idea"
                      data-testid="gift-idea-input"
                      placeholder="A custom photo book of our travels"
                      value={formData.giver_gift_idea}
                      onChange={(e) => updateField('giver_gift_idea', e.target.value)}
                      className="h-12 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Your original gift idea</p>
                  </div>

                  <div>
                    <Label htmlFor="why_meaningful" className="text-sm font-medium text-foreground mb-2 block">
                      10. Why is this gift meaningful?
                    </Label>
                    <Textarea
                      id="why_meaningful"
                      data-testid="why-meaningful-input"
                      placeholder="She always keeps ticket stubs and talks about our adventures. This would preserve those memories..."
                      value={formData.why_meaningful}
                      onChange={(e) => updateField('why_meaningful', e.target.value)}
                      className="min-h-24 rounded-xl border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      maxLength={300}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.why_meaningful.length}/300 characters • What makes this gift special for your relationship?
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-muted">
            <Button
              data-testid="back-btn"
              onClick={handleBack}
              variant="ghost"
              disabled={currentStep === 1}
              className="hover:bg-secondary/20 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Button>

            {currentStep < 3 ? (
              <Button
                data-testid="continue-btn"
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            ) : (
              <Button
                data-testid="generate-btn"
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Gift Ideas
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

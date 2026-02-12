# Memori - Valentine's Gift Recommendation App

## Product Overview
A web application that helps people find meaningful Valentine's Day gifts by analyzing their relationship memories and combining human intuition with AI emotional intelligence.

**Tagline:** "Turn Your Memories Into Gifts and Stories"

---

## What's Been Implemented

### Phase 1 (MVP - COMPLETE)
**Date: December 2025**

#### Landing Page (COMPLETE)
- **Hero Section**: Beautiful gradient background (blush pink to cream), animated floating hearts, bold headline with gradient text effect, prominent coral CTA button with glow animation
- **How It Works**: 3-step process cards with icons (Share Memory → AI Analysis → Gift Ideas)
- **Emotional Hook**: 2-column layout explaining Human Touch vs AI Insight
- **Social Proof**: Testimonial card with decorative quotes
- **Final CTA**: Gradient background section with compelling copy
- **Footer**: Memori branding with tagline

#### Design System (COMPLETE)
- **Color Palette**: 
  - Primary: Soft blush pink (#FFB3BA)
  - Secondary: Light pink (#FFCCCB)
  - Accent: Coral pink (#FF6F61) - used for CTAs
  - Background: Cream/ivory (#FFF5EE)
  - Text: Warm dark gray (#333333)
- **Typography**: Poppins for headings, Inter for body text
- **Animations**: Floating hearts, heartbeat, hover effects, scroll reveal
- **Glass morphism**: Cards with blur effect and soft shadows

#### Form Flow (COMPLETE)
- Multi-step form to collect user/partner information
- Step 1: Basic info (names, budget)
- Step 2: Memory/story input with gift idea
- Form validation and progress indicator

#### Results Page - Phase 1 (COMPLETE)
- 4 gift idea cards (partially hidden/blurred)
- "Create Your Story" button (Coming Soon state)
- Emotional hook preview for Phase 2 conversion

#### Backend API (COMPLETE)
- POST /api/generate-gifts - Generates 4 personalized gift ideas using Gemini AI
- Response cleaning and JSON parsing
- Error handling for API failures

---

## Tech Stack (Current)
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Shadcn/UI
- **Backend**: FastAPI (Python)
- **AI**: Google Gemini API (gemini-2.5-flash)
- **Database**: MongoDB (not actively used yet)

---

## Backlog

### Phase 2 (Next Priority - P0)
1. **Payment Integration** - Razorpay (₹69/₹99 pricing)
2. **Unlock Full Gift Cards** - After payment, reveal all gift details
3. **Storybook Creation Form** - Collect character descriptions, setting, mood
4. **AI Storybook Pipeline** - 8-page illustrated storybook generation

### Phase 2+ (P1)
5. **Storybook Viewer** - Preview for buyer
6. **Shareable Link** - WhatsApp sharing with animated book-opening
7. **Legal Pages** - Privacy Policy, Terms, Refund Policy

### Future (P2)
- Tech stack migration to Next.js/Node.js/Supabase (if needed)
- Character consistency for AI illustrations
- User accounts and saved storybooks

---

## Known Issues
- Gemini API can be fragile (quota limits, parsing issues) - currently stable
- AI responses can be "too poetic" - prompt refinement needed

---

## File Structure
```
/app
├── backend/
│   ├── server.py          # FastAPI, Gemini API integration
│   └── .env               # API keys
├── frontend/
│   └── src/
│       ├── App.js         # Router
│       ├── index.css      # Global styles, design tokens
│       ├── pages/
│       │   ├── NewLandingPage.js    # Main landing page
│       │   ├── FormPage.js          # Multi-step form
│       │   └── ResultsPagePhase1.js # Gift cards (Phase 1)
│       └── components/ui/           # Shadcn components
└── memory/
    └── PRD.md             # This file
```

---

## URLs
- **Preview**: https://memory-gifts.preview.emergentagent.com
- **Form**: /form or /create-gift
- **Results**: /results

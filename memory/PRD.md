# Memori - Valentine's Gift Recommendation App

## Product Overview
A web application that helps people find meaningful Valentine's Day gifts by analyzing their relationship memories and combining human intuition with AI emotional intelligence.

**Tagline:** "Turn Your Memories Into Gifts and Stories"

---

## What's Been Implemented

### Phase 1 (MVP - COMPLETE)
**Date: December 2025**

#### Landing Page (COMPLETE - UPDATED)
- **Hero Section**: Deep red gradient, animated floating hearts, countdown to Valentine's 2026, bold headline with crimson gradient text, prominent deep red CTA button with glow animation
- **How It Works**: 3-step cards with deep red icons, numbered badges, pink-tinted backgrounds
- **Emotional Hook**: 2-column layout - Human Touch vs AI Insight with deep red accents
- **Social Proof**: Testimonial card with star ratings
- **Final CTA**: Blood red/crimson gradient background with animated hearts, white CTA button
- **Footer**: Memori branding with © 2026

#### Design System (UPDATED - Deep Red Theme)
- **Primary Colors**: 
  - Love Red: #C41E3A
  - Blood Red: #8B0000
  - Wine Red: #722F37
  - Passion Red: #DC143C
  - Rose Red: #E63950
- **Background**: Soft cream/ivory (#FFF5F5)
- **Text**: Warm dark gray (#2D2D2D)
- **Typography**: Poppins for headings, Inter for body text
- **Animations**: Floating hearts, heartbeat, scroll reveal, pulse glow

#### Netlify Deployment (READY)
- `netlify.toml` - Build configuration
- `public/_redirects` - SPA routing
- `NETLIFY_DEPLOY.md` - Deployment instructions

#### Backend API (COMPLETE)
- POST /api/generate-gifts - Uses **gemini-2.5-flash** model
- Natural, conversational system prompt
- JSON extraction and validation
- Error handling

---

## Tech Stack (Current)
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Shadcn/UI
- **Backend**: FastAPI (Python)
- **AI**: Google Gemini API (gemini-2.5-flash)
- **Deployment**: Netlify (frontend), TBD (backend)

---

## Files for Netlify Deployment
```
/app/frontend/
├── netlify.toml          # Build config
├── public/_redirects     # SPA routing
└── NETLIFY_DEPLOY.md     # Instructions
```

**Deploy Steps:**
1. `cd frontend && yarn build`
2. Deploy `build` folder to Netlify
3. Set env var: `REACT_APP_BACKEND_URL`

---

## Backlog

### Phase 2 (Next Priority - P0)
1. **Razorpay Payment Integration** - ₹69/₹99 pricing
2. **Backend Hosting** - Deploy FastAPI to Render/Railway
3. **Unlock Full Gift Cards** - Post-payment reveal
4. **Storybook Creation Form**

### Phase 2+ (P1)
5. **AI Storybook Pipeline** - 8-page illustrated storybook
6. **Storybook Viewer & Sharing**
7. **Legal Pages**

---

## URLs
- **Preview**: https://memory-gifts.preview.emergentagent.com
- **Form**: /form or /create-gift
- **Results**: /results

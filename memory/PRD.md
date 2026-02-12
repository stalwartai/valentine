# Memori - Valentine's Gift Recommendation App

## Product Overview
A web application that helps people find meaningful Valentine's Day gifts by analyzing their relationship memories and combining human intuition with AI emotional intelligence.

**Tagline:** "Turn Your Memories Into Gifts and Stories"

---

## What's Been Implemented

### Phase 1 (MVP - COMPLETE)
**Date: December 2025**

#### Landing Page (COMPLETE - FINAL)
- **Real-Time Countdown Clock** - Shows Days : Hours : Mins : Secs to Valentine's Day 2026
- **Hero Section**: Soft pink gradient, animated floating hearts, countdown timer, soft rose gradient text, minimal CTA button
- **How It Works**: 3-step cards with soft pink icons and backgrounds
- **Emotional Hook**: 2-column layout with clean soft shadows
- **Social Proof**: Testimonial card with heart ratings
- **Final CTA**: Soft pink gradient (not harsh red), clean white CTA button
- **Footer**: Minimal © 2026 branding

#### Design System (FINAL - Soft Pink Theme)
- **Primary Colors**: 
  - Rose Pink: #E75480
  - Soft Rose: #FF8FA3
  - Blush: #FFB3C1
  - Light Pink: #FFE8ED
- **Background**: Soft pink (#FFF5F7)
- **Text**: Warm gray (#3D3D3D)
- **Typography**: Poppins for headings, Inter for body
- **Animations**: Soft floating hearts, gentle scroll reveals, subtle pulse glow

#### Netlify Deployment (READY)
Files created:
- `frontend/netlify.toml` - Build configuration
- `frontend/public/_redirects` - SPA routing
- `frontend/NETLIFY_DEPLOY.md` - Complete deployment guide

---

## Netlify Deployment Steps

### Quick Deploy:
1. `cd frontend && yarn build`
2. Go to https://app.netlify.com
3. Drag the `frontend/build` folder
4. Done!

### With GitHub (for auto-updates):
1. Push to GitHub
2. Connect repo to Netlify
3. Set base directory: `frontend`
4. Set build command: `yarn build`
5. Set publish: `frontend/build`

---

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Shadcn/UI
- **Backend**: FastAPI (Python)
- **AI**: Google Gemini API (gemini-2.5-flash)
- **Deployment**: Netlify (frontend), TBD (backend)

---

## Backlog

### Phase 2 (P0)
1. **Backend Hosting** - Deploy FastAPI
2. **Razorpay Integration** - ₹69/₹99 pricing
3. **Unlock Gift Cards** - Post-payment

### Phase 2+ (P1)
4. **AI Storybook** - 8-page illustrated stories
5. **Sharing Feature** - WhatsApp preview links

---

## URLs
- **Preview**: https://memory-gifts.preview.emergentagent.com
- **Form**: /form
- **Results**: /results

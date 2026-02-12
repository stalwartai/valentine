# Netlify Deployment Instructions for Memori

## Quick Deploy Steps

### 1. Prepare for Deployment
Make sure you have the built frontend ready:
```bash
cd frontend
yarn install
yarn build
```

### 2. Deploy to Netlify

**Option A: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=build
```

**Option B: Manual Upload**
1. Go to https://app.netlify.com
2. Drag and drop the `frontend/build` folder to deploy

**Option C: Git Integration**
1. Push code to GitHub
2. Connect repo to Netlify
3. Set build settings:
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/build`

### 3. Environment Variables (Set in Netlify Dashboard)
Go to Site settings > Environment variables:
```
REACT_APP_BACKEND_URL=https://your-backend-api.com
```

### 4. Backend API (for later)
For the backend, you'll need:
- Render.com, Railway, or Fly.io for FastAPI hosting
- Set the GEMINI_API_KEY in backend environment
- Update the `REACT_APP_BACKEND_URL` in Netlify to point to your backend

## Current State
- Frontend: Ready for static deployment (landing page works without backend)
- Backend: Will be needed for gift generation feature

## Files Created for Netlify
- `netlify.toml` - Build configuration
- `public/_redirects` - SPA routing support

## Notes
- The landing page is fully static and will work on Netlify
- Gift generation requires backend API (Phase 2)
- Update the API redirects in netlify.toml when backend is ready

# Complete Netlify Deployment Guide for Memori

## Quick Answer: What You Need to Do

**You only deploy the `frontend` folder.** The backend is separate and needs its own hosting (we'll discuss that later).

---

## Step-by-Step: Deploy to Netlify

### Option 1: Drag & Drop (Easiest - No GitHub needed)

1. **Build the frontend locally:**
   ```bash
   cd frontend
   yarn install     # Install dependencies
   yarn build       # Creates 'build' folder
   ```

2. **Go to Netlify:**
   - Visit https://app.netlify.com
   - Sign up or log in (free account works)

3. **Deploy:**
   - On dashboard, you'll see "Drag and drop your site output folder here"
   - Drag the entire `frontend/build` folder there
   - Wait 30 seconds - your site is live!

4. **Get your URL:**
   - Netlify gives you a URL like `random-name-123.netlify.app`
   - You can change this in Site Settings > Domain management

---

### Option 2: GitHub Integration (Recommended for updates)

1. **Push code to GitHub:**
   - Create a new repository on GitHub
   - Push your entire project

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" > "Import an existing project"
   - Select "GitHub"
   - Authorize Netlify to access your GitHub
   - Select your repository

3. **Configure build settings:**
   ```
   Base directory:     frontend
   Build command:      yarn build
   Publish directory:  frontend/build
   ```

4. **Click "Deploy site"**

5. **Automatic deploys:**
   - Every time you push to GitHub, Netlify rebuilds automatically!

---

## After Deployment: Environment Variables

Since your frontend needs to call the backend API, you need to set this:

1. Go to your Netlify site dashboard
2. Click **Site settings** > **Environment variables**
3. Add this variable:
   ```
   Key:   REACT_APP_BACKEND_URL
   Value: https://your-backend-url.com
   ```

**Note:** For Phase 1 (landing page only), you don't need this yet. The landing page works without the backend.

---

## File Structure Explanation

```
your-project/
├── frontend/          ← THIS is what Netlify deploys
│   ├── build/         ← The compiled site (created by yarn build)
│   ├── src/           ← Your React source code
│   ├── public/        ← Static files
│   ├── netlify.toml   ← Netlify config (I already created this)
│   └── package.json
│
└── backend/           ← Separate - NOT deployed to Netlify
    └── server.py
```

---

## What About the Backend?

Netlify only hosts **static sites** (frontend). For your FastAPI backend, you need separate hosting:

**Free Options:**
- **Render.com** - Free tier, auto-deploys from GitHub
- **Railway.app** - Free starter credits
- **Fly.io** - Free tier available

**When to deploy backend:**
- Phase 1 (current): Not needed - landing page is static
- Phase 2 (gift generation): You'll need the backend running

---

## Custom Domain (Optional)

If you have your own domain (e.g., memori.in):

1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS instructions (usually add CNAME record)

---

## Troubleshooting

**"Page not found" on refresh:**
- The `_redirects` file I created handles this
- It redirects all routes to index.html for React Router

**Build fails:**
- Make sure you're in the `frontend` folder
- Run `yarn install` first
- Check Node version (should be 18+)

**API calls not working:**
- Check REACT_APP_BACKEND_URL is set correctly
- Make sure backend is running and accessible

---

## Summary

| Step | Action |
|------|--------|
| 1 | `cd frontend && yarn build` |
| 2 | Go to netlify.com |
| 3 | Drag `frontend/build` folder OR connect GitHub |
| 4 | Set REACT_APP_BACKEND_URL (when backend is ready) |
| 5 | Done! |

**Total time:** 5-10 minutes

---

## Questions?

- **Do I need to pay?** No, Netlify free tier is enough
- **Can I change the URL?** Yes, in Site settings > Domain management
- **How do I update?** Either re-drag the build folder, or push to GitHub (if connected)

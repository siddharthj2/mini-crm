# Render Deployment Guide - MiniCRM

## 🚨 Frontend 404 Issue Fixed

### Problem
Getting "Not Found" on `https://mini-crm-1-gmzf.onrender.com/dashboard` because React Router routes aren't working on Render.

### Solution Applied
1. ✅ Removed `vercel.json` (Vercel-specific)
2. ✅ Added `render.yaml` (Render-specific)
3. ✅ Added `_redirects` file in `public/` directory

## 📋 Render Configuration Files

### 1. Frontend (`frontend/render.yaml`)
```yaml
services:
  - type: web
    name: minicrm-frontend
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### 2. Frontend (`frontend/public/_redirects`)
```
/*    /index.html   200
```

## 🚀 Deployment Steps

### Frontend (mini-crm-1-gmzf.onrender.com)
1. **Connect GitHub repo** to Render
2. **Select `frontend` folder** as root directory
3. **Set build command**: `npm run build`
4. **Set publish directory**: `dist`
5. **Add environment variable**:
   ```
   VITE_API_URL=https://mini-crm-eut5.onrender.com/api
   ```

### Backend (mini-crm-eut5.onrender.com)
1. **Connect GitHub repo** to Render
2. **Select `backend` folder** as root directory
3. **Set build command**: `npm install`
4. **Set start command**: `npm start`
5. **Add environment variables**:
   ```
   MONGO_URI=mongodb+srv://siddharthjindal456_db_user:<password>@mini-crm.oixhhsa.mongodb.net/minicrm
   REDIS_URI=redis://default:password@redis.railway.internal:6379
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=https://mini-crm-eut5.onrender.com/auth/google/callback
   FRONTEND_ORIGIN=https://mini-crm-1-gmzf.onrender.com
   PORT=8000
   NODE_ENV=production
   SESSION_SECRET=your_strong_session_secret
   GROQ_API_KEY=your_groq_api_key
   ```

## 🔧 Google OAuth Configuration

### Authorized JavaScript Origins
```
https://mini-crm-1-gmzf.onrender.com
http://localhost:5173
```

### Authorized Redirect URIs
```
https://mini-crm-eut5.onrender.com/auth/google/callback
http://localhost:8000/auth/google/callback
```

## ✅ Expected Flow After Fix

1. **User visits**: `https://mini-crm-1-gmzf.onrender.com`
2. **Clicks login** → Redirects to: `https://mini-crm-eut5.onrender.com/auth/google`
3. **Google OAuth** → User logs in
4. **Callback** → `https://mini-crm-eut5.onrender.com/auth/google/callback`
5. **Redirect** → `https://mini-crm-1-gmzf.onrender.com/dashboard` ✅

## 🧪 Testing

### 1. Test Frontend Routes
- `https://mini-crm-1-gmzf.onrender.com/` → Should work
- `https://mini-crm-1-gmzf.onrender.com/dashboard` → Should work (no more 404)
- `https://mini-crm-1-gmzf.onrender.com/customers` → Should work

### 2. Test Backend
- `https://mini-crm-eut5.onrender.com/health` → Should return `{"status":"OK"}`
- `https://mini-crm-eut5.onrender.com/api/docs` → Should show Swagger UI

### 3. Test OAuth Flow
1. Go to frontend
2. Click "Login with Google"
3. Complete OAuth
4. Should redirect to frontend dashboard

## 🔄 Redeploy Steps

1. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "Fix Render routing configuration"
   git push origin main
   ```

2. **Redeploy on Render**:
   - Frontend will auto-deploy
   - Backend will auto-deploy

3. **Test the flow** from frontend URL

## 🎯 The Fix

The `_redirects` file tells Render to serve `index.html` for all routes, allowing React Router to handle client-side routing. This is the standard solution for SPA deployment on static hosting platforms.

**Your 404 issue should be resolved after redeployment!**

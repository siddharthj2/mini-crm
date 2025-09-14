# Troubleshooting Guide - MiniCRM Deployment

## 🚨 Current Issue: 404 on Backend Dashboard

### Problem
You're getting "Not Found" when accessing `https://mini-crm-1-gmzf.onrender.com/dashboard` after login.

### Root Cause
After Google OAuth login, you're being redirected to the **backend** URL instead of the **frontend** URL.

## ✅ Solutions Applied

### 1. **Fixed OAuth Redirect**
- Added debug logging to see what's happening
- Ensured proper frontend URL redirection
- Added fallback route for backend dashboard access

### 2. **Environment Variables Check**
Make sure your Render backend has these environment variables:

```bash
FRONTEND_ORIGIN=https://your-frontend-domain.vercel.app
GOOGLE_CALLBACK_URL=https://mini-crm-1-gmzf.onrender.com/auth/google/callback
```

## 🔍 Debugging Steps

### 1. **Check Environment Variables in Render**
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Verify these variables exist:
   - `FRONTEND_ORIGIN` = Your Vercel frontend URL
   - `GOOGLE_CALLBACK_URL` = `https://mini-crm-1-gmzf.onrender.com/auth/google/callback`

### 2. **Check Render Logs**
1. In Render dashboard, go to "Logs" tab
2. Look for these debug messages after login:
   ```
   OAuth callback - Frontend Origin: https://your-frontend.vercel.app
   OAuth callback - User: your-email@gmail.com
   Redirecting to: https://your-frontend.vercel.app/dashboard
   ```

### 3. **Test the Flow**
1. Go to your **frontend** URL (Vercel)
2. Click "Login with Google"
3. Complete OAuth flow
4. You should be redirected to `https://your-frontend.vercel.app/dashboard`

## 🛠️ Quick Fixes

### Fix 1: Update Environment Variables
In Render backend environment variables:
```
FRONTEND_ORIGIN=https://your-actual-frontend-url.vercel.app
```

### Fix 2: Test Backend Health
Visit: `https://mini-crm-1-gmzf.onrender.com/health`
Should return: `{"status":"OK","timestamp":"..."}`

### Fix 3: Test OAuth Flow
1. Visit: `https://mini-crm-1-gmzf.onrender.com/auth/google`
2. Complete login
3. Should redirect to your frontend dashboard

## 📋 Complete Environment Variables

### Backend (Render)
```bash
MONGO_URI=mongodb+srv://siddharthjindal456_db_user:<password>@mini-crm.oixhhsa.mongodb.net/minicrm
REDIS_URI=redis://default:password@redis.railway.internal:6379
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://mini-crm-1-gmzf.onrender.com/auth/google/callback
FRONTEND_ORIGIN=https://your-frontend.vercel.app
PORT=8000
NODE_ENV=production
SESSION_SECRET=your_strong_session_secret
GROQ_API_KEY=your_groq_api_key
```

### Frontend (Vercel)
```bash
VITE_API_URL=https://mini-crm-1-gmzf.onrender.com/api
```

## 🔧 Google OAuth Configuration

### Authorized JavaScript Origins
```
https://your-frontend.vercel.app
http://localhost:5173
```

### Authorized Redirect URIs
```
https://mini-crm-1-gmzf.onrender.com/auth/google/callback
http://localhost:8000/auth/google/callback
```

## 🚀 Expected Flow

1. **User visits frontend** → `https://your-frontend.vercel.app`
2. **Clicks login** → Redirects to `https://mini-crm-1-gmzf.onrender.com/auth/google`
3. **Google OAuth** → User logs in with Google
4. **Callback** → `https://mini-crm-1-gmzf.onrender.com/auth/google/callback`
5. **Redirect** → `https://your-frontend.vercel.app/dashboard` ✅

## ❌ Common Mistakes

1. **Wrong FRONTEND_ORIGIN** - Must match your Vercel URL exactly
2. **Missing environment variables** - Check Render dashboard
3. **Wrong Google OAuth URLs** - Must match your actual domains
4. **Accessing backend URL directly** - Always use frontend URL

## 📞 Next Steps

1. **Update environment variables** in Render
2. **Redeploy backend** if needed
3. **Test the complete flow** from frontend
4. **Check logs** for debug messages

The issue should be resolved once you set the correct `FRONTEND_ORIGIN` environment variable in Render!

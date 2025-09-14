# Production Deployment Guide - MiniCRM

## 🚨 Critical Fixes Applied

### Cross-Domain Authentication Issues Fixed:
1. **CORS Configuration**: Updated to handle multiple origins (local + production)
2. **Session Cookies**: Configured for cross-domain with `sameSite: 'none'` in production
3. **Environment Variables**: All hardcoded URLs replaced with env vars
4. **Google OAuth**: Callback URL now uses environment variable

## 📋 Environment Variables Setup

### Backend (Render/Railway) Environment Variables:
```bash
# Database Configuration
MONGO_URI=mongodb+srv://siddharthjindal456_db_user:<password>@mini-crm.oixhhsa.mongodb.net/minicrm
REDIS_URI=redis://default:password@redis.railway.internal:6379

# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=https://your-backend-domain.onrender.com/auth/google/callback

# Frontend Configuration
FRONTEND_ORIGIN=https://your-frontend-domain.vercel.app

# Server Configuration
PORT=8000
NODE_ENV=production

# Session Configuration
SESSION_SECRET=your_strong_session_secret_here

# AI Configuration
GROQ_API_KEY=your_groq_api_key_here
```

### Frontend (Vercel) Environment Variables:
```bash
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

## 🔧 Google OAuth Configuration

### Authorized JavaScript Origins:
```
https://your-frontend-domain.vercel.app
http://localhost:5173
```

### Authorized Redirect URIs:
```
https://your-backend-domain.onrender.com/auth/google/callback
http://localhost:8000/auth/google/callback
```

## 🚀 Deployment Steps

### 1. Deploy Backend to Render
1. Connect GitHub repo to Render
2. Select `backend` folder
3. Set environment variables (see above)
4. Deploy

### 2. Deploy Frontend to Vercel
1. Connect GitHub repo to Vercel
2. Set root directory to `frontend`
3. Set environment variable: `VITE_API_URL=https://your-backend-domain.onrender.com/api`
4. Deploy

### 3. Update Google OAuth
1. Go to Google Cloud Console
2. Update OAuth 2.0 Client IDs
3. Add both production URLs (see above)

## 🔍 Key Changes Made

### Backend (`server.js`):
- ✅ Dynamic CORS origins based on environment
- ✅ Cross-domain session cookies with `sameSite: 'none'`
- ✅ Secure cookies in production
- ✅ Proper error handling for CORS

### Backend (`routes/auth.js`):
- ✅ Google OAuth callback URL from environment
- ✅ Frontend redirect URL from environment
- ✅ Consistent environment variable usage

### Backend (`config/redis.js`):
- ✅ Fallback Redis URL configuration

### Frontend:
- ✅ All API calls use `VITE_API_URL`
- ✅ Auth redirects use environment variables
- ✅ Proper fallbacks for local development

## 🧪 Testing Checklist

### Local Development:
- [ ] Backend runs on `http://localhost:8000`
- [ ] Frontend runs on `http://localhost:5173`
- [ ] Google OAuth works locally
- [ ] API calls work with local backend

### Production:
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Google OAuth redirects work
- [ ] API calls work cross-domain
- [ ] Session cookies persist across domains

## 🐛 Troubleshooting

### "redirect_uri_mismatch" Error:
- ✅ Check Google OAuth redirect URI matches exactly
- ✅ Ensure `GOOGLE_CALLBACK_URL` is set correctly
- ✅ Verify no trailing slashes in URLs

### CORS Errors:
- ✅ Check `FRONTEND_ORIGIN` matches Vercel URL exactly
- ✅ Verify `credentials: true` in frontend requests
- ✅ Ensure backend CORS allows your frontend domain

### Session Not Persisting:
- ✅ Check `sameSite: 'none'` for production
- ✅ Verify `secure: true` for HTTPS
- ✅ Ensure `httpOnly: true` for security

## 📝 Production URLs Template

Replace these placeholders:
- `your-backend-domain.onrender.com` → Your actual Render backend URL
- `your-frontend-domain.vercel.app` → Your actual Vercel frontend URL
- `<password>` → Your actual MongoDB password
- `your_google_client_id_here` → Your actual Google Client ID
- `your_google_client_secret_here` → Your actual Google Client Secret
- `your_groq_api_key_here` → Your actual Groq API key
- `your_strong_session_secret_here` → A strong random string

## ✅ Ready for Production!

Your app is now properly configured for cross-domain deployment with:
- Secure authentication flow
- Proper CORS handling
- Environment-based configuration
- Production-ready session management

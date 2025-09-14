# Cross-Domain Authentication Fix

## 🚨 Current Issue
Getting "Unauthorized. Please login with Google" even after successful OAuth login. This is a cross-domain session issue.

## 🔧 Fixes Applied

### 1. Enhanced CORS Configuration
- Added proper headers for cross-domain cookies
- Added debugging for blocked origins
- Enhanced cookie handling

### 2. Improved Session Configuration
- Explicit session name
- Better cookie settings for cross-domain
- Proper sameSite configuration

### 3. Added Debugging
- Auth middleware now logs session status
- Added session test endpoint
- Better error logging

## 🧪 Testing Steps

### 1. Test Session Status
Visit: `https://mini-crm-eut5.onrender.com/api/session-test`

Should return:
```json
{
  "isAuthenticated": true,
  "user": { "email": "your-email@gmail.com", "name": "Your Name" },
  "sessionId": "session-id-here",
  "cookies": "Present"
}
```

### 2. Check Backend Logs
Look for these debug messages in Render logs:
```
Auth check - isAuthenticated: true
Auth check - user: your-email@gmail.com
Auth check - session: Session exists
Auth check - cookies: Cookies present
```

### 3. Test OAuth Flow
1. Go to frontend: `https://mini-crm-1-gmzf.onrender.com/#/`
2. Click "Login with Google"
3. Complete OAuth
4. Should redirect to: `https://mini-crm-1-gmzf.onrender.com/#/dashboard`
5. Check if data loads (customers, orders, campaigns)

## 🔍 Debugging

### If Session Test Shows `isAuthenticated: false`:

#### Check Environment Variables
Make sure these are set in Render backend:
```
FRONTEND_ORIGIN=https://mini-crm-1-gmzf.onrender.com
SESSION_SECRET=your_strong_session_secret
NODE_ENV=production
```

#### Check CORS
Look for "CORS blocked origin" in logs. If you see this, the frontend URL isn't in allowed origins.

#### Check Cookies
If "cookies: Missing", the browser isn't sending cookies. This could be:
- SameSite policy blocking
- Secure cookie issues
- Domain mismatch

### If OAuth Redirects But Session Lost:

#### Check Redirect URL
Make sure Google OAuth redirect URI is:
```
https://mini-crm-eut5.onrender.com/auth/google/callback
```

#### Check Frontend Origin
Make sure `FRONTEND_ORIGIN` matches exactly:
```
https://mini-crm-1-gmzf.onrender.com
```

## 🚀 Quick Fixes

### Fix 1: Update Environment Variables
In Render backend dashboard:
```
FRONTEND_ORIGIN=https://mini-crm-1-gmzf.onrender.com
SESSION_SECRET=your_strong_random_string_here
NODE_ENV=production
```

### Fix 2: Clear Browser Data
1. Clear cookies for both domains
2. Clear local storage
3. Try OAuth flow again

### Fix 3: Test in Incognito
Test the OAuth flow in incognito mode to avoid cached issues.

## 📋 Expected Flow After Fix

1. **User visits frontend** → `https://mini-crm-1-gmzf.onrender.com/#/`
2. **Clicks login** → Redirects to Google OAuth
3. **Google OAuth** → User logs in
4. **Callback** → `https://mini-crm-eut5.onrender.com/auth/google/callback`
5. **Session created** → User authenticated
6. **Redirect** → `https://mini-crm-1-gmzf.onrender.com/#/dashboard`
7. **API calls work** → Session maintained across domains

## ✅ Success Indicators

- Session test shows `isAuthenticated: true`
- Dashboard loads with data
- No "Unauthorized" errors
- Customers, orders, campaigns load properly

**The debugging will help identify exactly where the session is being lost!**

# Deployment Guide for MiniCRM

## Frontend (Vercel)

### 1. Deploy Frontend to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# From frontend directory
cd frontend
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set build command: npm run build
# - Set output directory: dist
```

### 2. Set Environment Variables in Vercel
In Vercel dashboard → Project Settings → Environment Variables:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## Backend (Railway/Render/Vercel)

### Option A: Railway (Recommended for Node.js + Redis)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Add services:
   - **Backend Service**: Select `backend` folder
   - **Redis**: Add Redis service
   - **MongoDB**: Add MongoDB service (or use MongoDB Atlas)

4. Set Environment Variables in Railway:
```
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/minicrm
REDIS_URL=redis://default:password@redis.railway.internal:6379
GROQ_API_KEY=your_groq_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
FRONTEND_ORIGIN=https://your-frontend.vercel.app
```

### Option B: Vercel (Backend as Serverless)
1. Create `backend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. Deploy backend to Vercel
3. Set environment variables in Vercel dashboard

## Database Setup

### MongoDB Atlas
1. Create cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/minicrm`

## Google OAuth Setup

### 1. Create New OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs:
   - `http://localhost:8000/auth/google/callback` (development)
   - `https://your-backend-url.vercel.app/auth/google/callback` (production)

### 2. Update Environment Variables
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

## Redis Setup

### Option A: Railway Redis (Easiest)
- Add Redis service in Railway dashboard
- Get connection string from service

### Option B: Redis Cloud
1. Sign up at [redis.com](https://redis.com)
2. Create database
3. Get connection string: `redis://default:password@host:port`

## Step-by-Step Deployment

### 1. Deploy Backend First
```bash
# Option A: Railway
# - Connect GitHub repo
# - Select backend folder
# - Add Redis + MongoDB services
# - Set environment variables

# Option B: Vercel
cd backend
vercel
# Set environment variables in Vercel dashboard
```

### 2. Update Google OAuth
- Add production callback URL to Google Console
- Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### 3. Deploy Frontend
```bash
cd frontend
vercel
# Set VITE_API_URL to your backend URL
```

### 4. Test Everything
1. Visit frontend URL
2. Login with Google
3. Create customers/orders
4. Create campaign
5. Check Campaign History for delivery stats

## Troubleshooting

### CORS Issues
- Ensure `FRONTEND_ORIGIN` matches your Vercel frontend URL
- Check backend CORS settings

### Redis Connection
- Verify `REDIS_URL` is correct
- Check Redis service is running

### MongoDB Connection
- Verify `MONGO_URI` includes database name
- Check IP whitelist includes 0.0.0.0/0

### Google OAuth
- Ensure redirect URI matches exactly
- Check client ID/secret are correct

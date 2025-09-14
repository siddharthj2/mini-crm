# Mini CRM Platform

A comprehensive customer relationship management platform built for the Xeno SDE Internship assignment.

🌐 **Live Demo**: [https://mini-crm-1-gmzf.onrender.com](https://mini-crm-1-gmzf.onrender.com)

📚 **API Documentation**: [https://mini-crm-eut5.onrender.com/api/docs](https://mini-crm-eut5.onrender.com/api/docs)

## Overview

MiniCRM is a full-stack web application that demonstrates modern web architecture with:
- Google OAuth 2.0 authentication with JWT tokens
- Customer & order data ingestion via CSV uploads
- Campaign targeting with flexible rule builder
- Real-time delivery simulation via Redis Streams
- AI-powered message generation
- Complete API documentation with Swagger

Built with React, Node.js, MongoDB, and Redis.

Tech Stack
- Frontend: React (Vite), utility-first styling
- Backend: Node.js/Express, MongoDB (Mongoose)
- Messaging: Redis Streams consumer for delivery simulation
- Auth: Google OAuth 2.0 (passport)
- AI: Groq LLM (Llama 3.1) for message suggestions and summaries

Features:-
Authentication:
- Google OAuth 2.0
- Protected APIs and pages with session middleware
Customers:
- Create individually or bulk upload (CSV/Excel)
- List in table view with metadata
Orders:
- Create and list orders
- Linked to customers
Campaigns:
- Rule builder with AND/OR conditions (e.g., min spend, max visits)
- Audience size preview before saving
- On save, messages are enqueued into a Redis Stream
Delivery & Logs:
- Background consumer reads from Redis Stream
- Simulates delivery (~90% Sent / ~10% Failed)
- Communication logs persisted in MongoDB
- Dashboard & history pages compute and display stats
Dashboard:
- Stat cards (customers, orders, campaigns)
- AI-powered summary of campaign performance
- Inline totals (sent/failed/total)
Campaign History:
- Recent campaigns with Sent/Failed/Total counts
- Sorted newest first
API Docs:
- Swagger UI with key endpoints

Getting Started

Prerequisites
- Node.js 18+
- Redis (local) running at default port
- MongoDB (local or Atlas)
- Google OAuth credentials
- Groq API key (for AI)

Environment
Create `backend/.env` with:
```
PORT=
MONGO_URI=
GROQ_API_KEY=YOUR_GROQ_KEY
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
SESSION_SECRET=some-secret
FRONTEND_ORIGIN=
```

Install & Run
From two terminals:

```
# Terminal 1: backend
cd backend
npm install
npm run start

# Terminal 2: frontend
cd frontend
npm install
npm run dev
```
Architecture Notes:-
Pub/Sub with Redis Streams:
- Producers: API writes campaign messages into communicationStream.
- Consumers: backend/consumers/communicationConsumer.js reads the stream, simulates delivery, and writes to MongoDB (CommunicationLogs).
- This ensures scalable, real-time message processing.
Stats:
- backend/routes/dashboard.js aggregates communication logs.
- backend/services/aiService.js generates a concise AI summary of campaign performance.
Security:
- Google OAuth + session-based authentication (express-session).
- Protected routes via backend/middleware/auth.js.


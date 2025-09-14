const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const connectDB = require("./config/mongo");
const customerRoutes = require("./routes/customers");
const orderRoutes = require("./routes/orders");
const campaignRoutes = require("./routes/campaigns");
const logsRoutes = require("./routes/logs");
const dashboardRoutes = require("./routes/dashboard");
const processStreamstart = require("./consumers/communicationConsumer");
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./docs/openapi");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

// CORS configuration for cross-domain deployment
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  "http://localhost:5173", // For local development
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

// Session configuration for cross-domain
app.use(session({ 
  secret: process.env.SESSION_SECRET || process.env.GOOGLE_CLIENT_SECRET, 
  resave: false, 
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Required for cross-domain
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));

connectDB();
// After DB is connected, sync indexes to pick up sparse/unique changes
const Customer = require("./models/Customer");
Customer.syncIndexes().catch((e) => console.error("Failed to sync customer indexes", e.message));
processStreamstart();

app.listen(port, () => console.log(`server is running on port ${port}`));

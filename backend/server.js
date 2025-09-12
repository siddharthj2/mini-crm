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

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
// Allow frontend dev server to access API with cookies
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(session({ secret: process.env.GOOGLE_CLIENT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);

connectDB();
// After DB is connected, sync indexes to pick up sparse/unique changes
const Customer = require("./models/Customer");
Customer.syncIndexes().catch((e) => console.error("Failed to sync customer indexes", e.message));
processStreamstart();

app.listen(port, () => console.log(`server is running on port ${port}`));

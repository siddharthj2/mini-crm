const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/mongo");
const customerRoutes = require("./routes/customers");
const orderRoutes = require("./routes/orders");
const campaignRoutes = require("./routes/campaigns");
const logsRoutes = require("./routes/logs");
const dashboardRoutes = require("./routes/dashboard");
const processStreamstart = require("./consumers/communicationConsumer");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(session({ secret: "secretkey", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/dashboard", dashboardRoutes);

connectDB();
processStreamstart();

app.listen(port, () => console.log(`server is running on port ${port}`));

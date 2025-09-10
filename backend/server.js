const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/mongo");
const customerRoutes=require("./routes/customers");
const orderRoutes=require("./routes/orders")
const campaignRoutes=require("./routes/campaigns")
const logsRoutes=require("./routes/logs")
const dashboardRoutes=require("./routes/dashboard");

dotenv.config();
const app=express();
const port =process.env.PORT

app.use(express.json())
app.use("/api/customer",customerRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/campaign",campaignRoutes);
app.use("/api/logs",logsRoutes);
app.use("/api/dashboard",dashboardRoutes);

connectDB();
app.listen(port,()=>console.log(`server is running on port ${port}`));
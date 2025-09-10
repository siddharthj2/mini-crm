const express =require("express");
const Customer= require("../models/Customer");
const Campaign= require("../models/Campaign");
const CommunicationLog =require("../models/CommunicationLogs");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const totalCustomers= await Customer.countDocuments();
    const totalCampaigns= await Campaign.countDocuments();
    const totalLogs =await CommunicationLog.countDocuments();
    const sentLogs =await CommunicationLog.countDocuments({ status: "Sent" });
    const failedLogs= await CommunicationLog.countDocuments({ status: "Failed" });
    const successRate= totalLogs > 0 ? ((sentLogs / totalLogs) * 100).toFixed(2) : 0;
    const campaigns =await Campaign.find().select("name audienceSize createdAt").sort({ createdAt: -1 });

    res.json({
      totalCustomers,
      totalCampaigns,
      totalMessages: totalLogs,
      sentMessages: sentLogs,
      failedMessages: failedLogs,
      successRate:`${successRate}%`,
      campaigns
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

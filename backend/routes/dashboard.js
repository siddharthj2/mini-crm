const express = require("express");
const Campaign = require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLogs");
const ensureAuthenticated = require("../middleware/auth");
const { generateCampaignSummary } = require("../services/aiService");

const router = express.Router();

router.use(ensureAuthenticated);

router.get("/", async (req, res) => {
  try {
    const userGoogleId = req.user.googleId;

    const campaigns = await Campaign.find({ userId: userGoogleId })
      .sort({ createdAt: -1 })
      .lean();

    const campaignData = await Promise.all(
      campaigns.map(async (campaign) => {
        const logs = await CommunicationLog.find({ campaignId: campaign._id,userId: userGoogleId });

        const stats = {
          sent: logs.filter((log) => log.status === "Sent").length,
          failed: logs.filter((log) => log.status === "Failed").length,
          total: logs.length,
        };
        const summary = await generateCampaignSummary(campaign, stats);
        return {
          ...campaign,
          stats,
          summary,
        };
      })
    );

    res.json({ campaigns: campaignData });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

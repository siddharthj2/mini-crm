const express = require("express");
const router = express.Router();
const { generateMessages } = require("../services/aiService");

router.post("/generate", async (req, res) => {
  const { campaignName, rules } = req.body;

  if (!campaignName) {
    return res.status(400).json({ message: "campaignName is required" });
  }

  try {
    const messages = await generateMessages(campaignName, rules || {});
    res.json({ messages });
  } catch (err) {
    console.error("AI route error:", err.message);
    res.status(500).json({ message: "Failed to generate messages" });
  }
});

module.exports = router;

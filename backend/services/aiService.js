const Groq = require("groq-sdk");
const dotenv = require("dotenv");
dotenv.config();


const groq=new Groq({ apiKey: process.env.GROQ_API_KEY });


async function generateMessages(campaignName,rules){
    try{
        
        const prompt = `Generate 4 short, personalized marketing messages for a CRM campaign.Campaign: "${campaignName}"
                        Audience rules: ${JSON.stringify(rules)}. Output only a JSON array of strings, no explanations, no labels.
                        Example: ["Message 1", "Message 2", "Message 3", "Message 4"]`;

        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
            temperature: 0.7,
        });

        const text=response.choices[0]?.message?.content || "";
        try {
            messages = JSON.parse(text);
          } catch {
            messages = text.split(/\r?\n/).map((m) => m.replace(/^\d+\.\s*/, "").trim()).filter((m) => m.length > 0);
          }
        return messages.slice(0, 4);
    }catch(error){
        console.error("AI message generation error:", error.message);
        return [
        `Hi, check out our ${campaignName} campaign!`,
        `Don't miss out on ${campaignName}!`,
        ]; 
    }
};

async function generateCampaignSummary(campaign, stats){
    try{
        const successRate = stats.total > 0 ? ((stats.sent / stats.total) * 100).toFixed(0) : 0;
        const prompt = `Write ONE concise, plain-text sentence (no markdown, no bullets) summarizing this campaign for a CRM dashboard.
Campaign: ${campaign.name}
Audience: ${stats.total}
Delivered: ${stats.sent}
Failed: ${stats.failed}
SuccessRatePercent: ${successRate}
Tone: upbeat, business-like, 18-22 words.`;

        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 60,
            temperature: 0.5,
        });

        const text = response.choices[0]?.message?.content || "";
        return text.replace(/\s+/g, " ").replace(/[\*_`]+/g, "").trim();
    }catch(error){
        console.error("AI message generation error:", error.message);
        const successRate = stats.total > 0 ? ((stats.sent / stats.total) * 100).toFixed(0) : 0;
        return `"${campaign.name}" reached ${stats.total} customers; ${stats.sent} delivered, ${stats.failed} failed (${successRate}% success).`;
    }
}

module.exports = { generateMessages , generateCampaignSummary};
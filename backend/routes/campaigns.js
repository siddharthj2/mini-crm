const express=require("express");
const Customer=require("../models/Customer")
const Campaign=require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLogs");
const { generateMessages } = require("../services/aiService");
const router=express.Router();
const redis=require("../config/redis");
const ensureAuthenticated = require("../middleware/auth");

router.use(ensureAuthenticated);

router.post('/',async(req,res)=>{
    try{
        const {name,rules}=req.body;
        if(!name || !rules ) return res.status(401).json({message:"names rules are rewuires"})

        const { minSpend, maxVisits, operator } = rules || {};
        let q = {};
        const spendCond = typeof minSpend === "number" && !Number.isNaN(minSpend)
          ? { totalspend: { $gte: minSpend } }
          : null;
        const visitsCond = typeof maxVisits === "number" && !Number.isNaN(maxVisits)
          ? { visits: { $lte: maxVisits } }
          : null;

        if (spendCond && visitsCond) {
          if ((operator || "AND").toUpperCase() === "OR") {
            q = { $or: [spendCond, visitsCond] };
          } else {
            q = { ...spendCond, ...visitsCond };
          }
        } else if (spendCond) {
          q = spendCond;
        } else if (visitsCond) {
          q = visitsCond;
        }

        const customers=await Customer.find(q); 
        const campaign =new Campaign({
            name,
            rules,
            audienceSize:customers.length,
            userId: req.user.googleId
        })
        await campaign.save();

        const aiMessages=await generateMessages(name,rules);

        for(let cust of customers){
            const message = aiMessages[Math.floor(Math.random() * aiMessages.length)];
            try {
              await redis.xadd(
                "communicationStream",
                "*",
                "campaignId", campaign._id.toString(),
                "customerId", cust._id.toString(),
                "message", message
              );
            } catch (e) {
              const logtable = new CommunicationLog({
                campaignId: campaign._id,
                customerId: cust._id,
                message,
                status: "Queued",
                userId: req.user.googleId,
              });
              await logtable.save().catch(() => {});
            }
        }
        res.status(201).json({message: "campaign created and logs created",
                                campaign,
                                audience: customers.length,
                                aiMessages});

        /*
        for(let cust of customers){
            const status=Math.random()<0.9 ? "Sent":"Failed";
            const message = aiMessages[Math.floor(Math.random() * aiMessages.length)];
            const logtable=new CommunicationLog({
                campaignId: campaign._id,
                customerId: cust._id,
                message,
                status
            })
            await logtable.save();
        }

        res.status(201).json({message: "campaign created",
                                campaign,
                                audience: customers.length,
                                aiMessages});

        */
    }catch(error){
        console.log("error in creating campaign");
        res.status(500).json({message:"server error",error:error.message});
    }


});

router.get('/',async(req,res)=>{
    try{
        const campaigns = await Campaign.find({ userId: req.user.googleId })
        if(campaigns.length === 0){
            return res.status(404).json({ message: "No campaigns found for this user" });
        }
        res.send(campaigns);
    }catch(error){
        console.log("error in server",error);
        res.status(500).json({message:"error in server ",error:error.message});
    }

});

module.exports=router;
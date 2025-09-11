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

        const q={}
        if(rules.minSpend) q.totalspend={$gte:rules.minSpend};
        if(rules.maxVisits) q.visits={$lte:rules.maxVisits};

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
            await redis.xadd(
                "communicationStream",
                "*",
                "campaignId", campaign._id.toString(),
                "customerId", cust._id.toString(),
                "message",message,
                "userId", req.user.googleId,
            );
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
        const campaign=await Campaign.find()
        res.send(campaign);
    }catch(error){
        console.log("error in server",error);
        res.status(500).json({message:"error in server ",error:error.message});
    }

});

module.exports=router;
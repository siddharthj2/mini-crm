const express=require("express")
const CommunicationLog = require("../models/CommunicationLogs");
const router=express.Router();
const ensureAuthenticated = require("../middleware/auth");
router.use(ensureAuthenticated);

router.get('/',async(req,res)=>{
    try{
        const logs=await CommunicationLog.find({ userId: req.user.googleId}).populate("customerId","name email phone").populate("campaignId","name");
        res.json(logs);
    }catch(error){
        console.log("error in server",error);
        res.status(500).json({message:"error in server ",error:error.message});
    }
});

module.exports=router;
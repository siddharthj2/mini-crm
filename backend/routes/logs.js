const express=require("express")
const Customer=require("../models/Customer")
const Campaign=require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLogs");
const router=express.Router();

router.get('/',async(req,res)=>{
    try{
        const logs=await CommunicationLog.find().populate("customerId","name email phone").populate("campaignId","name");
        res.json(logs);
    }catch(error){
        console.log("error in server",error);
        res.status(500).json({message:"error in server ",error:error.message});
    }
});

router.get('/customer/:id',async(req,res)=>{
    try{
        const logs=await CommunicationLog.find({customerId:req.params.id}).populate("customerId","name email phone").populate("campaignId","name");
        res.json(logs);
    }catch(error){
        console.log("error in server",error);
        res.status(500).json({message:"error in server ",error:error.message});
    }
});

router.get('/campaign/:id',async(req,res)=>{
    try{
        const logs=await CommunicationLog.find({campaignId:req.params.id}).populate("customerId","name email phone").populate("campaignId","name");
        res.json(logs);
    }catch(error){
        console.log("error in server",error);
        res.status(500).json({message:"error in server ",error:error.message});
    }
});

module.exports=router;
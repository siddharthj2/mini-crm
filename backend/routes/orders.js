const express=require("express");
const Customer=require("../models/Customer");
const Order=require("../models/Order");
const router=express.Router();
const ensureAuthenticated = require("../middleware/auth");

router.use(ensureAuthenticated);

router.post('/',async(req,res)=>{
    try{
        const {customerId,amount,items}=req.body;
        if(!customerId || !amount) return res.status(400).json({message:"customerId and amount cant be empty"})

        const customer=await Customer.findById(customerId)
        if(!customer) return res.status(400).json({message:"customer not found"});

        const order=new Order({customerId,amount,items})
        await order.save();

        customer.visits+=1;
        customer.totalspend+=amount;
        customer.lastOrderDate=new Date();
        await customer.save();

        res.status(201).json({message:"order created succesfully"});
    }catch(error){
        console.log("order not created",error);
        res.status(500).json({message:"server error",error:error.message});
    }
});

router.get('/',async(req,res)=>{
    try{
        const order=await Order.find().populate("customerId","name email phone");
        if(order.length==0) return res.status(200).json([]);
        res.status(200).json(order);
    }catch(error){
        console.log("error in server",error);
        res.status(500).json({message:"error in server ",error:error.message});
    }

});

router.get("/customer/:id",async(req,res)=>{
    try{
        const order=await Order.find({customerId:req.params.id}).populate("customerId","name email phone");
        if(order.length==0) return res.status(200).json([]);
        res.status(200).json(order);
    }catch(error){
        console.log("error in server",error);
        res.status(500).json({message:"error in server ",error:error.message});
    }

});

module.exports=router;
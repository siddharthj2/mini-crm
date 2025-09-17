const mongoose=require("mongoose");

const comLogSchema=new mongoose.Schema({
    campaignId:{type:mongoose.Schema.Types.ObjectId,ref:"Campaign", required:true},
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"Customer", required:true},
    message:{type:String,required:true},
    status:{type:String,enum:["Sent","Failed","Queued"],default:"Sent"},
    userId:{type:String,required:true}, 
    deliveryAt:{type:Date,default:Date.now}

});

const CommunicationLog=mongoose.model("CommunicationLog", comLogSchema);
module.exports=CommunicationLog;
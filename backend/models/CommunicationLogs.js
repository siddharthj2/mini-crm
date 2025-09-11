const mongoose=require("mongoose");

const comLogSchema=new mongoose.Schema({
    campaignId:{type:mongoose.Schema.Types.ObjectId,ref:"Campaign", required:true},
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"Customer", required:true},
    userId:{ type: String,required:true },
    message:{type:String,required:true},
    status:{type:String,enum:["Sent","Failed"],default:"Sent"},
    deliveryAt:{type:Date,default:Date.now}

});

const CommunicationLog=mongoose.model("CommunicationLog", comLogSchema);
module.exports=CommunicationLog;
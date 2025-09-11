const mongoose=require("mongoose");

const campaignSchema=new mongoose.Schema({
    name:{type:String , required:true},
    rules:{type:Object,required:true},
    audienceSize:{type:Number,default:0},
    userId: {type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});
const Campaign=mongoose.model("Campaign", campaignSchema);
module.exports=Campaign;
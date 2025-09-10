const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"Customer",required:true},
    amount:{type:Number,required:true},
    items: [{type:String}],
    date:{type:Date,dafault:Date.now}
});
const Order=mongoose.model("Order", orderSchema);
module.exports=Order;
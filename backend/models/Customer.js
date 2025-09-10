const mongoose=require("mongoose");

const customerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,unique:true},
    totalspend:{type:Number,default:0},
    visits:{type:Number,default:0},
    lastOrderDate:{type:Date},
    createdAt:{type:Date,default:Date.now}
})

const Customer=mongoose.model("Customer", customerSchema);
module.exports=Customer;
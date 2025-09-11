const mongoose=require("mongoose");

const customerSchema=new mongoose.Schema({
    googleId:{type:String,unique:true},
    name:{type:String},
    email:{type:String,unique:true},
    phone:{type:Number,unique:true},
    totalspend:{type:Number,default:0},
    visits:{type:Number,default:0},
    lastOrderDate:{type:Date},
    createdAt:{type:Date,default:Date.now}
})

const Customer=mongoose.model("Customer", customerSchema);
module.exports=Customer;
const mongoose=require("mongoose");

const customerSchema=new mongoose.Schema({
    googleId:{type:String,unique:true,sparse:true},
    name:{type:String},
    email:{type:String,unique:true},
    phone:{type:Number,unique:true,sparse:true},
    totalspend:{type:Number,default:0},
    visits:{type:Number,default:0},
    lastOrderDate:{type:Date},
    createdAt:{type:Date,default:Date.now}
})

// Ensure sparse unique indexes exist even if collection was created earlier
customerSchema.index({ googleId: 1 }, { unique: true, sparse: true });
customerSchema.index({ phone: 1 }, { unique: true, sparse: true });

const Customer=mongoose.model("Customer", customerSchema);
module.exports=Customer;
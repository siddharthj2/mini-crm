const express=require("express");
const Customer=require("../models/Customer");
const router=express.Router()

router.post('/', async(req,res) =>{
    try{
        const {name,email,phone}=req.body;
        if(!name||!email){
            return res.status(400).json({message:"name and email cant be empty"})
        }
        const customer=new Customer({name,email,phone});
        await customer.save();
        res.status(201).json({message:"Customer created successfully",customer});
    }catch(error){
        console.error("Error creating customer:", error);
        res.status(500).json({message:"server error", error: error.message });
    }
});

router.post("/multiple", async (req, res) => {
    try {
      const customersData = req.body;
  
      if (!Array.isArray(customersData) || customersData.length === 0) {
        return res.status(400).json({ message: "Request body must be a non-empty array" });
      }
      const customers = await Customer.insertMany(customersData);
      res.status(201).json({
        message: `${customers.length} customers created successfully`,
        customers,
      });
    } catch (error) {
      console.error("Error creating multiple customers:", error);
      res.status(500).json({ message: "server error", error: error.message });
    }
  });
  

router.get('/',async(req,res)=>{
    const customers=await Customer.find();
    res.json(customers);
})

router.get('/:id',async(req,res)=>{
    try{
        const customers=await Customer.findById(req.params.id)
        if(!customers) {
            return res.status(404).json({message:"no customer found by this id"})
        }
        res.send(customers)
    }catch(error){
        res.status(500).json({message:"error in server",error:error.message})
    }
})

module.exports=router;
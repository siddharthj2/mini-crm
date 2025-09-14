const express = require("express");
const Customer = require("../models/Customer");
const ensureAuthenticated = require("../middleware/auth"); 

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, visits, totalSpend, totalspend } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const emailOk = /.+@.+\..+/.test(String(email));
    if (!emailOk) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    const normalizedPhone = phone ? Number(String(phone).replace(/\D/g, "")) : undefined;
    const normalizedVisits = typeof visits === "number" ? visits : Number(visits) || 0;
    const normalizedSpend = typeof totalspend === "number" ? totalspend : Number(totalSpend) || 0;

    const customer = new Customer({
      name,
      email,
      phone: normalizedPhone,
      visits: normalizedVisits,
      totalspend: normalizedSpend,
    });
    await customer.save();
    res.status(201).json({ message: "Customer created successfully", customer });
  } catch (error) {
    if (error && error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || "field";
      return res.status(409).json({ message: `Duplicate ${field}. A customer with this ${field} already exists.` });
    }
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const customersData = req.body;

    if (!Array.isArray(customersData) || customersData.length === 0) {
      return res.status(400).json({ message: "Request body must be a non-empty array" });
    }

    
    const normalized = customersData.map((c) => ({
      name: c.name,
      email: c.email,
      phone: c.phone ? Number(String(c.phone).replace(/\D/g, "")) : undefined,
      visits: typeof c.visits === "number" ? c.visits : Number(c.visits) || 0,
      totalspend: typeof c.totalspend === "number" ? c.totalspend : Number(c.totalSpend) || 0,
    }));

    const customers = await Customer.insertMany(normalized);
    res.status(201).json({
      message: `${customers.length} customers created successfully`,
      customers,
    });
  } catch (error) {
    console.error("Error creating multiple customers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get('/me', ensureAuthenticated, async (req, res) => {
  try {
    const customer = await Customer.findOne({ googleId: req.user.googleId });
    if (!customer) {
      return res.status(404).json({ message: "No customer found for this user" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

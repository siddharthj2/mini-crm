const express = require("express");
const Customer = require("../models/Customer");
const ensureAuthenticated = require("../middleware/auth"); // only for protected routes

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const customer = new Customer({ name, email, phone });
    await customer.save();
    res.status(201).json({ message: "Customer created successfully", customer });
  } catch (error) {
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

    const customers = await Customer.insertMany(customersData);
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

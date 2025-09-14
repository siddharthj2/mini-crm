const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

async function ensureAuthenticated(req, res, next) {
    try {
        // Check for JWT token in Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            console.log('Auth failed - No token provided');
            return res.status(401).json({ message: "Unauthorized. Please login with Google." });
        }
        
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.GOOGLE_CLIENT_SECRET);
        console.log('Auth check - JWT decoded:', decoded);
        
        // Get user from database
        const user = await Customer.findById(decoded.userId);
        if (!user) {
            console.log('Auth failed - User not found');
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }
        
        // Attach user to request
        req.user = user;
        console.log('Auth success - User:', user.email);
        next();
        
    } catch (error) {
        console.log('Auth failed - JWT error:', error.message);
        res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
}
  
module.exports = ensureAuthenticated;
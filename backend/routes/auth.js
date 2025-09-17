const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");

const router = express.Router();

passport.serializeUser((user, done) => done(null, user.id)); 
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Customer.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Customer.findOne({ googleId: profile.id });

        if (!user) {
          user = await Customer.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            userId: profile.id, 
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/fail" }),
  (req, res) => {
    //logging
    console.log("OAuth callback - Frontend Origin:", process.env.FRONTEND_ORIGIN);
    console.log("OAuth callback - User:", req.user ? req.user.email : "No user");
    
    //JWT token
    const token = jwt.sign(
      { 
        userId: req.user._id, 
        email: req.user.email,
        name: req.user.name 
      },
      process.env.JWT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
      { expiresIn: '24h' }
    );
    
    const frontendBase = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
    const redirectUrl = `${frontendBase}/#/dashboard?token=${token}`;
    
    console.log("Redirecting to:", redirectUrl);
    res.redirect(redirectUrl);
  }
);

router.get("/fail", (req, res) => res.send("Login failed"));

router.get("/logout", (req, res) => {
  req.logout(() => {
    const frontendBase = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
    res.redirect(`${frontendBase}/#/login`);
  });
});

router.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(req.user); 
});

module.exports = router;

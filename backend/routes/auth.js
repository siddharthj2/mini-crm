const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Customer = require("../models/Customer");

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
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Customer.findOne({ googleId: profile.id });

        if (!user) {
          user = await Customer.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
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
    const frontendBase = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendBase}/dashboard`);
  }
);

router.get("/fail", (req, res) => res.send("Login failed"));

router.get("/logout", (req, res) => {
  req.logout(() => {
    const frontendBase = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendBase}/login`);
  });
});

router.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(req.user); 
});

module.exports = router;

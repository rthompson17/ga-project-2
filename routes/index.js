const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function (req, res, next) {
  res.redirect("/matches");
  console.log("This is the index route");
});

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/matches",
    failureRedirect: "/matches",
  })
);

// // OAuth logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/matches");
});

module.exports = router;

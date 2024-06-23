const express = require('express');
//
const router = express.Router();
const passport = require("passport")
const {User} = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {logout} = require("passport/lib/http/request");


router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "loginfailure"
    })
})
router.get("/login/success", async (req, res) => {
    console.log("goes here")
    console.log(req)
    console.log("passport from google" + " " + req.passport)

    console.log("user from google" + " " + req.user)


    if (req.user) {
        console.log(req.user.id)
        // const user = await User.findOne({googleId: req.user.id});
        const user = await User.findOne({email: req.user.emails[0].value})

        if (user) {
            const payload = {email: user.email, userId: user._id};
            const jwtToken = jwt.sign(payload, "secret");
            console.log(user)
            return res.json({
                message: 'Success',
                jwt_token: jwtToken,
            });
        }

        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/google/callback",
    passport.authenticate("google",
        {
            successRedirect: "https://classy-sunburst-8171f2.netlify.app",
            failureRedirect: "/login/failed"
        }
    ))

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("https://classy-sunburst-8171f2.netlify.app");
});


module.exports = {
    authRouter: router,
};

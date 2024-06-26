const express = require('express');
//
const router = express.Router();
const passport = require("passport")
const {User} = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const frontendUrl = process.env.FRONTEND_URL;


router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "loginfailure"
    })
})
router.get("/login/success", async (req, res) => {
    console.log('User from login success:', req.user);
    console.log('User headers:', req.headers);

    if (req.user) {
        console.log(req.user)
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
            message: "Successfully Logged In",
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
            successRedirect: frontendUrl,
            failureRedirect: "/login/failed"
        }
    ))
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(frontendUrl);
});


module.exports = {
    authRouter: router,
};

const passport = require("passport");
const {User}= require("./models/Users")
const bcrypt = require("bcryptjs");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

let GOOGLE_CLIENT_ID = "990484738658-mpvr77l27hm170g4ig0k5k7o559upeke.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

 passport.serializeUser(async function (user, done) {
    // console.log(user)
    // const userCheck = await User.find({email: user.emails[0]})
    //  console.log(userCheck)
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
        passReqToCallback: true
    },
    async function (request, accessToken, refreshToken, profile, done) {

        // console.log(accessToken)
        console.log(profile.emails[0].value)
        const userCheck = await User.findOne({email: profile.emails[0].value})
        console.log(userCheck)
        if(!userCheck){
            const user = new User({
                email: profile.emails[0].value,
                googleId: profile.id
            });
            console.log("user checked hahaha")
            user.save()
        }
        console.log(profile)
        done(null, profile)
    }
));
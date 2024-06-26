const passport = require("passport");
const {User}= require("./models/Users")
const bcrypt = require("bcryptjs");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

let GOOGLE_CLIENT_ID = "671523017249-0j9sjnenlq1eja742s3aiucj2dp12vqm.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

 passport.serializeUser(async function (user, done) {
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
            user.save()
        }
        console.log(profile)
        done(null, profile)
    }
));
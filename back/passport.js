const passport = require("passport");
const {User}= require("./models/Users")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//  passport.serializeUser(async function (user, done) {
//     done(null, user);
// });
// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });


passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "https://react-eshop-1.onrender.com/auth/google/callback",
        scope: ["profile", "email"],
        // passReqToCallback: true
    },
    // async function (request, accessToken, refreshToken, profile, done) {

    //     let user  = await User.findOne({email: profile.emails[0].value})
    //     if(!user){
    //          user = await  User.create({
    //             email: profile.emails[0].value,
    //             googleId: profile.id
    //         });
    //     }
    //     console.log(user)
    //     done(null, user)
    // }
  async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          email: profile.emails[0].value,
        });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }

));
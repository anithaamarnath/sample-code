const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');


// im passing to the net stage to browser
passport.serializeUser((user,done) =>{
    done(null,user.id)
})
// cookie come back with id
passport.deserializeUser((id,done) =>{
    // check in db id 
    User.findById(id).then((user) => {
        done(null,user)
    })
    
})

passport.use(
    new LinkedInStrategy({
    // options for strategy
        callbackURL:'/auth/linkedin/redirect',
        clientID: keys.linkedin.clientID,
        clientSecret: keys.linkedin.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
        // passport callback function
        console.log('passport call back function fired');
        console.log(profile);
        User.findOne({linkedinid: profile.id}).then((currentUser)=>{
            if(currentUser){
                // already have user 
                console.log('User is:', currentUser);
                done(null,currentUser)

            } else{
                // if not, reate new user in db
                new User({
                    displayName: profile.displayName,
                    linkedinid: profile.id
                }).save().then((newUser)=>{
                    console.log('new user created' + newUser);
                    done(null,newUser);
                });
            }
        })
        



    })
)
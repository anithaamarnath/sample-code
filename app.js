const express  = require('express');

const authRoutes = require('./routes/auth-routes');
const profileRouter = require('./routes/profile-router');
const passportSetup = require('./config/passport-setup');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const { linkedin , mongodb, cookiekey } = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');






    
// set up view engine
app.set('view engine','ejs');

// iniatize passport 
app.use(passport.initialize());
app.use(passport.session());



// set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRouter);

// once its login cookies is encrypted 
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.session.cookiekey]
}))



// connect mongodb
 mongoose.connect(keys.mongodb.connectionString, { useNewUrlParser: true , useUnifiedTopology: true }  ,()=>{
    console.log('connection to mongodb');
    });




// create home route 

app.get('/',(req,res) =>{
    res.render('home');
});


app.listen(3000,() => {
    console.log('app now listening for request on port ')
});


// create instance to the router method instances of the router 
const router = require('express').Router();
const passport = require('passport');
// auth login 
router.get('/login',(req,res) =>{
    res.render('login')
});

//auth logout
router.get('/logout',(req,res) =>{
    // handle with passport
    req.logout()
    res.redirect('/');

});  

// auth with loinked in 
router.get('/linkedin',passport.authenticate('linkedin',{
    scope:['r_emailaddress','r_liteprofile']
}));

// callback route for linked in to redirect to 
router.get('/linkedin/redirect', passport.authenticate('linkedin'),(req,res) =>{
    res.send(req.user.displayName);
    //res.redirect('/profile/');
})
module.exports = router;
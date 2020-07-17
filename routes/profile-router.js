const router = require('express').Router();

const authCheck = (req,res,next) =>{
    if(!req.user) {
        // if user is not logged in
        res.redirect('/auth/login');
    } else {
        //  if logged in 
        next();
    }
};


router.get('/', authCheck,(req,res) =>{
    //res.send('you are in logged in to your profile'+ req.user.displayName);
    res.render('profile', {user: req.user});

})

 
module.exports = router;
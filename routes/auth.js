const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.send('YOU NEED TO LOGIN FIRST');
    }
    next();
}

router.get('/register', (req, res) => {
    
    res.render('signup');
});

router.post('/register', async (req, res) => {
    
    const { username, password,email } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);


    const newUser = new User({ username,email, password: hash });

    await newUser.save()

    console.log('registered successfully')
    res.redirect('/');
});



router.post('/login', async(req, res) => {
    
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const validUser =  await bcrypt.compare(password,user.password)
       
    if (!validUser) {
        return res.send('Wrong Password!!');
    }

    console.log('LoggedIn Successfully');
    res.redirect('/');
})



router.get('/logout', (req, res) => {
    
    if (req.session.user_id) {
        req.session.destroy();
        return res.redirect('/login');
    }

    res.send('YOU ARE NOT LOGGED IN YET!!!');
});



module.exports = router;
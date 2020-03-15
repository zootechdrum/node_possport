const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//User model

const User = require('../models/User')

//THis is the login page
router.get('/login', (req, res) => res.render('login'))

//THis is the register page
router.get('/register', (req, res) => res.render('register'))


//Use destructuring to get values from req.body
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check if all fields have been filled out
    if(!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'})
    }

    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'})
    }

    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 charechters'})
    }
//IF any errors show up display form with current values
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        User.findOne({ email: email})
        .then(user => {
            //If user already exists
            if(user){
                errors.push({ msg: 'Email is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Hash password
                bcrypt.genSalt(10, (errors, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    //hash the password from plain text to hash
                    newUser.password = hash

                    newUser.save()
                    .then(user => {
                        req.flash('sucess_msg', 'You are now registered')
                        res.redirect('/users/login')
                    })
                    .catch(err => console.log(err))
                }))
            }
        });
    }
})


module.exports = router;
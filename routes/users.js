const express = require('express')
const router = express.Router()

//THis is the login page
router.get('/login', (req, res) => res.render('login'))

//THis is the register page
router.get('/register', (req, res) => res.render('register'))


module.exports = router;
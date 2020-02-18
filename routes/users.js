const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');


router.get('/', (req, res) => {
    res.render('users/index');
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});


router.get('/profile', (req, res) => {
    res.render('users/profile');
});





module.exports = router;

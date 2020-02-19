const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');


router.get('/', (req, res) => {
    res.render('users/index',{
        username: req.cookies['username']
    }
    );
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/signin', (req, res) => {
    res.render('users/signin');
});


router.get('/profile',async (req, res) => {
        try{

        const foundUser = await client.query(`SELECT * FROM users WHERE username = '${req.cookies['username']}'`);
        if(req.cookies.username) {
            res.render('users/profile',{
                username: foundUser.rows[0]['username'],
                email: foundUser.rows[0]['email']
            })
        } else {
            res.render('users/signin', {message: 'You are not logged in'})
        }

        } catch(err){
            res.json({
                message: 'Error Loading profile',
                err
            })
        }
    });

module.exports = router;

const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');



router.get('/addemployee', async (req, res) => {
    const foundManagers = await client.query(`SELECT * FROM users WHERE access = 'Manager'`);
    // console.log(foundManagers.rows)
    if(req.cookies.email) {
    res.render('users/addemployee', {foundManagers: foundManagers});
    }else{
      res.render('users/signin', {message: 'You are not logged in'})
    }
 });

router.get('/', (req, res) => {
    res.render('users/index',{
        email: req.cookies['email']
       }
    );
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/signin', (req, res) => {
    res.render('users/signin', {message: 'You are not currently signed in'});
});

router.get('/profile',async (req, res) => {
        try{
        const foundUser = await client.query(`SELECT * FROM users WHERE email = '${req.cookies['email']}'`);
        if(req.cookies.email) {
            res.render('users/profile',{
                email: foundUser.rows[0]['email'],
                access: foundUser.rows[0]['access']
            })
        } else {
            res.render('users/signin', {message: 'You are not logged in'})
        }

        }catch(err){
            res.json({
                message: 'Error Loading profile',
                err
            })
        }
    });

    router.get('/searchResults', async (req, res) => {
        // console.log(req.query.firstname)
        const {firstname} = req.query;
        try{
        const foundUser = await client.query(`SELECT * FROM employees WHERE first_name = '${firstname}'`);
        if (foundUser) {
            // console.log(foundUser);
            res.render('users/searchResults',{foundUsers: foundUser} )
        } else {
            res.json ({
                message: 'error',
             })
            }
        }catch(err){
            res.json({
                message: 'Error Logging In',
                err
            })
        }

    });

module.exports = router;

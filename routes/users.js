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

router.get('/allemployees', (req, res) => {
    res.render('users/employeelist', {message: 'You are not currently signed in'});
});

router.get('/profile/:id', async(req, res) => {
    let userID = parseInt(req.params.id)
    const foundUser = await client.query(`SELECT * FROM employees WHERE employee_number = '${userID}'`);
    console.log(foundUser.rows[0])
    res.render('users/editprofile', {
        foundUser: foundUser.rows[0]
    })
})

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
        const {firstname} = req.query;
        try{
        const foundUser = await client.query(`SELECT * FROM employees WHERE first_name = '${firstname}'`);
        if (foundUser) {
            console.log(foundUser);
            res.render('users/searchResults',{foundUsers: foundUser} )
        } else {
            res.json ({
                message: 'No user found. Please try again'
             })
            }
        }catch(err){
            res.json({
                message: 'Error Searching',
                err
            })
        }

    });

module.exports = router;

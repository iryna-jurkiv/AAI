const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
let SALT = 10


router.post('/addemployee', async (req, res) => {
    const {firstname, lastname, jobtitle, employeenumber, email } = req.body;
    try{
       await client.query(`INSERT INTO employees (first_name, last_name, job_title, employee_number, email) 
        VALUES ('${firstname}','${lastname}','${jobtitle}','${employeenumber}','${email}')`);
        res.redirect('/users/addemployee')
    }catch(err){
        console.log(err)
       res.json({
           message: 'Error',
           err     
        })
    }
})


router.post('/signup',async (req, res) => {
const {username, email, password } = req.body;
    try{
        let hashedPassword = await bcrypt.hash(password, SALT)
        await client.query(`INSERT INTO users (username, password, email) VALUES ('${username}','${hashedPassword}','${email}')`);
        res.redirect('/users/signin')
    }catch(err){
        res.json({
            message: 'Error',
            err
        })
    }
});


router.post('/signin',async (req, res) => {
    const {username, password } = req.body;
    try{
    const foundUser = await client.query(`SELECT * FROM users WHERE username = '${username}'`);
    const compare = await (bcrypt.compare(password, foundUser.rows[0]['password']))
    if (compare === true) { 
        res.cookie('username', foundUser.rows[0]['username'])
        res.redirect('/users')
    } else {
        res.json ({
            message: 'Incorrect Password',
            url:'http://localhost:3000/users/signin'
         })
        }


    }catch(err){
        res.json({
            message: 'Error Logging In',
            err
        })
    }
});

router.post('/signout', async (req, res) => {
   res.clearCookie('username')
   res.redirect('/users/signin')
})


module.exports = router;
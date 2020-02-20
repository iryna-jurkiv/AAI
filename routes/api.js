const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const nodemailer = require('nodemailer')
require('dotenv').config(); // Sets ENV configs for DB access and other global configs
let SALT = 10


router.post('/addemployee', async (req, res) => {
    const {firstname, lastname, jobtitle, employeenumber, email } = req.body;
    try{
       await client.query(`INSERT INTO employees (first_name, last_name, job_title, employee_number, email)
        VALUES ('${firstname}','${lastname}','${jobtitle}','${employeenumber}','${email}')`);
      let employee = await client.query(`SELECT * FROM employees WHERE employee_number = '${employeenumber}'`);
      console.log(employee.rows[0])
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
          }
        });


        let mailOptions = {
          from: 'aaiteam20@gmail.com',
          to: req.body.email,
          bcc: 'aaiteam20@gmail.com',
          subject: 'Login Details',
          html: '<!DOCTYPE html>'+
                '<html><head><title>AAI Login Details</title>'+
                '</head><body><div>'+
                '<p>Dear Candidate </p>'+
                '<p>Welcome to AAI User Access Management System. Please go to http://localhost:3000/users/signin and use the following email and temporary password to sign in and view your profile </p>'
                + employee.rows[0]['email'] +
                '<br>'
                + employee.rows[0]['password']+
                '<p>Kind Regards, </p>'+
                '<p>The AAI Team</p>'+
                '</div></body></html>'
              };
        transporter.sendMail(mailOptions, function(err,data){
          if (err) {
            console.log('Error occurs', err);
          } else {
            console.log('Email sent')
          }
        });
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

router.post('/employeessignin',async (req, res) => {
    const {email, password } = req.body;
    try{
    const foundEmployee = await client.query(`SELECT * FROM employees WHERE email = '${email}'`);
    if (password === foundEmployee.rows[0]['password']) {
      res.cookie('employeefirstname', foundEmployee.rows[0]['first_name'])
        res.redirect('/employees')
    } else {
        res.json ({
            message: 'Incorrect Password',
            url:'http://localhost:3000/employees/signin'
         })
        }


    }catch(err){
        res.json({
            message: 'Error Logging In',
            err
        })
    }
});

router.post('/employeessignout', async (req, res) => {
   res.clearCookie('employeefirstname')
   res.redirect('/employees/employeessignin')
})

router.post('/signout', async (req, res) => {
   res.clearCookie('username')
   res.redirect('/users/signin')
})


module.exports = router;

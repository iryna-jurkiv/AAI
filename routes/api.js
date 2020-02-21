const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const nodemailer = require('nodemailer')
// eslint-disable-next-line no-undef
require('dotenv').config(); // Sets ENV configs for DB access and other global configs
let SALT = 10

router.get('/allemployees', async (req, res) => {
    let data = await client.query('SELECT * FROM employees')
    res.json({
        res: data
    })
})

router.post('/addemployee', async (req, res) => {
  // console.log(req.body)
    const {firstname, lastname, jobtitle, startdate, employeenumber, email, manager } = req.body;
    try{
       await client.query(`INSERT INTO employees (first_name, last_name, job_title, start_date, employee_number, email, manager)
        VALUES ('${firstname}','${lastname}','${jobtitle}','${startdate}','${employeenumber}','${email}','${manager}')`);
      let employee = await client.query(`SELECT * FROM employees WHERE employee_number = '${employeenumber}'`);
      let managers = await client.query(`SELECT * FROM users WHERE fullname = '${manager}' `);
      console.log(managers.rows[0]['email'])
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
          // bcc: 'aaiteam20@gmail.com',
          subject: 'Login Details',
          html: '<!DOCTYPE html>'+
                '<html><head><title>AAI Login Details</title>'+
                '</head><body><div>'+
                '<p>Dear Candidate </p>'+
                '<p>Welcome to AAI User Access Management System. Please go to http://localhost:3000/employees/employeessignin and use the following email and temporary password to sign in and view your profile </p>'
                + employee.rows[0]['email'] +
                '<br>'
                + employee.rows[0]['password']+
                '<p>Kind Regards, </p>'+
                '<p>The AAI Team</p>'+
                '</div></body></html>'
              };

              let mailOptionsTwo = {
                from: 'aaiteam20@gmail.com',
                to: managers.rows[0]['email'],
                // bcc: 'aaiteam20@gmail.com',
                subject: 'New Employee Assigned',
                html: '<!DOCTYPE html>'+
                      '<html><head><title>AAI Login Details</title>'+
                      '</head><body><div>'+
                      '<p>Dear Manager </p>'+
                      '<p>We are pleased to inform you that you have been assigned a new member of staff. Please visit AAI portal http://localhost:3000/users/signin to set up their profile. </p>' +
                      '<br>' + 
                      '<p>Kind Regards, </p>'+
                      '<p>The AAI Team</p>'+
                      '</div></body></html>'
                    };

        transporter.sendMail(mailOptions,  function(err,data){
          if (err) {
            console.log('Error occurs', err);
          } else {
            console.log('Email sent')
          }

        });

          transporter.sendMail(mailOptionsTwo, function(err,data){
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

router.post('/deleteuser/:id', async (req, res) => {
    console.log(req.params.id)
    await client.query(`DELETE FROM employees WHERE employee_number = '${req.params.id}'`)
    res.redirect('/users/allemployees')
})

router.post('/updateemployee', async(req, res) => {
    const {first_name, last_name, job_title, employee_number, email } = req.body;
    userID = parseInt(employee_number)

    await client.query(`UPDATE employees SET first_name = '${first_name}', 
                        last_name = '${last_name}', job_title = '${job_title}', email = '${email}' 
                        WHERE employee_number = '${userID}';`)

    res.json({
        message: req.body
    })

})


router.post('/signup',async (req, res) => {
const {fullname, email, password, access } = req.body;
    try{
        let hashedPassword = await bcrypt.hash(password, SALT)
        await client.query(`INSERT INTO users (fullname, password, email, access) VALUES ('${fullname}','${hashedPassword}','${email}','${access}')`);
        res.redirect('/users/signin')
    }catch(err){
        res.json({
            message: 'Error',
            err
        })
    }
});


router.post('/signin',async (req, res) => {
    const {email, password } = req.body;
    try{
    const foundUser = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
    const compare = await (bcrypt.compare(password, foundUser.rows[0]['password']))
    if (compare === true) {
        res.cookie('email', foundUser.rows[0]['email'])
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
   res.clearCookie('email')
   res.redirect('/users/signin')
})


module.exports = router;

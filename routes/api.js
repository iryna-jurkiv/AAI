const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');
const queries = require('../db/knexQueries');

const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const nodemailer = require('nodemailer')
// eslint-disable-next-line no-undef
require('dotenv').config(); // Sets ENV configs for DB access and other global configs
let SALT = 10

// Done
router.get('/allemployees', async (req, res) => {
    const foundAll = await queries.users
        .getAll()
        .then(data => {
            return data
        })
    res.json({
        res: foundAll
    })
})

// Mostly Done, need to do let Managers
router.post('/addemployee', async (req, res) => {
    console.log(req.body)
    if(req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, SALT)
    }

  let addedEmployee = await queries.users
        .create(req.body)
        .then(data => {
            return data
        })
        .catch(err =>{
            console.log(err)
        })

    console.log(addedEmployee)

    // let transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth:{
    //     user:process.env.EMAIL,
    //     pass:process.env.PASSWORD
    //   }
    // });


    // let mailOptions = {
    //   from: 'aaiteam20@gmail.com',
    //   to: req.body.email,
    //   // bcc: 'aaiteam20@gmail.com',
    //   subject: 'Login Details',
    //   html: '<!DOCTYPE html>'+
    //         '<html><head><title>AAI Login Details</title>'+
    //         '</head><body><div>'+
    //         '<p>Dear Candidate </p>'+
    //         '<p>Welcome to AAI User Access Management System. Please go to http://localhost:3000/employees/employeessignin and use the following email and temporary password to sign in and view your profile </p>'
    //         + employee.rows[0]['email'] +
    //         '<br>'
    //         + employee.rows[0]['password']+
    //         '<p>Kind Regards, </p>'+
    //         '<p>The AAI Team</p>'+
    //         '</div></body></html>'
    //       };
    //
    //       let mailOptionsTwo = {
    //         from: 'aaiteam20@gmail.com',
    //         to: managers.rows[0]['email'],
    //         // bcc: 'aaiteam20@gmail.com',
    //         subject: 'New Employee Assigned',
    //         html: '<!DOCTYPE html>'+
    //               '<html><head><title>AAI Login Details</title>'+
    //               '</head><body><div>'+
    //               '<p>Dear Manager </p>'+
    //               '<p>We are pleased to inform you that you have been assigned a new member of staff. Please visit AAI portal http://localhost:3000/users/signin to set up their profile. </p>' +
    //               '<br>' +
    //               '<p>Kind Regards, </p>'+
    //               '<p>The AAI Team</p>'+
    //               '</div></body></html>'
    //             };
    //
    // transporter.sendMail(mailOptions,  function(err,data){
    //   if (err) {
    //     console.log('Error occurs', err);
    //   } else {
    //     console.log('Email sent')
    //   }
    //
    // });
    //
    //   transporter.sendMail(mailOptionsTwo, function(err,data){
    //     if (err) {
    //       console.log('Error occurs', err);
    //     } else {
    //       console.log('Email sent')
    //     }
    //
    // });
    res.redirect('/users/addemployee')
})

router.post('/deleteuser/:id', async (req, res) => {
    let userID = parseInt(req.params.id);

    await queries.users
        .getOne(userID)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
    res.redirect('/users/allemployees')
})

router.post('/updateemployee', async(req, res) => {
    let userID = parseInt(req.body.employee_number);

    if(req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, SALT)
    }

    await queries.users
        .update(userID, req.body)
        .then((data) => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
        res.redirect('/users/allemployees');

})

// No longer required

// router.post('/signup',async (req, res) => {
//   console.log(req.body.fullname)
// const {fullname, email, password, access } = req.body;
//     try{
//         let hashedPassword = await bcrypt.hash(password, SALT)
//   await client.query(`INSERT INTO users (fullname, password, email, access) VALUES ('${fullname}','${hashedPassword}','${email}','${access}')`);
//         res.redirect('/users/signin')
//     }catch(err){
//         res.json({
//             message: 'Error',
//             err
//         })
//     }
// });

// Done but needs testing as Bcrypt
router.post('/signin',async (req, res) => {
    const {email, password } = req.body;

    // const foundUser = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
    const foundUser = await queries.users
        .getOneByEmail(email)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err)
        })

    const compare =  await bcrypt.compare(password, foundUser[0].password)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(`Error: ${err}`)
        })
    if (compare === true) {
        res.cookie('user_id', `${foundUser[0].user_id}`);
        res.cookie('email', `${foundUser[0].email}`);
        res.cookie('access', `${foundUser[0].access_level}`);
        res.redirect('/users')
    } else {
        res.json ({
            message: 'Incorrect Password',
            url:'http://localhost:3000/users/signin'
         })
        }
});

router.post('/signout', async (req, res) => {
   res.clearCookie('user_id')
   res.clearCookie('email')
   res.clearCookie('access')
   res.redirect('/')
})



module.exports = router;

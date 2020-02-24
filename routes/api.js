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
    let managerID = parseInt(req.body.manager)

    let manager = await queries.users
        .getManager(managerID)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })

    console.log(manager.email)

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
    res.redirect('/hr/addemployee')
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
    res.redirect('/hr/allemployees')
})


// This is the request POST page
router.post('/newrequest/:id', async (req, res) => {
    let userID = parseInt(req.params.id)

    await queries.requests
        .createOne(req.body)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })

    res.redirect('/hr/allemployees')
})

router.post('/updateemployee', async(req, res) => {
    let userID = parseInt(req.body.employee_number);

    if(req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, SALT)
    }

    await queries.users
        .update(userID, req.body)
        .then((data) => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
        res.redirect('/hr/allemployees');

})

// Done but needs testing as Bcrypt
router.post('/signin',async (req, res) => {

    // const foundUser = await client.query(`SELECT * FROM hr WHERE email = '${email}'`);
    const foundUser = await queries.users
        .getOneByEmail(req.body.email)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err)
        })
    if (foundUser.length === 0) {
        return res.redirect('/')
    }

    const compare =  await bcrypt.compare(req.body.password, foundUser[0].password)
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
        if(foundUser[0].access_level === 0) {
            res.redirect('/hr')
        } else if(foundUser[0].access_level === 1) {
            res.redirect('/manager')
        } else if(foundUser[0].access_level === 2) {
            res.redirect('/staff')
        }
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

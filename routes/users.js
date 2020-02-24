const express = require('express');
const router = express.Router();
// const {client} = require('../db/db_config');
const queries = require('../db/knexQueries');



// Completed
router.get('/', (req, res) => {
    res.render('users/index',{
        email: req.cookies['email']
       }
    );
});

// Completed
router.get('/allemployees', async(req, res) => {
    let allUsers = await queries.users
        .getAll()
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })

    res.render('users/employeelist', {message: 'You are not currently signed in', allUsers});
});


// TODO
router.get('/addemployee', async (req, res) => {
    // Create search for manager function here

    const foundManagers = await queries.users
        .getByAccessLevel(1)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
    console.log(foundManagers)
        res.render('users/addemployee', {foundManagers});
});

// Done
router.get('/profile/:id', async(req, res) => {
    let userID = parseInt(req.params.id)

    let foundUser = await queries.users
        .getOneByEmployeeNumber(userID)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
    // const foundUser = await client.query(`SELECT * FROM employees WHERE employee_number = '${userID}'`);
    res.render('users/editprofile', {
        foundUser: foundUser
    })
})


// Done BUT cookies not working yet
router.get('/profile',async (req, res) => {
        const foundUser = await queries.users
            .getOneByEmail(req.cookies['email'])
            .then(data => {
                return data
            })
        if(req.cookies.email) {
            res.render('users/profile',{
                foundUser: foundUser[0]
            })
        } else {
            res.render('users/signin', {message: 'You are not logged in'})
        }
    });

router.get('/requests/:id', (req, res) => {

})

// Complete (Do we want to change this to user ID rather then first name?
router.get('/searchResults', async (req, res) => {
    const {firstname} = req.query;

    const foundUser = await queries.users
        .getOneByName(firstname)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
    if (foundUser) {
        res.render('users/searchResults',{foundUsers: foundUser} )
    } else {
        res.json ({
            message: 'No user found. Please try again'
         })
        }
});

module.exports = router;

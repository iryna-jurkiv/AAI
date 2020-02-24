const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', (req, res) => {
    res.render('hr/index',{
        email: req.cookies['email']
       }
    );
});

router.get('/allemployees', async(req, res) => {
    let allUsers = await queries.users
        .getAll()
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })

    res.render('hr/employeelist', {message: 'You are not currently signed in', allUsers});
});

router.get('/addemployee', async (req, res) => {

    const foundManagers = await queries.users
        .getByAccessLevel(1)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
        res.render('hr/addemployee', {foundManagers});
});

// List requests by ID
router.get('/requests/:id', async(req, res) => {
    let userID = parseInt(req.params.id)
    let foundUser = await queries.users
        .getOneByEmployeeID(userID)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })

    res.render('hr/newRequest', {foundUser})
})

router.get('/profile/:id', async(req, res) => {
    let userID = parseInt(req.params.id)

    let foundUser = await queries.users
        .getOneByEmployeeID(userID)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
    res.render('hr/editprofile', {
        foundUser: foundUser
    })
})

router.get('/profile',async (req, res) => {
       let userID = parseInt(req.cookies.user_id)
        const foundUser = await queries.users
            .getOneByUserID(userID)
            .then(data => {
                return data
            })
    console.log(foundUser)
        if(req.cookies.email) {
            res.render('hr/profile',{
                foundUser: foundUser
            })
        } else {
            res.render('hr/signin', {message: 'You are not logged in', foundUser: foundUser})
        }
    });

router.get('/searchResults', async (req, res) => {
    const {user_id} = req.query;
    let userID = parseInt(req.query.user_id)
    console.log(userID)
    const foundUser = await queries.users
        .getOne(userID)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
    console.log(foundUser)
    if (foundUser) {
        res.render('hr/searchResults',{foundUser: foundUser} )
    } else {
        res.json ({
            message: 'No user found. Please try again'
         })
        }
});

module.exports = router;

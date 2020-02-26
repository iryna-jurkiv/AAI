const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', (req, res) => {
    let userID = req.cookies.user_id;

    if(req.cookies.access != 0) {
        res.redirect('/')
    } else {
        res.render('hr/index',{
                email: req.cookies['email'], userID
            }
        );
    }
});

router.get('/allemployees', async(req, res) => {
    let userID = req.cookies.user_id;

    if(req.cookies.access != 0) {
        res.redirect('/');
    } else {
        let allUsers = await queries.users
            .getAll()
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
        res.render('hr/employeelist', {message: 'You are not currently signed in', allUsers, userID});
    }
});

router.get('/addemployee', async (req, res) => {
    let userID = req.cookies.user_id;

    if(req.cookies.access != 0) {
        res.redirect('/')
    } else {
        const foundManagers = await queries.users
            .getByAccessLevel(1)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
        res.render('hr/addemployee', {foundManagers, userID});
    }
});


router.get('/requests/:id', async(req, res) => {
    let userID = req.cookies.user_id;
    let sqlUserID = parseInt(req.params.id);

    if(req.cookies.access != 0) {
        res.redirect('/')
    } else {
        let foundUser = await queries.users
            .getOneByEmployeeID(sqlUserID)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
        res.render('hr/newRequest', {foundUser, userID})
    }
});

router.get('/profile/:id', async(req, res) => {
    let userID = req.cookies.user_id;

    if(req.cookies.access != 0) {
        res.redirect('/')
    } else {
        let foundUser = await queries.users
            .getOneByUserID(userID)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
        res.render('hr/editprofile', {
            foundUser, userID
        })
    }
});

router.get('/searchResults', async (req, res) => {
    let userID = req.cookies.user_id;
    const {user_id} = req.query;

    const foundUsers = await queries.users
        .getOneByName(user_id)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        });
    if (foundUsers) {
        res.render('hr/searchResults',{foundUsers: foundUsers, userID} )
    } else {
        res.json ({
            message: 'No user found. Please try again'
        })
    }
});

module.exports = router;

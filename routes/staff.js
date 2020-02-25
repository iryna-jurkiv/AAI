const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if(req.cookies.access == 0) {
        res.redirect('/')
    } else {
        const userID = parseInt(req.cookies.user_id);

        res.render('staff/index', {userID});
    }
})

router.get('/profile/:id', async (req, res) => {
    if(req.cookies.access == 0) {
        res.redirect('/')
    } else {
        const userID = parseInt(req.cookies.user_id);
        let foundUser = await queries.users
            .getOneByUserID(userID)
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })
        console.log(foundUser)
        res.render('staff/profile', {userID, foundUser})
    }
})

router.get('/requests', async(req, res) => {
    // if(req.cookies.access == 0) {
    //     res.redirect('/')
    // } else {
        const userID = parseInt(req.cookies.user_id);
        console.log(userID)
        const requests = await queries.requests
            .getAllUsersRequests(userID)
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })
    console.log(requests)

        res.render('staff/requests', {requests, userID})
    // }
})

router.post('/updateemployee', async(req, res) => {
    req.body.user_id = parseInt(req.body.user_id)

    if(req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, SALT)
    }

    let update = await queries.users
        .updateByUID(req.body.user_id, req.body)
        .then((data) => {
            return data
        })
        .catch(err => {
            console.log(err)
        })

    res.redirect('/staff')
})
module.exports = router;

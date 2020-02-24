const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', (req, res) => {
    if(req.cookies.access != 0) {
        res.redirect('/')
    } else {
        const userID = parseInt(req.cookies.user_id);

        res.render('staff/index', {userID});
    }
})

router.get('/profile/:id', async (req, res) => {
    if(req.cookies.access != 0) {
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
        res.render('staff/profile', {userID, foundUser})
    }
})

router.get('/requests', (req, res) => {
    if(req.cookies.access != 0) {
        res.redirect('/')
    } else {
        res.render('staff/index');
    }
})

module.exports = router;

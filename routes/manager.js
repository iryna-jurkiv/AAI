const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', (req, res) => {
    if(req.cookies.access != 1) {
        res.redirect('/')
    } else {
        res.render('manager/index', {
            employeefirstname: req.cookies['employeefirstname']
        });
    }
});

router.get('/allemployees', async(req, res) => {
    if(req.cookies.access != 1) {
        res.redirect('/')
    } else {
        const allUsers = await queries.users
            .getManagerStaffList(req.cookies.user_id)
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })
        res.render('manager/manageremployees', {
            employeefirstname: req.cookies['employeefirstname'],
            allUsers
        });
    }
});

router.get('/employeesprofile',async (req, res) => {
    if(req.cookies.access != 1) {
        res.redirect('/')
    } else {
        const foundUser = await queries.users
            .getOne(req.cookies.user_id)
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })

        if (foundUser) {
            res.render('manager/employeesprofile', {
                foundUser
            })
        } else {
            res.render('manager/employeessignin', {})
        }
    }
});

router.get('/video', (req, res) => {
    if(req.cookies.access != 1) {
        res.redirect('/')
    } else {
        res.render('manager/video');
    }
});


module.exports = router;

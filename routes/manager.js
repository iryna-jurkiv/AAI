const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', (req, res) => {
    if(req.cookies.access == 0 || req.cookies.access == 2) {
        res.redirect('/')
    } else {
        res.render('manager/index', {
            employeefirstname: req.cookies['employeefirstname']
        });
    }
});

router.get('/employeesprofile',async (req, res) => {
    if(req.cookies.access == 0 || req.cookies.access == 2) {
        res.redirect('/')
    } else {
        const foundEmployee = await queries.users
            .getOne(req.cookies.user_id)
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })

        if (foundEmployee) {
            res.render('manager/employeesprofile', {
                foundEmployee
            })
        } else {
            res.render('manager/employeessignin', {})
        }
    }
});

router.get('/video', (req, res) => {
    if(req.cookies.access == 0 || req.cookies.access == 1) {
        res.redirect('/')
    } else {
        res.render('manager/video');
    }
});


module.exports = router;

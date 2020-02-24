const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', (req, res) => {
    res.render('manager/index',{
        employeefirstname: req.cookies['employeefirstname']
       });
});

router.get('/employeesprofile',async (req, res) => {

    const foundEmployee = await queries.users
        .getOne(req.cookies.user_id)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })

    if(foundEmployee) {
        res.render('manager/employeesprofile',{
            foundEmployee
        })
    } else {
        res.render('manager/employeessignin', {})
    }
});

router.get('/video', (req, res) => {
    res.render('manager/video');
});


module.exports = router;

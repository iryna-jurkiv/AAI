const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

// No Changes
router.get('/', (req, res) => {
    res.render('manager/index',{
        employeefirstname: req.cookies['employeefirstname']
       });
});

// To Change (Changed to return a blob of data, ejs view needs to reflect this and changed to user ID rather then first name)
router.get('/employeesprofile',async (req, res) => {

    // const foundEmployee = await client.query(`SELECT * FROM manager WHERE first_name = '${req.cookies['employeefirstname']}'`);
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
            // firstname: foundEmployee.rows[0]['first_name'],
            // lastname: foundEmployee.rows[0]['last_name'],
            // job_title: foundEmployee.rows[0]['job_title'],
            // start_date: foundEmployee.rows[0]['start_date'],
            // employee_number: foundEmployee.rows[0]['employee_number'],
            // email: foundEmployee.rows[0]['email'],
            // manager: foundEmployee.rows[0]['manager']
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

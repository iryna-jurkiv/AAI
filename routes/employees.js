const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');

router.get('/', (req, res) => {
    res.render('employees/index',{
        employeefirstname: req.cookies['employeefirstname']
       });
});

router.get('/employeessignin', (req, res) => {
    res.render('employees/employeessignin');
});

router.get('/employeesprofile',async (req, res) => {
        try{
        const foundEmployee = await client.query(`SELECT * FROM employees WHERE first_name = '${req.cookies['employeefirstname']}'`);
        if(req.cookies.employeefirstname) {
            res.render('employees/employeesprofile',{
                firstname: foundEmployee.rows[0]['first_name'],
                lastname: foundEmployee.rows[0]['last_name'],
                job_title: foundEmployee.rows[0]['job_title'],
                employee_number: foundEmployee.rows[0]['employee_number'],
                email: foundEmployee.rows[0]['email'],

            })
        } else {
            res.render('employees/employeessignin', {})
        }

        } catch(err){
            res.json({
                message: 'Error Loading profile',
                err
            })
        }
    });


module.exports = router;

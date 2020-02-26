const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', (req, res) => {
    const userID = parseInt(req.cookies.user_id);

    if(req.cookies.access != 1) {
        res.redirect('/');
    } else {
        res.render('manager/index', {
            employeefirstname: req.cookies['employeefirstname'], userID
        });
    }
});

router.get('/allemployees', async(req, res) => {
    const userID = parseInt(req.cookies.user_id);

    if(req.cookies.access != 1) {
        res.redirect('/');
    } else {
        const allUsers = await queries.users
            .getManagerStaffList(req.cookies.user_id)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
        res.render('manager/manageremployees', {
            employeefirstname: req.cookies['employeefirstname'],
            allUsers, userID
        });
    }
});

router.get('/employeesprofile/:id',async (req, res) => {
    const userID = parseInt(req.cookies.user_id);

    if(req.cookies.access != 1) {
        res.redirect('/');
    } else {
        const foundUser = await queries.users
            .getOne(req.cookies.user_id)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });

        const foundManagers = await queries.users
            .getByAccessLevel(1)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
        if (foundUser) {
            res.render('manager/employeesprofile', {
                foundUser, userID, foundManagers
            })
        } else {
            res.render('manager/employeessignin', {})
        }
    }
});

router.get('/editemployee',async (req, res) => {
    const userID = parseInt(req.cookies.user_id);

    if(req.cookies.access != 1) {
        res.redirect('/');
    } else {
        const foundUser = await queries.users
            .getOne(req.cookies.user_id)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });

        const foundManagers = await queries.users
            .getByAccessLevel(1)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
        if (foundUser) {
            res.render('manager/employeesprofile', {
                foundUser, userID, foundManagers
            });
        } else {
            res.render('manager/employeessignin', {})
        }
    }
});

router.get('/requests/:id', async(req, res) => {
    let userID = req.cookies.user_id;
    let sqlUserID = parseInt(req.params.id);

    if(req.cookies.access != 1) {
        res.redirect('/');
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

router.get('/staffprofile/:id', async(req, res) => {
    let userID = req.cookies.user_id;
    let sqlUserID = parseInt(req.params.id);

    if(req.cookies.access != 1) {
        res.redirect('/')
    } else {
        let foundUser = await queries.users
            .getOneByUserID(sqlUserID)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
    const foundManagers = await queries.users
        .getByAccessLevel(1)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err)
        });
        if (foundUser) {
            res.render('manager/staffprofile', {
                foundUser, userID, foundManagers
            })
        } else {
            res.render('manager/employeessignin', {})
        }
    }
});

router.get('/video', (req, res) => {

    if(req.cookies.access != 1) {
        res.redirect('/');
    } else {
        res.render('manager/video');
    }
});


module.exports = router;

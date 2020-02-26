const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');
const bcrypt = require('bcrypt');
const salt = 10;

router.get('/requests', async(req, res) => {

    const userID = parseInt(req.cookies.user_id);


        const requests = await queries.requests
            .getAllUsersRequests(userID)
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })
    // console.log(requests)

        res.render('staff/requests', {requests, userID})
    // }
})

router.get('/', async (req, res) => {
    if(req.cookies.access == 0) {
        res.redirect('/');
    } else {
        const userID = parseInt(req.cookies.user_id);
        let foundUser = await queries.users
            .getOneByUserID(userID)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });

        let managerID = parseInt(foundUser.manager)

        let foundManager = await queries.users
                .getManager(managerID)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err);
                });

        let foundDepartment = await queries.users
                .getOneByDepartment(foundUser.department)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err)
                });
            // console.log(foundDepartment)

            let personalInfo = await queries.personal
                .getPersonalData(userID)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err)
                });

        res.render('staff/index', {userID, foundUser, foundManager, foundDepartment, personalInfo});
    }
});


router.get('/:id', async (req, res) => {
    let userID = parseInt(req.params.id);
        let foundUser = await queries.users
            .getOneByUserID(userID)
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })
        res.render('staff/other', {userID, foundUser})
    })

router.get('/profile/:id', async (req, res) => {
    if(req.cookies.access == 0) {
        res.redirect('/')
    } else {
        const userID = parseInt(req.cookies.user_id);
        let personalInfo = await queries.personal
            .getPersonalData(userID)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err)
            });
        let foundUser = await queries.users
            .getOneByUserID(userID)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
        console.log(`ERR: ${personalInfo}`);
        res.render('staff/profile', {userID, foundUser, personalInfo})
    }
});


router.post('/createpersonaldetails', async(req, res) => {
    req.body.employee_number = parseInt(req.body.employee_number)

     await queries.personal
        .create(req.body)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        }
    );
    res.redirect('/staff')
});


router.post('/updatepersonaldetails', async(req, res) => {
    req.body.employee_number = parseInt(req.body.employee_number);
    let userID = req.cookies.user_id;

    await queries.personal
        .update(userID, req.body)
        .then(data => {
            console.log(data);
            return data
        })
        .catch(err => {
                console.log(err)
            }
        );
    res.redirect('/staff')
});

router.post('/updateemployee', async(req, res) => {
    req.body.user_id = parseInt(req.body.user_id);

    if(req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    await queries.users
        .updateByUID(req.body.user_id, req.body)
        .then((data) => {
            return data
        })
        .catch(err => {
            console.log(err)
        });
    res.redirect('/staff')
});

module.exports = router;

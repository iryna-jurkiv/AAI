const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', async (req, res) => {
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
          let foundDepartment = await queries.users
                  .getOneByDepartment(foundUser.department)
                  .then(data => {
                      return data;
                  })
                  .catch(err => {
                      console.log(err)
                  });
        res.render('hr/index',{
                email: req.cookies['email'], userID, foundUser, foundDepartment
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

        let foundManager = await queries.users
                .getManager(foundUser.manager)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err);
                });
        res.render('hr/newRequest', {foundUser, userID, foundManager})
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

router.get('/:id', async (req, res) => {
    let userID = parseInt(req.params.id);
        let foundUser = await queries.users
            .getOneByUserID(userID)
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            });


            let personalInfo = await queries.personal
                .getPersonalData(userID)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err)
                });

        res.render('hr/other', {userID, foundUser, personalInfo})
    });


module.exports = router;

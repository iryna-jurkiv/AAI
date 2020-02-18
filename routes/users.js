const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');

// const UsersController = require('../controllers/user');

router.get('/', (req, res) => {
    res.render('users/index')
});

router.get('/signup', (req, res) => {
    res.render('users/signup')
});

router.get('/login', (req, res) => {
    res.render('users/login', {})
});

// router.post('/users', UsersController.Create());
// router.get('/session/new', UsersController.Login);
// router.post('/session', UsersController.Authenticate);
// router.post('/logout', UsersController.Logout);
// router.get('/users/:id', UsersController.Bio);
// router.post('/users/:id', UsersController.Edit);

module.exports = router;

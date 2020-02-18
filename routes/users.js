const express = require('express');
const router = express.Router();

var UsersController = require('../controllers/users')

router.get('/users/new', UsersController.Index);
router.post('/users', UsersController.Create);
router.get('/session/new', UsersController.Login);
router.post('/session', UsersController.Authenticate);
router.post('/logout', UsersController.Logout);
router.get('/users/:id', UsersController.Bio);
router.post('/users/:id', UsersController.Edit);

module.exports = router;

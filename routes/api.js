const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');


router.post('/signup', (req, res) => {
    const {username, email, password } = req.body;

    console.log(req.body);
    res.json({
        message: 'Post Success',
        requestBody: req.body
    })
});


module.exports = router;
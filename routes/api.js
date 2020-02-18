const express = require('express');
const router = express.Router();
const {client} = require('../db/db_config');


router.post('/signup', (req, res) => {
    console.log(req)
});


module.exports = router;
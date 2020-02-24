const express = require('express');
const router = express.Router();
const queries = require('../db/knexQueries');

router.get('/', (req, res) => {
    res.render('staff/index')
})

router.get('/profile/:id', (req, res) => {
    res.render('staff/index')
})

router.get('/requests', (req, res) => {
    res.render('staff/index')
})

module.exports = router;

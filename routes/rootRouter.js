const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.cookies.access === 0) {
        res.redirect('/staff')
    } else if(req.cookies.access === 1) {
        res.redirect('/manager')
    } else if(req.cookies.access === 2) {
        res.redirect('/hr')
    } else {
        res.render('signin', {message: 'You are not currently signed in'});
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.cookies.user_id){
        res.redirect('/users')
    } else {
        res.render('users/signin', {message: 'You are not currently signed in'});
    }
});

module.exports = router;

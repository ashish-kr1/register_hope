const express = require('express');
const router = express.Router();
var passport = require('passport');
const user = require('../config/controller/user');
router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    res.json({ user: req.user });
});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');

});
router.post('/forgetPassword',user.forgetPassword);
module.exports = router;
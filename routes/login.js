const route = require('express').Router();
const passport = require('./../auth/passporthandler');

route.get('/', (req, res) => {
    res.render("login-landing-page", {});
});

route.get('/student', (req, res) => {
    res.render("login", {role: 'student'})
});

route.get('/company', (req, res) => {
    res.render("login", {role: 'company'})
});

route.get('/admin', (req, res) => {
    res.render("login", {role: 'admin'})
});

route.post('/student', passport.authenticate('local-student', {
    failureRedirect: '/login/student',
    successRedirect: '/profile'
}));

route.post('/company', passport.authenticate('local-company', {
    failureRedirect: '/login/company',
    successRedirect: '/profile'
}));

route.post('/admin', passport.authenticate('local-admin', {
    failureRedirect: '/login/admin',
    successRedirect: '/profile'
}));

module.exports = route;

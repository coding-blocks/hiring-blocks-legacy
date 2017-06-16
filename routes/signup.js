const route = require('express').Router();
const models = require('./../db/models').models;
const password = require('../utils/password');
const secret = require('./../secrets.json');

route.get('/', (req, res) => {
    res.render("signup-landing-page", {});
});


route.get('/student', (req, res) => {
    res.render("signup", {role: 'student'});
});

route.get('/company', (req, res) => {
    res.render("signup", {role: 'company'});
});

route.get('/admin', (req, res) => {
    res.render("signup", {role: 'admin', isAdmin: true});
});

route.post('/student', (req, res) => {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.StudentLocal.create({
            email: req.body.email,
            password: hash,
            student: {
                name: req.body.name,
                email: req.body.email
            }
        }, {
            include: [models.Student]
        }).then(function (studentLocal) {
            if (studentLocal) {
                res.send({success: 'true'});
            } else {
                res.send({success: 'false'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({success: 'error'});
        })
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'});
    })
});

route.post('/company', (req, res) => {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.CompanyLocal.create({
            email: req.body.email,
            password: hash,
            student: {
                name: req.body.name,
                email: req.body.email
            }
        }, {
            include: [models.Company]
        }).then(function (companyLocal) {
            if (companyLocal) {
                res.send({success: 'true'});
            } else {
                res.send({success: 'false'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({success: 'error'});
        })
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'});
    })
});

route.post('/admin', (req, res) => {
    if (req.body.secret !== secret.ADMIN_SECRET) {
        res.send("Not Allowed");
    }

    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.Admin.create({
            email: req.body.email,
            password: hash,
            name: req.body.name
        }).then(function (adminLocal) {
            if (adminLocal) {
                res.send({success: 'true'});
            } else {
                res.send({success: 'false'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({success: 'error'});
        })
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'});
    })
});

module.exports = route;
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
        res.status(403).send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        console.log(password);
        console.log(hash);
        models.UserLocal.create({
            email: req.body.email,
            password: hash,
            role: "Student",
            companyId: 0,
            adminId: 0,
            student: {
                name: req.body.name,
                email: req.body.email
            }
        }, {
            include: [models.Student]
        }).then(function (studentLocal) {
            if (studentLocal) {
                res.status(200).send({success: true});
            } else {
                res.status(404).send({success: false})
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).send({success: 'error'});
        })
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({success: 'error'});
    })
});

route.post('/company', (req, res) => {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.status(403).send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.UserLocal.create({
            email: req.body.email,
            password: hash,
            role: "Company",
            studentId: 0,
            adminId: 0,
            company: {
                name: req.body.name,
                email: req.body.email
            }
        }, {
            include: [models.Company]
        }).then(function (companyLocal) {
            if (companyLocal) {
                res.status(201).send({success: true});
            } else {
                res.status(400).send({success: false})
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).send({success: 'error'});
        })
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({success: 'error'});
    })
});

route.post('/admin', (req, res) => {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.status(403).send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.UserLocal.create({
            email: req.body.email,
            password: hash,
            role: "Admin",
            studentId: 0,
            companyId: 0,
            admin: {
                name: req.body.name,
                email: req.body.email
            }
        }, {
            include: [models.Admin]
        }).then(function (adminLocal) {
            if (adminLocal) {
                res.status(201).send({success: true});
            } else {
                res.status(400).send({success: false})
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).send({success: 'error'});
        })
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({success: 'error'});
    })
});

route.post('/user', function (req, res) {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.status(403).send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        console.log(password);
        console.log(hash);
        models.User.create({
                email: req.body.email,
                name: req.body.name,
                userlocal: {password: hash}
            }
            , {
                include: [models.UserLocal]
            }).then(function (user) {
            if (user) {
                res.status(201).send({success: true});
            } else {
                res.status(400).send({success: false})
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).send({success: 'error'});
        })
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({success: 'error'});
    })
});

module.exports = route;
const route = require('express').Router();
const models = require('./../db/models').models;
const uid = require('uid2');
const password = require('../utils/password');


route.post('/student', (req, res) => {
    console.log(1);
    models.StudentLocal.findOne({
        where: {
            email: req.body.email,
        },
        include: [models.Student]
    }).then(function (studentLocal) {
        if (studentLocal) {
            password.compare2hash(req.body.password, studentLocal.password).then(function (match) {
                if (match) {
                    models.AuthStudent.create({
                        token: uid(30),
                        studentId: studentLocal.student.id
                    }).then(function (authToken) {
                        console.log(4);
                        res.send({
                            success: 'true',
                            token: authToken.token
                        })
                    }).catch(function (err) {
                        console.log(5);
                        console.log(err);
                        res.send({success: 'false'})
                    })
                } else {
                    res.send({success: 'false', message: 'Incorrect Password'})
                }
            }).catch(function (err) {
                console.log(err);
                res.send({success: 'false'})
            })
        } else {
            res.send({
                success: 'false', message: 'Incorrect Email'
            })
        }
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'false'})
    })
});


route.post('/company', (req, res) => {
    console.log(1);
    models.CompanyLocal.findOne({
        where: {
            email: req.body.email,
        },
        include: [models.Company]
    }).then(function (companyLocal) {
        console.log(companyLocal);
        if (companyLocal) {
            password.compare2hash(req.body.password, companyLocal.password).then(function (match) {
                if (match) {
                    models.AuthCompany.create({
                        token: uid(30),
                        companyId: companyLocal.company.id
                    }).then(function (authToken) {
                        console.log(4);
                        res.send({
                            success: 'true',
                            token: authToken.token
                        })
                    }).catch(function (err) {
                        console.log(5);
                        console.log(err);
                        res.send({success: 'false'})
                    })
                } else {
                    res.send({success: 'false', message: 'Incorrect Password'})
                }
            }).catch(function (err) {
                console.log(err);
                res.send({success: 'false'})
            })
        } else {
            res.send({
                success: 'false', message: 'Incorrect Email'
            })
        }
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'false'})
    })
});


route.post('/admin', (req, res) => {
    console.log(1);
    models.Admin.findOne({
        where: {
            email: req.body.email,
        }
    }).then(function (admin) {
        if (admin) {
            password.compare2hash(req.body.password, admin.password).then(function (match) {
                if (match) {
                    models.AuthAdmin.create({
                        token: uid(30),
                        adminId: admin.id
                    }).then(function (authToken) {
                        console.log(4);
                        res.send({
                            success: 'true',
                            token: authToken.token
                        })
                    }).catch(function (err) {
                        console.log(5);
                        console.log(err);
                        res.send({success: 'false'})
                    })
                } else {
                    res.send({success: 'false', message: 'Incorrect Password'})
                }
            }).catch(function (err) {
                console.log(err);
                res.send({success: 'false'})
            })
        } else {
            res.send({
                success: 'false', message: 'Incorrect Email'
            })
        }
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'false'})
    })
});

module.exports = route;

const route = require('express').Router();
const models = require('./../db/models').models;
const uid = require('uid2');


route.post('/student', (req, res) => {
    password.pass2hash(req.body.password).then(function (hash) {
        models.StudentLocal.findOne({
            where: {
                email: req.body.email,
                password: hash
            },
            include: [models.Student]
        }).then(function (studentLocal) {
            if (studentLocal) {
                models.AuthStudent.create({
                    token: uid(30),
                    studentId: studentLocal.student.id
                }).then(function (authToken) {
                    res.send({
                        success: 'true',
                        token: authToken.token
                    })
                }).catch(function (err) {
                    console.log(err);
                    res.send({success: 'false'})
                })
            }
        }).catch(function (err) {
            console.log(err);
            res.send({success: 'false'})
        })
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'});
    })
});

route.post('/company', (req, res) => {
    password.pass2hash(req.body.password).then(function (hash) {
        models.CompanyLocal.findOne({
            where: {
                email: req.body.email,
                password: hash
            },
            include: [models.Company]
        }).then(function (companyLocal) {
            if (companyLocal) {
                models.AuthCompany.create({
                    token: uid(30),
                    companyId: companyLocal.company.id
                }).then(function (authToken) {
                    res.send({
                        success: 'true',
                        token: authToken.token
                    })
                }).catch(function (err) {
                    console.log(err);
                    res.send({success: 'false'})
                })
            }
        }).catch(function (err) {
            console.log(err);
            res.send({success: 'false'})
        })
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'});
    })
});

route.post('/admin', (req, res) => {
    password.pass2hash(req.body.password).then(function (hash) {
        models.Admin.findOne({
            where: {
                email: req.body.email,
                password: hash
            }
        }).then(function (admin) {
            if (admin) {
                models.AuthStudent.create({
                    token: uid(30),
                    adminId: admin.id
                }).then(function (authToken) {
                    res.send({
                        success: 'true',
                        token: authToken.token
                    })
                }).catch(function (err) {
                    console.log(err);
                    res.send({success: 'false'})
                })
            }
        }).catch(function (err) {
            console.log(err);
            res.send({success: 'false'})
        })
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'});
    })
});
module.exports = route;

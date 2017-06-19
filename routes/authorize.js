const route = require('express').Router();
const models = require('./../db/models').models;
const uid = require('uid2');
const password = require('../utils/password');


route.post('/', (req, res) => {
    console.log(1);
    models.UserLocal.findOne({
        where: {
            email: req.body.email,
        },
        include: [models.Student, models.Company, models.Admin]
    }).then(function (userLocal) {
        if (userLocal) {
            password.compare2hash(req.body.password, userLocal.password).then(function (match) {
                if (match) {
                    models.Auth.create({
                        token: uid(30),
                        role: userLocal.role,
                        studentId: userLocal.student.id,
                        companyId: userLocal.companyId,
                        adminId: userLocal.adminId
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

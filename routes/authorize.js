const route = require('express').Router();
const models = require('./../db/models').models;
const uid = require('uid2');
const password = require('../utils/password');


route.post('/', (req, res) => {
    console.log(1);
    models.User.findOne({
        where: {
            email: req.body.email,
        },
        include: [models.UserLocal, models.Student, models.CompanyManager, models.Admin]
    }).then(function (user) {
        if (user) {
            password.compare2hash(req.body.password, user.userlocal.password).then(function (match) {
                if (match) {
                    models.AuthToken.create({
                        token: uid(30),
                        role: user.hasOwnProperty('student') ? 'Student' : user.hasOwnProperty('companymanager') ? 'CompanyManager' : user.hasOwnProperty('admin') ? "Admin" : "",
                        userId:user.id
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

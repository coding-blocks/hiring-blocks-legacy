const router = require('express').Router();
const models = require('./../db/models').models;


router.post('/student', (req, res) => {
    password.pass2hash(req.body.password).then(function (hash) {

        models.StudentLocal.findOne({
            where: {
                email: req.body.email,
                password: hash
            }
            //TODO : Same as login
        }).then(function (student) {
            if (student) {
                models.AuthStudent.create({
                    token: uid(30),
                    studentId: student.id
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


module.exports = router;

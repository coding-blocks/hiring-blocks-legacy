const LocalStrategy = require('passport-local').Strategy;
const models = require('./../../../db/models').models;

const passutils = require('./../../../utils/password');

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    passutils.pass2hash(password).then(function (hash) {
        models.StudentLocal.findOne({
            where: {email: email},
            include: models.Student
        }).then(function (studentlocal) {
            if (!studentlocal)
                return done(null, false, {message: 'Incorrect email'});
            if (studentlocal.password === hash) {
                return done(null, studentlocal.student);
            } else {
                return done(null, false, {message: 'Incorrect password'});
            }
        }).catch(function (err) {
            console.log(err);
            return done(err, false, {message: 'invalid user'});
        });
    }).catch(function () {
        console.log(err);
        res.send({success: 'error'});
    });
});

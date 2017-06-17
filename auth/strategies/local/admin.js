const LocalStrategy = require('passport-local').Strategy;
const models = require('./../../../db/models').models;


const passutils = require('./../../../utils/password');


module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    models.Admin.findOne({
        where: {email: email},
        include: models.Student
    }).then(function (admin) {
        console.log(admin);
        if (!admin) {
            return done(null, false, {message: 'Incorrect email'});
        } else {
            password.compare2hash(password, admin.password).then(function (match) {
                if (match) {
                    console.log(2);
                    delete admin.password;
                    return done(null, admin);
                } else {
                    console.log(3);
                    return done(null, false, {message: 'Incorrect password'});
                }
            }).catch(function (err) {
                console.log(err);
                return done(err, false, {message: 'invalid user'});
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'});
    });
});


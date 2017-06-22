const LocalStrategy = require('passport-local').Strategy;
const models = require('./../../../db/models').models;

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {

    models.User.findOne({
        where: {email: email},
        include: models.UserLocal
    }).then(function (user) {
        console.log(user);
        if (!user) {
            return done(null, false, {message: 'Incorrect email'});
        } else {
            passutils.compare2hash(password, user.userlocal.password).then(function (match) {
                if (match) {
                    console.log(2);
                    delete user.userlocal;
                    return done(null, user);
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
        done(err);
    });
});

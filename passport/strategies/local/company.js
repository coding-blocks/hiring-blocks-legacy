const LocalStrategy = require('passport-local').Strategy;
const models = require('./../../../db/models').models;


const passutils = require('./../../../utils/password');


module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    models.CompanyLocal.findOne({
        where: {email: email},
        include: models.Tutor
    }).then(function (companylocal) {
        if(!companylocal)
            return done(null, false, {message: 'Incorrect email'});
        passutils.compare2hash(password, companylocal.password).then(function (match) {
            if (match) {
                // TODO: Check if get or not
                return done(null, companylocal.tutor);
            } else {
                return done(null, false, {message: 'Incorrect password'});
            }
        }).catch(function (err) {
            console.log(err);
            return done(err, false, {message: err})
        });

    }).catch(function (err) {
        console.log(err);
        return done(err,false,{message: 'invalid tutor'});
    });

});

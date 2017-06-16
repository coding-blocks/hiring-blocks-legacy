const LocalStrategy = require('passport-local').Strategy;
const models = require('./../../../db/models').models;


const passutils = require('./../../../utils/password');


module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    passutils.pass2hash(password).then(function (hash) {
        models.CompanyLocal.findOne({
            where: {email: email},
            include: models.Company
        }).then(function (companylocal) {
            if (!companylocal)
                return done(null, false, {message: 'Incorrect email'});
            if (companylocal.password === hash) {
                return done(null, companylocal.company);
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

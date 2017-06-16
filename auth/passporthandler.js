const passport = require('passport');
const models = require('./../db/models').models;

const localStudentStrategy = require('./strategies/local/student');
const localCompanyStrategy = require('./strategies/local/company');
const localAdminStrategy = require('./strategies/local/admin');
const bearerStudentStrategy = require('./strategies/bearer/student');
const bearerCompanyStrategy = require('./strategies/bearer/company');
const bearerAdminStrategy = require('./strategies/bearer/admin');

passport.serializeUser(function (user, cb) {
    return cb(null, {key: user.id, role: user.role});
});


passport.deserializeUser(function (user, cb) {

    if (user.role === 'Student') {
        models.Student.findByPrimary(user.key).then(function (student) {
            return cb(null, student);
        }).catch(function (err) {
            console.log(err);
            cb(err, false);
        })

    } else if (user.role === 'Company') {
        models.Company.findByPrimary(user.key).then(function (company) {
            return cb(null, company);
        }).catch(function (err) {
            console.log(err);
            cb(err, false);
        })

    } else if (user.role === 'Admin') {
        models.Admin.findByPrimary(user.key).then(function (admin) {
            return cb(null, admin);
        }).catch(function (err) {
            console.log(err);
            cb(err, false);
        })

    } else {
        cb((new Error("Could not deserialize")), false);
    }

});


passport.use('local-student', localStudentStrategy);
passport.use('local-company', localCompanyStrategy);
passport.use('local-admin', localAdminStrategy);
passport.use('bearer-student', bearerStudentStrategy);
passport.use('bearer-company', bearerCompanyStrategy);
passport.use('bearer-admin', bearerAdminStrategy);

module.exports = passport;


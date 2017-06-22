const passport = require('passport');
const models = require('./../db/models').models;

const localStudentStrategy = require('./strategies/local/student');
const localCompanyStrategy = require('./strategies/local/company');
const localAdminStrategy = require('./strategies/local/admin');
const bearerStrategy = require('./strategies/bearer/bearerStrategy');


passport.serializeUser(function (user, cb) {
    if (!user.user) {
        return cb(null, user);
    }
    return cb(null, {key: user.user.id, role: user.role});
});


passport.deserializeUser(function (userObj, cb) {
    if (!userObj.key) {
        return cb(null, userObj);
    }
    if (userObj && userObj.role) {
        models[userObj.role].findByPrimary(userObj.key).then(function (user) {
            return cb(null, {role: userObj.role, user: user});
        }).catch(function (err) {
            console.log(err);
            cb(err, false);
        })

    }
    else {
        cb((new Error("Could not deserialize")), false);
    }

});

passport.use('local-student', localStudentStrategy);
passport.use('local-company', localCompanyStrategy);
passport.use('local-admin', localAdminStrategy);
passport.use('bearer', bearerStrategy);

module.exports = passport;


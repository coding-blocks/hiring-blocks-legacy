const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('./../../../db/models').models;

module.exports = new BearerStrategy(function (token, done) {
    models.Auth.findOne({
        where: {
            token: token
        },
        include: [models.Student, models.Company, models.Admin]
    }).then(function (authToken) {
        //TODO ask how to work with {}
        if (authToken && authToken.student.hasOwnProperty('id')) {
            return done(null, authToken.student);
        } else if (authToken && authToken.company.hasOwnProperty('id')) {
            return done(null, authToken.company);
        } else if (authToken && authToken.admin.hasOwnProperty('id')) {
            return done(null, authToken.admin);
        } else {
            return done(null, false, {message: 'Could not authorize'})
        }
    }).catch(function (err) {
        console.log(err);
        return done(err, false);
    })
});
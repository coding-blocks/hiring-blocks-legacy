const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('./../../../db/models').models;

module.exports = new BearerStrategy(function (token, done) {
    models.AuthStudent.findOne({
        where: {
            token: token
        },
        include: [models.Student]
    }).then(function (authToken) {
        if (authToken && authToken.student) {
            return done(null, authToken.student);
        } else {
            return done(null, false, {message: 'Could not authorize'})
        }
    }).catch(function (err) {
        console.log(err);
        return done(err, false);
    })
});
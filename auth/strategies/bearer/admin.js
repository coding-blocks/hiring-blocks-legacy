const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('./../../../db/models').models;

module.exports = new BearerStrategy(function (token, done) {
    models.AuthAdmin.findOne({
        where: {
            token: token
        },
        include: [models.Admin]
    }).then(function (authToken) {
        if (authToken && authToken.admin) {
            return done(null, authToken.admin);
        } else {
            return done(null, false, {message: 'Could not authorize'})
        }
    }).catch(function (err) {
        console.log(err);
        return done(err, false);
    })
});
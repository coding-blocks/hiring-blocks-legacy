const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('./../../../db/models').models;

module.exports = new BearerStrategy(function (token, done) {
    models.AuthCompany.findOne({
        where: {
            token: token
        },
        include: [models.Company]
    }).then(function (authToken) {
        if (authToken && authToken.company) {
            return done(null, authToken.company);
        } else {
            return done(null, false, {message: 'Could not authorize'})
        }
    }).catch(function (err) {
        console.log(err);
        return done(err, false);
    })
});
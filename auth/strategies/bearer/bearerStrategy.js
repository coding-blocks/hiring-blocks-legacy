const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('./../../../db/models').models;

module.exports = new BearerStrategy(function (token, done) {
    if (token === null || token === undefined) {
        return done(null, false, {message: 'Could not authorize'});
    }
    models.AuthToken.findOne({
        where: {
            token: token
        },

        include: [models.User]
    }).then(function (authToken) {

        //TODO : Ask if we need student or something like that here or not.
        if (authToken && authToken.user) {
            return done(null, authToken.user);
        }
        else {
            return done(null, false);
        }
    }).catch(function (err) {
        console.log("12");
        console.log(err);
        return done(err, false);
    })
});
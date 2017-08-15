const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('./../../../db/models').models;
const config = require('./../../../config');

module.exports = new BearerStrategy(function (token, done) {
    if (config.DEV_MODE) {
        return done(null, {id: 1, name: "Admin"});
    }
    if (token === null || token === undefined) {
        return done(null, false, {message: 'Could not authorize'});
    }
    models.OneAuth.findOne({
        where: {
            token: token
        },
        include: [models.User]
    }).then(function (authToken) {

        //TODO : Ask if we need student or something like that here or not.
      // we dont need any student or companymanager info here as this barely needs to authenticate if this token is authorized or not!
      //the roles can be checked using the util functions in authutils.
        if (authToken && authToken.user) {
            return done(null, authToken.user);
        }
        else {
            return done(null, false);
        }
    }).catch(function (err) {
        console.log(err);
        return done(err, false);
    })
});
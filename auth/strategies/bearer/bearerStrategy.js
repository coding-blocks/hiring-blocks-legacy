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
        include: [{
            model: models.User,
            include: [models.Student, models.CompanyManager, models.Admin]
        }]
    }).then(function (authToken) {

        //TODO : Ask if we need student or something like that here or not.
        console.log(authToken.get());
        if (authToken && authToken.user) {
            return done(null, authToken.user);
        }
        // else if (authToken && authToken.user.companymanager) {
        //     return done(null, {role: "CompanyManager", user: authToken.user.companymanager});
        // }
        // else if (authToken && authToken.user.admin) {
        //     return done(null, {role: "Admin", user: authToken.user.admin});
        // }
        else {
            console.log("12");
            return done(null, {role: 'User', user: null});
        }
    }).catch(function (err) {
        console.log("12");
        console.log(err);
        return done(err, false);
    })
});
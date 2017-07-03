const passport = require('passport');
const models = require('./../db/models').models;

const localStrategy = require('./strategies/local/localStrategy');
const bearerStrategy = require('./strategies/bearer/bearerStrategy');


passport.serializeUser(function (user, cb) {
    if (!user) {
        return cb(null, false)
    }
    return cb(null, user.id);
});


passport.deserializeUser(function (userId, cb) {
    if (!userId) {
        return cb(null, userId);
    }

    models.User.findByPrimary(userId).then(function (user) {
        return cb(null, user);
    }).catch(function (err) {
        console.log(err);
        cb(err, false);
    })

});

passport.use(localStrategy);

passport.use(bearerStrategy);

module.exports = passport;


const route = require('express').Router();

route.get('/', (req, res) => {
    req.user = null;
    req.logout();
    req.session.destroy(() => {
        res.redirect('/login')
    });
    //TODO: If there is token, destroy the token from AuthToken table

});

module.exports = route;

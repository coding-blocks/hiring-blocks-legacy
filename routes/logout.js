const route = require('express').Router();

route.get('/logout', (req, res) => {
    req.user = null;
    req.logout();
    req.session.destroy(() => {
        res.redirect('/login')
    });

});

module.exports = route;

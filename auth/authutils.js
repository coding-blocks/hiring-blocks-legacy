const models = require('./../db/models').models;

function ensureLogin(fallbackPath) {

    return function (req, res, next) {

        if (!req.user) {
            res.redirect(fallbackPath)
        } else {
            next();
        }
    }
}



function ensureCompanyManager(fallbackPath) {

    return function (req, res, next) {

        if (req.user) {
            models.CompanyManager.findOne({
                where: {userId: req.user.id}
            }).then(function (user) {
                if(user)
                    next();
                else
                    res.redirect(fallbackPath)
            })
        } else {
            res.redirect(fallbackPath);
        }
    }
}

function ensureAdmin(fallbackPath) {
    return function (req, res, next) {

        if (req.user) {
            models.Admin.findOne({
                where: {userId: req.user.id}
            }).then(function (user) {
                if(user)
                    next();
                else
                    res.redirect(fallbackPath)
            })
        } else {
            res.redirect(fallbackPath);
        }
    }
}

function ensureStudent(fallbackPath) {
    return function (req, res, next) {

        if (req.user) {
            models.Student.findOne({
                where: {userId: req.user.id}
            }).then(function (user) {
                if(user)
                    next();
                else
                    res.redirect(fallbackPath)
            })
        } else {
            res.redirect(fallbackPath);
        }
    }
}


module.exports = {
    ensureLogin,
    ensureAdmin,
    ensureCompanyManager,
    ensureStudent
};
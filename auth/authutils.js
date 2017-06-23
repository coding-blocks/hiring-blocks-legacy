const models = require('./../db/models').models;

function ensureLogin() {

    return function (req, res, next) {

        if (!req.user) {
            res.send("Please login first");
        } else {
            next();
        }
    }
}



function ensureCompanyManager() {

    return function (req, res, next) {

        if (req.user) {
            models.CompanyManager.findOne({
                where: {userId: req.user.id}
            }).then(function (user) {
                if(user)
                    next();
                else
                    res.send("Only Company Managers Allowed");
            })
        } else {
            res.send("Please login first");
        }
    }
}

function ensureAdmin() {
    return function (req, res, next) {

        if (req.user) {
            models.Admin.findOne({
                where: {userId: req.user.id}
            }).then(function (user) {
                if(user)
                    next();
                else
                    res.send("Only Admins Allowed");
            })
        } else {
            res.send("Please login first");
        }
    }
}

function ensureStudent() {
    return function (req, res, next) {

        if (req.user) {
            models.Student.findOne({
                where: {userId: req.user.id}
            }).then(function (user) {
                if(user)
                    next();
                else
                    res.send("Only Students Allowed")
            })
        } else {
            res.send("Please login first");
        }
    }
}


module.exports = {
    ensureLogin,
    ensureAdmin,
    ensureCompanyManager,
    ensureStudent
};
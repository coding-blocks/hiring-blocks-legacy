
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

        if (req.user && req.user.companymanager) {
            next()
        } else {
            res.redirect(fallbackPath);
        }
    }
}

function ensureAdmin(fallbackPath) {
    return function (req, res, next) {

        if (req.user && req.user.admin) {
            next();
        } else {
            res.redirect(fallbackPath);
        }
    }
}

function ensureStudent(fallbackPath) {
    return function (req, res, next) {

        if (req.user && req.user.student) {
            next();
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

function ensureLogin(fallbackPath) {

    return function (req, res, next) {

        if (!req.user) {
            res.redirect(fallbackPath)
        } else {
            next();
        }
    }
}


function ensureCompany(fallbackPath) {

    return function (req, res, next) {

        if (req.user && req.user.role === 'Company') {
            next()
        } else {
            res.redirect(fallbackPath);
        }
    }
}

function ensureAdmin(fallbackPath) {
    return function (req, res, next) {

        if (req.user && req.user.role === 'Admin') {
            next();
        } else {
            res.redirect(fallbackPath);
        }
    }
}


module.exports = {
    ensureLogin,
    ensureAdmin,
    ensureCompany
};

function ensureLogin() {

    return function (req, res, next) {

        if (!req.user) {
            res.redirect('http://localhost:4000/');
        } else {
            next();
        }
    }
}


function ensureCompany() {

    return function (req, res, next) {

        if (req.user && req.user.role === 'Company') {
            next()
        } else {
            res.send({success:'false',url:'http://localhost:4000/',message:"Companies Only"});
        }
    }
}

function ensureAdmin() {
    return function (req, res, next) {

        if (req.user && req.user.role === 'Admin') {
            next();
        } else {
            res.send({success:'false',url:'http://localhost:4000/',message:"Admin Only"});
        }
    }
}


module.exports = {
    ensureLogin,
    ensureAdmin,
    ensureCompany
};
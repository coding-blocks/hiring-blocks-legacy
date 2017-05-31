const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Returns promise
 */
const pass2hash = function (pass) {
    return bcrypt.hash(pass, saltRounds)
};

const compare2hash = function (pass, hash) {
    return bcrypt.compare(pass, hash)
};

module.exports = {
    pass2hash, compare2hash
};
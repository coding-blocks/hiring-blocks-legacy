const router = require('express').Router();
const passport = require('../../auth/passporthandler');
const config = require('./../../config');

router.use('/students', require('./students'));

router.use('/companymanagers', require('./companyManager'));
router.use('/admins', require('./admin'));
router.use('/companies', require('./companies'));
router.use('/jobs', require('./jobs'));
router.use('/users', passport.authenticate('bearer'), require('./users'));

// config.DEV_MODE ? function (req, res, next) {
//   next();
// } :


  module.exports = router;
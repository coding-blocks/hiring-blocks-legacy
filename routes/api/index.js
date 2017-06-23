const router = require('express').Router();
const passport = require('../../auth/passporthandler');

router.use('/students', require('./students'));
router.use('/companymanager', require('./companyManager'));
router.use('/admin', require('./admin'));
router.use('/companies', require('./companies'));
router.use('/jobs', require('./jobs'));
router.use('/users',passport.authenticate('bearer'), require('./users'));

module.exports = router;
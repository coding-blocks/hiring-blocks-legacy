const router = require('express').Router();
const passport = require('../../auth/passporthandler');

// router.use(passport.authenticate(['bearer-student','session']));

router.use('/students', require('./students'));
router.use('/companymanager', require('./companymanager'));
router.use('/admin', require('./admin'));
router.use('/companies', require('./companies'));
router.use('/jobs', require('./jobs'));

module.exports = router;
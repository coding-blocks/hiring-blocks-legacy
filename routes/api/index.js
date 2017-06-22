const router = require('express').Router();
const passport = require('../../auth/passporthandler');

router.use(passport.authenticate('bearer'));

router.use('/students', require('./students'));
router.use('/companies', require('./companies'));
router.use('/jobs', require('./jobs'));

module.exports = router;
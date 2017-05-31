const router = require('express').Router();

router.use('/students', require('./students'));
router.use('/companies', require('./companies'));
router.use('/jobs', require('./jobs'));

module.exports = router;
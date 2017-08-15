const router = require('express').Router();
const passport = require('../../auth/passporthandler');
const config = require('./../../config');
const models = require('./../../db/models').models;

router.use('/students', require('./students'));

router.use('/companymanagers', require('./companyManager'));
router.use('/admins', require('./admin'));
router.use('/companies', require('./companies'));
router.use('/jobs', require('./jobs'));
router.use('/users', config.DEV_MODE ? function(req,res,next){
  models.User.create({
    name: "User1"
  }).then(function (user) {
    if (user){
      req.user = {id :1};
      next();}
    else
      return res.status(500).send("could not create the user");
  }).catch(function (err) {
    console.log(err);
    return res.status(500).send("could not create the user");
  });}:passport.authenticate('bearer'), require('./users'));

// config.DEV_MODE ? function (req, res, next) {
//   next();
// } :


  module.exports = router;
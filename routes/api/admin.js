const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');
const ensure = require('./../../auth/authutils');
const passport = require('./../../auth/passporthandler');

//FIXME : Incorrect
// fixed
router.post('/add', passport.authenticate('bearer'),ensure.ensureAdmin,function (req, res) {
    if(!req.body.userId === true){
      res.status(400).send("Only valid users can be made admins");
    }
        models.Admin.create({
          cbCentre: req.body.cbCentre,
          cbDesignation: req.body.cbDesignation,
          userId: req.body.userId
        }).then(function (admin) {
            if (admin)
                res.status(201).send("Admin created");
            else
                res.status(500).send("Could not create the Admin.");
        }).catch(function (err) {
            console.log(err);
            res.status(500).send("Could not create the Admin.");
        })
    })



router.get('/:id', passport.authenticate('bearer'),ensure.ensureAdmin,function (req, res) {
    models.User.findOne({
        where: {id: req.params.id},
        include: models.Admin
    }).then(function (user) {
        res.status(200).send(user);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send('Unknown Admin');
    })
});

router.put('/:id/edit', passport.authenticate('bearer'),ensure.ensureAdmin,function (req, res) {
    models.Admin.update({
            cbCentre: cbCentre,
            cbDesignation: cbDesignation
        }, {where: {userId: userId}}).then(function (rows) {
            if (rows[0] !== 0) {
                const admin = rows[1][0].get();
                res.status(200).send(admin);
            }
            return res.status(200).send({success: false});
        }).catch(function (err) {
            return res.status(500).send({success: false});
        })
});

router.get('/', passport.authenticate('bearer'),ensure.ensureAdmin,function (req, res) {
    models.Admin.findAll({
        include: models.User
    }).then(function (admins) {
        res.status(200).send(admins);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;

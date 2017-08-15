const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');
const ensure = require('./../../auth/authutils');
const passport = require('./../../auth/passporthandler');

router.post('/add', function (req, res) {

  if (!req.body.userId === true) {
    res.status(400).send("Please login first");
  }
    models.CompanyManager.create({
        companyId: req.body.companyId,
        userId: req.body.userId,
        designation: req.body.designation
    }).then(function (companymanager) {
        if(companymanager)
            return res.status(201).send(companymanager);
        else
            return res.status(500).send("Error");
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send("Error");
    })


});

router.get('/', function (req, res) {
    models.CompanyManager.findAll({
        attributes: ['designation'],
        include: [{model: models.User, attributes: ['id','name', 'image']},
            {model: models.Company, attributes: ['name']  }]
        }).then(function (managers) {
        res.status(200).send(managers);
    }).catch(function (error) {
        console.log(error);
        res.status(500).send("Error");
    })
});


router.get('/:id', function (req, res) {
    models.CompanyManager.findOne({
        where: {userId: req.params.id},
        include: [models.User, { model: models.Company, attributes: ['name']}]
    }).then(function (user) {
        res.status(200).send(user);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send('Unknown Comapny Manager');
    })
});

router.put('/:id/edit', passport.authenticate('bearer'), ensure.ensureAdmin(), function (req, res) {
    let userId = parseInt(req.params.id),
        email = req.body.email,
        contact = req.body.contact,
        pincode = req.body.pincode,
        designation = req.body.designation,
        companyName = req.body.companyName;
    models.Company.findOne({where: {name: companyName}}).then(function (company) {
        models.User.update({
            email: email,
            contact: contact,
            pincode: pincode
        }, {where: {id: userId}}).then(function () {
            models.CompanyManager.update({
                designation: designation,
                companyId: company.id
            }, {where: {userId: userId}}).then(function (rows) {
                // if (rows[0] !== 0) {
                    // const manager = rows[1][0].get();
                    return res.status(200).send("Updated");
                // }
                // return res.status(200).send({success: false});
            }).catch(function (err) {
                return res.status(500).send({success: false});
            })
        }).catch(function (err) {
            return res.status(500).send({success: false});
        });
    });

});

module.exports = router;

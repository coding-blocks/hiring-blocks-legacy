const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

//FIXME : Incorrect
router.post('/add', function (req, res) {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.status(403).send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.User.create({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            pincode: req.body.pincode,
            userlocal: {
                password: hash
            },
            admin: {
                cbCentre: req.body.cbCentre,
                cbDesignation: req.body.cbDesignation
            },
            include: [models.UserLocal, models.Admin]
        }).then(function (user) {
            if (user)
                res.status(201).send("Admin created");
            else
                res.status(500).send("Could not create the Admin.");
        }).catch(function (err) {
            console.log(err);
            res.status(500).send("Could not create the Admin.");
        })
    })
});


router.get('/:id', function (req, res) {
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

router.post('/:id/edit', function (req, res) {
    let userId = parseInt(req.params.id),
        email = req.body.email,
        contact = req.body.contact,
        pincode = req.body.pincode,
        cbCentre = req.body.cbCentre,
        cbDesignation = req.body.cbDesignation;

    models.User.update({
        email: email,
        contact: contact,
        pincode: pincode
    }, {where: {id: userId}}).then(function () {
        model.Admin.update({
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
    }).catch(function (err) {
        return res.status(500).send({success: false});
    });
});

router.get('/', function (req, res) {
    models.Admin.findAll({
        include: models.User
    }).then(function (admins) {
        res.status(200).send(admins);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;

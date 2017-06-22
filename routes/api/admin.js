const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');


router.post('/add', function (req, res) {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
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
            include: [models.userlocal, models.Admin]
        }).then(function (user) {
            if (user)
                res.send("Admin created");
            else
                res.send("Could not create the Admin.");
        }).catch(function (err) {
            console.log(err);
            res.send("Could not create the Admin.");
        })
    })
});


router.get('/:id', function (req, res) {
    models.User.findOne({
        where: {id: req.params.id},
        include: models.Admin
    }).then(function (user) {
        res.send(user);
    }).catch(function (err) {
        console.log(err);
        res.send('Unknown Admin');
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
        pincode: pincode,
        admin: {
            cbCentre: cbCentre,
            cbDesignation: cbDesignation
        }
    }, {
        where: {id: userId},
        include: models.Admin,
        returning: true
    }).then(function (rows) {
        const admin = rows[1][0].get();
        res.send(admin);
    }).catch(function (error) {
        console.error(error)
    });
});

router.get('/', function (req, res) {
    models.Admin.findAll({
        include: models.User
    }).then(function (admins) {
        res.send(admins);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;

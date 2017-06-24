const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');


router.post('/add', function (req, res) {

    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.status(400).send("Insufficient Details");
    }
    models.Company.findOne({where: {name: req.body.companyName}}).then(function (company) {
        if (!company) {
            models.Company.create({
                name: req.body.companyName,
                website: req.body.companyWebsite
            }).then(function (company) {
                password.pass2hash(req.body.password).then(function (hash) {
                    models.User.create({
                        name: req.body.name,
                        email: req.body.email,
                        contact: req.body.contact,
                        pincode: req.body.pincode,
                        userlocal: {
                            password: hash
                        },
                        companymanager: {
                            designation: req.body.designation,
                            companyId: company.id
                        },
                        include: [models.userlocal, models.companymanager]
                    }).then(function (user) {
                        if (user)
                            res.status(201).send("Student created");
                        else
                            res.status(500).send("Could not create the student.");
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).send("Could not create the student.");
                    })
                })
            })
        } else {
            password.pass2hash(req.body.password).then(function (hash) {
                models.User.create({
                    name: req.body.name,
                    email: req.body.email,
                    contact: req.body.contact,
                    pincode: req.body.pincode,
                    userlocal: {
                        password: hash
                    },
                    companymanager: {
                        designation: req.body.designation,
                        companyId: company.id
                    },
                    include: [models.userlocal, models.companymanager]
                }).then(function (user) {
                    if (user)
                        res.status(201).send("Student created");
                    else
                        res.status(500).send("Could not create the student.");
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).send("Could not create the student.");
                })
            })
        }
    }).catch(function (err) {
        console.log(err);
    })

});


router.get('/:id', function (req, res) {
    models.User.findOne({
        where: {id: req.params.id},
        include: models.CompanyManager
    }).then(function (user) {
        res.status(200).send(user);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send('Unknown Comapny Manager');
    })
});

router.post('/:id/edit', function (req, res) {
    let userId = parseInt(req.params.id),
        email = req.body.email,
        contact = req.body.contact,
        pincode = req.body.pincode,
        designation = req.body.designation,
        company = req.body.company;
    models.Company.findOne({where: {name: company}}).then(function (company) {
        models.User.update({
            email: email,
            contact: contact,
            pincode: pincode
        }, {where: {id: userId}}).then(function () {
            models.CompanyManager.update({
                designation: designation,
                companyId: company.id
            }, {where: {userId: userId}}).then(function (rows) {
                if (rows[0] !== 0) {
                    const manager = rows[1][0].get();
                    return res.status(200).send(manager);
                }
                return res.status(200).send({success: 'false'});
            }).catch(function (err) {
                return res.status(500).send({success: 'false'});
            })
        }).catch(function (err) {
            return res.status(500).send({success: 'false'});
        });
    });

});

router.get('/', function (req, res) {
    models.CompanyManager.findAll({
        include: [models.User, models.Company]
    }).then(function (manager) {
        res.status(200).send(manager);
    }).catch(function (error) {
        console.log(error);
        res.status(500).send("Error");
    })
});

module.exports = router;

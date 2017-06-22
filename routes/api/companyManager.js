const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');


router.post('/add', function (req, res) {

    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
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
                            res.send("Student created");
                        else
                            res.send("Could not create the student.");
                    }).catch(function (err) {
                        console.log(err);
                        res.send("Could not create the student.");
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
                        res.send("Student created");
                    else
                        res.send("Could not create the student.");
                }).catch(function (err) {
                    console.log(err);
                    res.send("Could not create the student.");
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
        res.send(user);
    }).catch(function (err) {
        console.log(err);
        res.send('Unknown Comapny Manager');
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
            pincode: pincode,
            companymanager: {
                designation: designation,
                companyId: company.id
            }
        }, {
            where: {id: userId},
            include: models.CompanyManager,
            returning: true
        }).then(function (rows) {
            const manager = rows[1][0].get();
            res.send(manager);
        }).catch(function (error) {
            console.error(error)
        });
    });

});

router.get('/', function (req, res) {
    models.User.findAll({
        where: {role: "Company Manager"},
        include: [{
            model: models.CompanyManager,
            include: models.Company
        }]
    }).then(function (manager) {
        res.send(manager);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;

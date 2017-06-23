const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.post('/add', function (req, res) {
    if (req.body.name === "") {
        res.status(403).send("Insufficient Details");
    }
    models.Company.create({
        name: req.body.name,
        website: req.body.website,
        loactions: req.body.loactions,
        skills: req.body.skills,
        contactEmail: req.body.contactEmail,
        contactNumber: req.body.contactNumber,
    }).then(function (company) {
        res.status(201).send(company.get());
    }).catch(function (err) {
        console.log(err);
        res.status(500).send("Could not create company");
    })

});


router.get('/:id', function (req, res) {
    let companyId = parseInt(req.params.id);
    models.Company.findOne({
        where: {id: companyId}
    }).then(function (company) {
        res.status(200).send(company.get());
    }).catch(function (err) {
        console.log(err);
        res.status(500).send('Unknown Company');
    })
});

router.post('/:id/edit', function (req, res) {
    let companyId = parseInt(req.params.id),
        website = req.body.website,
        locations = req.body.locations,
        skills = req.body.skills,
        companyEmail = req.body.companyEmail,
        companyNumber = req.body.companyNumber;

    models.Company.update({
        website: website,
        locations: locations,
        skills: skills,
        companyEmail: companyEmail,
        companyNumber: companyNumber
    }, {
        where: {id: companyId},
        returning: true
    }).then(function (rows) {
        const company = rows[1][0].get();
        res.status(200).send(company);
    }).catch(function (err) {
        console.log(err);
    });

});

router.get('/:id/jobs', function (req, res) {
    let companyId = parseInt(req.params.id);
    models.Job.findAll({
        where: {companyId: companyId}
    }).then(function (jobs) {
        console.log(jobs);
        res.status(200).send(jobs);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send("Unknown company");
    })
});

router.get('/:id/applications', function (req, res) {
    let companyId = parseInt(req.params.id);
    models.Application.findAll({
        where: {'$job.companyId$': companyId},
        include: [{
            model: models.User,
            include: models.Student
        },
            models.Job]
    }).then(function (applications) {
        res.status(200).send(applications);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send("Unknown company");
    });
});

router.get('/', function (req, res) {
    models.Company.findAll().then(function (companies) {
        res.status(200).send(companies);
    }).catch(function (err) {
        console.log(err);
    })
});

module.exports = router;
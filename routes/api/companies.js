const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.post('/add', function (req, res) {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.Company.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }).then(function (company) {
            res.send(company.get());
        })
    })
});

router.get('/:id', function (req, res) {
    let companyId = parseInt(req.params.id);
    models.Company.findOne({
        where: {id: companyId}
    }).then(function (company) {
        res.send(company.get());
    }).catch(function (err) {
        console.log(err);
        res.send('Unknown Company or unauthorized request');
    })
});

router.post('/:id/edit', function (req, res) {
    let companyId = parseInt(req.params.id);
    email = req.body.email;
    website = req.body.website;
    locations = req.body.locations;
    skills = req.body.skills;
    repName = req.body.repName;
    repNumber = req.body.repNumber;

    models.Company.update({
        email: email,
        website: website,
        locations: locations,
        skills: skills,
        repName: repName,
        repNumber: repNumber
    }, {
        where: {id: companyId},
        returning: true
    }).then(function (rows) {
        const company = rows[1][0].get();
        res.send(company);
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
        res.send(jobs);
    }).catch(function (err) {
        console.log(err);
        res.send("Unknown company or unauthorized access");
    })
});


router.get('/:id/applications', function (req, res) {
    let companyId = parseInt(req.params.id);
    models.Application.findAll({
        where: {'$job.companyId$': companyId},
        include: [models.Student, models.Job]
    }).then(function (applications) {
        res.send(applications);
    }).catch(function (err) {
        console.log(err);
        res.send("Unknown company or unauthorized access");
    });
});

router.get('/', function (req, res) {
    models.Company.findAll().then(function (companies) {
        res.send(companies);
    }).catch(function (err) {
        console.log(err);
    })
});

module.exports = router;
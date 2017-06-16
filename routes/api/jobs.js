const router = require('express').Router();
const models = require('./../../db/models').models;

router.post('/add', function (req, res) {
    const companyId=parseInt(req.body.companyId);
    models.Job.create({
        title: req.body.title,
        description: req.body.description,
        skills: req.body.skills.split(','),
        jobType: req.body.jobType,
        location: req.body.location,
        stipend: req.body.stipend,
        active: req.body.active,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        companyId:companyId
    }).then(function (job) {
        res.send(job);
    }).catch(function (err) {
        console.log(err);
    })
});

router.get('/:id', function (req, res) {
    let jobId = parseInt(req.params.id);
    models.Job.findOne({
        where: {id: jobId}
    }).then(function (job) {
        res.send(job);
    }).catch(function (err) {
        console.log(err);
    })
});

router.post('/:id/apply', function (req, res) {
    let jobId = parseInt(req.params.id);
    models.Application.create({
        app: req.body.application,
        status: "none",
        studentId: req.query.studentId,
        jobId: jobId
    }).then(function (application) {
        res.send(application)
    }).catch(function (err) {
        console.log(err);
        res.send("Error in submitting the application")
    })
});

router.get('/', function (req, res) {
    models.Job.findAll({
        //where: {jobType: req.query.status}
    }).then(function (jobs) {
        res.send(jobs);
    }).catch(function (err) {
        console.log(err);
    })
});

module.exports = router;
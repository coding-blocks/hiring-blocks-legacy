const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');
const ensure = require('./../../auth/authutils');
const passport = require('./../../auth/passporthandler');

router.post('/add', passport.authenticate('bearer'),function (req, res) {
    const companyId=parseInt(req.body.companyId);

  if (req.user) {
    models.Admin.findOne({
      where: {userId: req.user.id}
    }).then(function (admin) {
      if (admin) {
        models.Job.create({
          title: req.body.title,
          description: req.body.description,
          skills: req.body.skills,
          jobType: req.body.jobType,
          location: req.body.location,
          stipend: req.body.stipend,
          active: req.body.active,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          companyId:companyId
        }).then(function (job) {
          res.status(201).send(job);
        }).catch(function (err) {
          console.log(err);
          res.status(500).send("Could not add the job")
        })

      }
      else {
        models.CompanyManager.findOne({
          where: {userId: req.user.id, companyId: companyId}
        }).then(function (manager) {
          if (manager) {
            models.Job.create({
              title: req.body.title,
              description: req.body.description,
              skills: req.body.skills,
              jobType: req.body.jobType,
              location: req.body.location,
              stipend: req.body.stipend,
              active: req.body.active,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
              companyId:companyId
            }).then(function (job) {
              res.status(201).send(job);
            }).catch(function (err) {
              console.log(err);
              res.status(500).send("Could not add the job")
            })

          }
          else
            res.status(401).send("Only Admins and Company Managers Allowed");
        }).catch(function (err) {
          console.log(err);
          res.status(500).send("Error");
        })
      }
    }).catch(function (err) {
      console.log(err);
      res.status(500).send("Error");
    })
  } else {
    res.status(401).send("Please login first");
  }

});

router.get('/:id', function (req, res) {
    let jobId = parseInt(req.params.id);
    models.Job.findOne({
        where: {id: jobId}
    }).then(function (job) {
        res.status(200).send(job);
    }).catch(function (err) {
        console.log(err);
    })
});

router.post('/:id/apply', passport.authenticate('bearer'),ensure.ensureStudent,function (req, res) {
    let jobId = parseInt(req.params.id);

            models.Application.create({
                application: req.body.application,
                status: "none",
                userId: req.user.id,
                jobId: jobId
            }).then(function (application) {
                res.status(201).send(application)
            }).catch(function (err) {
                console.log(err);
                res.status(500).send("Error in submitting the application")
            })
});

router.get('/', function (req, res) {
    models.Job.findAll({
        where: {jobType: req.query.status}
    }).then(function (jobs) {
        res.status(200).send(jobs);
    }).catch(function (err) {
        console.log(err);
    })
});

module.exports = router;
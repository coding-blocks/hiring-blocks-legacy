const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');
const ensure = require('./../../auth/authutils');
const passport = require('./../../auth/passporthandler');

router.post('/add', passport.authenticate('bearer'), ensure.ensureAdmin(), function (req, res) {
  if (req.body.name === "") {
    res.status(403).send("Insufficient Details");
  }
  models.Company.create({
    name: req.body.name,
    website: req.body.website,
    locations: req.body.loactions,
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

router.get('/', function (req, res) {
  models.Company.findAll({
    attributes: ['id', 'name', 'locations', 'logo']
  }).then(function (companies) {
    res.status(200).send(companies);
  }).catch(function (err) {
    console.log(err);
    res.status(500).send("Could not get companies");
  })
});

router.get('/:id', function (req, res) {
  let companyId = parseInt(req.params.id);
  models.Company.findOne({
    where: {id: companyId}
  }).then(function (company) {
    if(company)
      res.status(200).send(company.get());
    else
      res.status(404).send("Could not find any company with the given id")
  }).catch(function (err) {
    console.log(err);
    res.status(500).send('Unknown Company');
  })
});

router.put('/:id', passport.authenticate('bearer'), function (req, res) {

  let companyId = parseInt(req.params.id),
    logo = req.body.logo,
    website = req.body.website,
    locations = req.body.locations,
    skills = req.body.skills,
    companyEmail = req.body.companyEmail,
    companyNumber = req.body.companyNumber;

  if (req.user) {
    models.Admin.findOne({
      where: {userId: req.user.id}
    }).then(function (admin) {
      if (admin) {
        models.Company.update({
          website: website,
          logo: logo,
          locations: locations,
          skills: skills,
          companyEmail: companyEmail,
          companyNumber: companyNumber
        }, {
          where: {id: companyId},
          // returning: true
        }).then(function (rows) {
          // const company = rows[1][0].get();
          res.status(200).send("Updated");
        }).catch(function (err) {
          console.log(err);
          res.status(500).send("Error");
        });

      }
      else {
        models.CompanyManager.findOne({
          where: {userId: req.user.id, companyId: companyId}
        }).then(function (manager) {
          if (manager)
            models.Company.update({
              website: website,
              logo: logo,
              locations: locations,
              skills: skills,
              companyEmail: companyEmail,
              companyNumber: companyNumber
            }, {
              where: {id: companyId},
              // returning: true
            }).then(function (rows) {
              // const company = rows[1][0].get();
              res.status(200).send("Updated");
            }).catch(function (err) {
              console.log(err);
              res.status(500).send("Error");
            });
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

router.get('/:id/jobs', function (req, res) {
  let companyId = parseInt(req.params.id);
  models.Job.findAll({
    where: {companyId: companyId},
    attributes: ['title', 'location', 'salary']
  }).then(function (jobs) {
    if(jobs)
      res.status(200).send(jobs);
    else
      res.status(404).send("there are presently no jobs by this company")
  }).catch(function (err) {
    console.log(err);
    res.status(500).send("Unknown company");
  })
});

router.get('/:id/jobs/:jobId', function (req, res) {
  let companyId = parseInt(req.params.id),
    jobId = parseInt(req.params.jobId);
  models.Job.findAll({
    where: {
      companyId: companyId,
      id: jobId
    }
  }).then(function (job) {
    if(job)
    res.status(200).send(job);
    else
      res.status(404).send("there is no job withh the given id")
  }).catch(function (err) {
    console.log(err);
    res.status(500).send("Unknown Job");
  })
});

router.get('/:id/applications', passport.authenticate('bearer'), function (req, res) {
  let companyId = parseInt(req.params.id);

  if (req.user) {
    models.Admin.findOne({
      where: {userId: req.user.id}
    }).then(function (admin) {
      if (admin) {
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

      }
      else {
        models.CompanyManager.findOne({
          where: {userId: req.user.id, companyId: companyId}
        }).then(function (manager) {
          if (manager) {
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

module.exports = router;



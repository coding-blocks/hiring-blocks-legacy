const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');
const passport = require('../../auth/passporthandler');


router.get('/', function (req, res) {
    models.User.findAll().then(function (users) {
        if (users)
            return res.send(users);
        else
            return res.send("No users");
    }).catch(function (err) {
        console.log(err);
        return res.send("Could not get the users");
    })
});

router.get('/me',function (req, res) {
    console.log(req.user);
    models.User.findOne({
        where: {id: req.user.id}
    }).then(function (user) {
        if (user)
            return res.send(user);
        else
            return res.send("Could not send the details");
    }).catch(function (err) {
        console.log(err);
        return res.send("Could not get the user");
    })
});

router.get('/:id', function (req, res) {
    models.User.findOne({
        where: {id: req.params.id}
    }).then(function (user) {
        if (user)
            return res.send(user);
        else
            return res.send("No user with this id exists");
    }).catch(function (err) {
        console.log(err);
        return res.send("Could not get the user");
    })
});

router.get('/me/student',function (req, res) {
    models.User.findOne({
        where: {id: req.user.id},
        include: models.Student
    }).then(function (student) {
        if (student) {
            return res.send(student);
        }
        else
            return res.send("not student");
    }).catch(function (err) {
        console.log(err);
        return res.send('Could not get the student details');
    })
});

router.get('/me/companymanager', function (req, res) {
    models.User.findOne({
        where: {id: req.user.id},
        include: models.CompanyManager
    }).then(function (companymanager) {
        if (companymanager) {
            return res.send(companymanager);
        }
        else
            return res.send("not companymanager");
    }).catch(function (err) {
        console.log(err);
        return res.send('Could not get the companymanager details');
    })
});

router.get('/me/admin', function (req, res) {
    models.User.findOne({
        where: {id: req.user.id},
        include: models.Admin
    }).then(function (admin) {
        if (admin) {
            return res.send(admin);
        }
        else
            return res.send("not admin");
    }).catch(function (err) {
        console.log(err);
        return res.send('Could not get the admin details');
    })
});

router.post('/me/student/create', function (req, res) {
    let userId = parseInt(req.user.id),
        education = req.body.education,
        skills = req.body.skills,
        languages = req.body.languages,
        projects = req.body.projects,
        trainings = req.body.trainings,
        cbStudent = req.body.cbStudent,
        cbCourses = req.body.cbCourses;
    models.Student.create({
        education: education,
        skills: skills,
        languages: languages,
        projects: projects,
        trainings: trainings,
        cbStudent: cbStudent,
        cbCourses: cbCourses,
        userId: userId
    }).then(function (student) {
        if (student)
            return res.send("Student created");
        else
            return res.send("could not create the student");

    }).catch(function (err) {
        console.log(err);
        return res.send("could not create the student");
    });
});

router.post('/me/companymanager/create', function (req, res) {
    let userId = parseInt(req.user.id),
        designation = req.body.designation,
        company = req.body.company;
    models.Company.findOne({where: {name: comapny}}).then(function (company) {
        if (company) {
            models.CompanyManager.create({
                designaton: designation,
                companyId: company.id,
                userId: userId
            }).then(function (companymanager) {
                if (companymanager)
                    return res.send("Companymanager created");
                else
                    return res.send("could not create the companymanager");

            }).catch(function (err) {
                console.log(err);
                return res.send("could not create the companymanager");
            });
        } else {
            models.Company.create({
                name: company
            }).then(function (company) {
                if (company) {
                    models.CompanyManager.create({
                        designaton: designation,
                        companyId: company.id,
                        userId: userId
                    }).then(function (companymanager) {
                        if (companymanager)
                            return res.send("Companymanager created");
                        else
                            return res.send("could not create the companymanager");
                    }).catch(function (err) {
                        console.log(err);
                        return res.send("could not create the companymanager");
                    });
                } else
                    return res.send("could not create the companymanager");
            })
        }
    }).catch(function (err) {
        console.log(err);
        return res.send("could not create the company manager");
    });

});

module.exports = router;
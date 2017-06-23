const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');


router.post('/add', function (req, res) {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.status(400).send("Insufficient Details");
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
                student: {
                    // cbStudent:false
                }
            },
            {
                include: [models.UserLocal, models.Student]
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
});


router.get('/:id', function (req, res) {
    models.User.findOne({
        where: {id: req.params.id},
        include: models.Student
    }).then(function (user) {
        res.status(200).send(user);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send('Unknown Student');
    })
});

router.post('/:id/edit', function (req, res) {
    let userId = parseInt(req.params.id),
        email = req.body.email,
        contact = req.body.contact,
        pincode = req.body.pincode,
        education = req.body.education,
        skills = req.body.skills,
        languages = req.body.languages,
        projects = req.body.projects,
        trainings = req.body.trainings,
        cbStudent = req.body.cbStudent,
        cbCourses = req.body.cbCourses;
    console.log(req.body.education);
    models.User.update({
        email: email,
        contact: contact,
        pincode: pincode,
    }, {where: {id: userId}}).then(function () {
        console.log(education);
        models.Student.update({
            education: education,
            skills: skills,
            languages: languages,
            projects: projects,
            trainings: trainings,
            cbStudent: cbStudent,
            cbCourses: cbCourses
        }, {where: {userId: userId}}).then(function (rows) {
            // if (rows[0] !== 0) {
                //const student = rows[1][0].get();
               // return res.send(student);
            // }
            console.log(3);
            return res.status(200).send({success: 'true'});
        }).catch(function (err) {
            console.log(err);
            return res.status(500).send({success: 'false'});
        })
    }).catch(function (err) {
        return res.status(500).send({success: 'false'});
    });

});

router.get('/:id/applications', function (req, res) {
    let userId = parseInt(req.params.id);
    models.Application.findAll({
        where: {userId: userId},
        include: models.Job
    }).then(function (applications) {
        res.status(200).send(applications);
    }).catch(function (error) {
        console.log(error);
    })
});

router.get('/', function (req, res) {
    models.Student.findAll({
        include: models.User
    }).then(function (students) {
        res.status(200).send(students);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;
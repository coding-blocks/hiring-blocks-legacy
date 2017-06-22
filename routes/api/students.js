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
                student: {
                    // cbStudent:false
                }
            },
            {include: [models.UserLocal, models.Student]
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
});


router.get('/:id', function (req, res) {
    models.User.findOne({
        where: {id: req.params.id},
        include: models.Student
    }).then(function (user) {
        res.send(user);
    }).catch(function (err) {
        console.log(err);
        res.send('Unknown Student');
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
    console.log(education);
    models.User.update({
        email: email,
        contact: contact,
        pincode: pincode,
        student: {
            education: education,
            skills: skills,
            languages: languages,
            projects: projects,
            trainings: trainings,
            cbStudent: cbStudent,
            cbCourses: cbCourses
        }
    }, {
        where: {id: userId},
        include: models.Student,
        returning: true
    }).then(function (rows) {
        console.log(rows);
        if (rows[0] !== 0) {
            const student = rows[1][0].get();
            return res.send(student);
        }
        return res.send({success: 'false'});
    }).catch(function (error) {
        console.error(error)
    });
});

router.get('/:id/applications', function (req, res) {
    let userId = parseInt(req.params.id);
    models.Application.findAll({
        where: {userId: userId},
        include: models.Job
    }).then(function (applications) {
        res.send(applications);
    }).catch(function (error) {
        console.log(error);
    })
});

router.get('/', function (req, res) {
    models.Student.findAll({
        include: models.User
    }).then(function (students) {
        res.send(students);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;
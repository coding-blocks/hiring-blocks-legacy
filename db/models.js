const Sequelize = require('sequelize');

const db = new Sequelize('hb', 'cbuser', 'cbpass', {
    host: 'localhost',
    dialect: 'postgres'
});


const Student = db.define('student', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    contact: Sequelize.BIGINT,
    pincode: Sequelize.INTEGER,
    education: Sequelize.JSON,
    skills: Sequelize.ARRAY(Sequelize.STRING),
    languages: Sequelize.ARRAY(Sequelize.STRING),
    projects: Sequelize.JSON,
    trainings: Sequelize.JSON,
    cbStudent: {type: Sequelize.BOOLEAN, defaultValue: false},
    cbCourses: Sequelize.ARRAY(Sequelize.STRING)
});

const Company = db.define('company', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    website: Sequelize.STRING,
    locations: Sequelize.ARRAY(Sequelize.STRING),
    skills: Sequelize.ARRAY(Sequelize.STRING),
    repName: Sequelize.STRING,
    repNumber: Sequelize.BIGINT,
});

const Job = db.define("job", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    title: Sequelize.STRING,
    description: Sequelize.STRING(1234),
    skills: Sequelize.ARRAY(Sequelize.STRING),
    jobType: Sequelize.STRING,
    location: Sequelize.STRING,
    stipend: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    startDate: Sequelize.STRING,
    endDate: Sequelize.STRING
});

const Application = db.define('application', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    status: Sequelize.STRING,
    date: Sequelize.INTEGER,
    app: Sequelize.STRING
});

Job.belongsTo(Company);
Company.hasMany(Job);

Application.belongsTo(Student);
Student.hasMany(Application);

Application.belongsTo(Job);
Job.hasMany(Application);

db.sync({}).then(() => {
    console.log('Database configured')
});

module.exports = {
    models: {Student, Company, Application, Job}
};
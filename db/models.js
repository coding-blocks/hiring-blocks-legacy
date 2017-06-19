const Sequelize = require('sequelize');

const db = new Sequelize('hb', 'cbuser', 'cbpass', {
    host: 'localhost',
    dialect: 'postgres'
});


const Student = db.define('student', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    contact: Sequelize.BIGINT,
    pincode: Sequelize.INTEGER,
    education: Sequelize.JSON,
    skills: Sequelize.ARRAY(Sequelize.STRING),
    languages: Sequelize.ARRAY(Sequelize.STRING),
    projects: Sequelize.JSON,
    trainings: Sequelize.JSON,
    cbStudent: {type: Sequelize.BOOLEAN, defaultValue: false},
    cbCourses: Sequelize.ARRAY(Sequelize.STRING),
    role: {type: Sequelize.STRING, defaultValue: 'Student'}
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
    role: {type: Sequelize.STRING, defaultValue: 'Company'}
});

const UserLocal = db.define('userlocal', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING
});

const Admin = db.define('admin', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    role: {type: Sequelize.STRING, defaultValue: 'Admin'}
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

const Auth = db.define('authorization', {
    token: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    role: Sequelize.STRING
});

UserLocal.belongsTo(Student);
Student.hasOne(UserLocal);

UserLocal.belongsTo(Company);
Company.hasOne(UserLocal);

UserLocal.belongsTo(Admin);
Admin.hasOne(UserLocal);

Auth.belongsTo(Student);
Student.hasMany(Auth);

Auth.belongsTo(Company);
Company.hasMany(Auth);

Auth.belongsTo(Admin);
Admin.hasMany(Auth);

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
    models: {
        Student, Company, UserLocal, Admin, Auth, Application, Job,
    }
};
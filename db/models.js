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

const StudentLocal = db.define('studentlocal', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: Sequelize.STRING,
    password: Sequelize.STRING
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

const CompanyLocal = db.define('companylocal', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: Sequelize.STRING,
    password: Sequelize.STRING
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

const AuthStudent = db.define('authstudent', {
    token: {
        type: Sequelize.STRING,
        primaryKey: true
    }
});

const AuthCompany = db.define('authcompany', {
    token: {
        type: Sequelize.STRING,
        primaryKey: true
    }
});

const AuthAdmin = db.define('authadmin', {
    token: {
        type: Sequelize.STRING,
        primaryKey: true
    }
});


StudentLocal.belongsTo(Student);
Student.hasOne(StudentLocal);

CompanyLocal.belongsTo(Company);
Company.hasOne(CompanyLocal);

AuthStudent.belongsTo(Student);
Student.hasMany(AuthStudent);

AuthCompany.belongsTo(Company);
Company.hasMany(AuthCompany);

AuthAdmin.belongsTo(Admin);
Admin.hasMany(AuthAdmin);

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
        Student, StudentLocal, Company, CompanyLocal, Admin, AuthStudent, AuthCompany, AuthAdmin, Application, Job,
    }
};
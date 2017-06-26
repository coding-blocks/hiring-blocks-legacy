const Sequelize = require('sequelize');

var secret;
try {
  secret = require('../secrets.json')
} catch (e) {
  console.error('Create your own secrets file lazybones');
  secret = require('../secret-sample.json')
}

const DATABASE_URL = process.env.DATABASE_URL || ('postgres://' + secret.DB_USER + ":" + secret.DB_PASSWORD + "@" + secret.DB_HOST + ":5432/" + secret.DATABASE);


const db = new Sequelize(DATABASE_URL, {
    dialect: 'postgres'
});


const Student = db.define('student', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    education: Sequelize.ARRAY(Sequelize.JSON),
    skills: Sequelize.ARRAY(Sequelize.JSON),
    compLanguages: Sequelize.ARRAY(Sequelize.JSON),
    projects: Sequelize.ARRAY(Sequelize.JSON),
    trainings: Sequelize.ARRAY(Sequelize.JSON),
    cbStudent: {type: Sequelize.BOOLEAN, defaultValue: false},
    cbCourses: Sequelize.ARRAY(Sequelize.STRING),
});

const CompanyManager = db.define('companymanager', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    designation: Sequelize.STRING,
});


const Admin = db.define('admin', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    cbCentre: Sequelize.STRING,
    cbDesignation: Sequelize.STRING
});

const User = db.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    contact: Sequelize.STRING,
    email: Sequelize.STRING,
    pincode: Sequelize.STRING,
    image: Sequelize.STRING
});


const UserLocal = db.define('userlocal', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    password: Sequelize.STRING,
});

const AuthToken = db.define('authtoken', {
    token: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    role: Sequelize.STRING
});

UserLocal.belongsTo(User);
User.hasOne(UserLocal);
AuthToken.belongsTo(User);
User.hasMany(AuthToken);

Student.belongsTo(User);
User.hasOne(Student);
CompanyManager.belongsTo(User);
User.hasOne(CompanyManager);
Admin.belongsTo(User);
User.hasOne(Admin);


const Company = db.define('company', {
    name: Sequelize.STRING,
    logo: Sequelize.STRING,
    website: Sequelize.STRING,
    locations: Sequelize.ARRAY(Sequelize.STRING),
    skills: Sequelize.ARRAY(Sequelize.STRING),
    contactEmail: Sequelize.STRING,
    contactNumber: Sequelize.STRING,
});


const Job = db.define("job", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    title: Sequelize.STRING,
    description: Sequelize.STRING(1234),
    skills: Sequelize.ARRAY(Sequelize.STRING),
    jobType: Sequelize.STRING,
    location: Sequelize.STRING,
    salary: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    startDate: Sequelize.STRING,
    endDate: Sequelize.STRING
});

const Application = db.define('application', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    status: Sequelize.STRING,
    date: Sequelize.INTEGER,
    application: Sequelize.STRING
});

CompanyManager.belongsTo(Company);
Company.hasMany(CompanyManager);


Job.belongsTo(Company);
Company.hasMany(Job);

Application.belongsTo(User);
User.hasMany(Application);

Application.belongsTo(Job);
Job.hasMany(Application);


db.sync({force: false}).then(() => {
    console.log('Database configured')
});

module.exports = {
    models: {
        Student, CompanyManager, Admin, User, UserLocal, AuthToken,
        Company, Job, Application
    }
};

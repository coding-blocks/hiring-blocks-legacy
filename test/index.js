const mocha = require('mocha')
//process.env.DATABASE_URL = "test db here"

const app = require('../server')
  , db = require('./../db/models').db
  , config = require('./../config');

function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

before(function (done) {
  config.DEV_MODE = true;
  db.sync({force: true}).then(() => {
    console.log("DB configured for tests")
    app.listen(8000, () => done())
  })
})

describe("/api", function () {
  before(function () {
    console.info("Running API test");
  });
  importTest("/", './api/index.js');
  // importTest("/companymanagers", './api/companymanagers.js')
  // importTest("/users", './api/users.js')
  // importTest("/students", './api/students.js')
  // importTest("/admins", "./api/admins.js");
  // importTest("/companies", "./api/companies.js");
  importTest("/jobs", "./api/jobs.js");
  after(function () {
    console.info("All API tests have run");
  });
});

describe("Database", function () {
  beforeEach(function () {
    console.log("Running API test");
  });
  //importTest("/", './api/index.js');
  after(function () {
    console.log("All API tests have run");
  });
});



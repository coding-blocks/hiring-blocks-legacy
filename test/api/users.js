
const mocha = require("mocha")
  , chai = require("chai")
  , chaiHttp = require("chai-http")
  , expect = chai.expect
  , should = chai.should();

chai.use(chaiHttp);
const api = chai.request("http://localhost:8000/api");
var testUserId = 2, testLeadId = 2;


it("POST /users/add should add a user", function (done) {
  api.post("/users/add").send({
    name: "User1",
  }).end(function (e,r) {
    r.statusCode.should.equal(201);
    r.text.should.equal("user created");
    done();
  })
});

it("POST /users/me/student/create should add a student", function (done) {
  api.post("/users/me/student/create").send({
    cbStudent: true,
  }).end(function (e,r) {
    r.statusCode.should.equal(201);
    r.text.should.equal("Student created");
    done();
  })
});

it("POST /users/me/companymanager/create should add a company", function (done) {
  api.post("/users/me/companymanager/create").send({
    designation: "Instructor",
    companyName: "Coding Blocks"
  }).end(function (e,r) {
    r.statusCode.should.equal(201);
    r.text.should.equal("Companymanager created");
    done();
  })
});


it(`GET /users/ should fetch all users`, (done) => {
  api.get("/users").end((e, r) => {
    r.statusCode.should.equal(200);
    r.body[0].name.should.equal("User1");
    done();
  });
});

it(`GET /users/1 should fetch user with id 1`, (done) => {
  api.get("/users/1").end((e, r) => {
    r.statusCode.should.equal(200);
    r.body.name.should.equal("Users1");
    done();
  });
});

it(`GET /users/me/student should fetch student details of user with id 1`, (done) => {
  api.get("/users/me/student").end((e, r) => {
    r.statusCode.should.equal(200);
    r.body.cbStudent.should.equal(true);
    done();
  });
});

it(`GET /users/me/companymanager should fetch companymanager details of user with id 1`, (done) => {
  api.get("/users/me/companymanager").end((e, r) => {
    r.statusCode.should.equal(200);
    r.body.designation.should.equal("Instructor");
    done();
  });
});


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

it("POST /users/me/student/create should add a company", function (done) {
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

it("POST /companies/add should add a company", function (done) {
  api.post("/companies/add").send({
    name: "Coding Blocks",
    website: "www.codingblocks.com"
  }).end(function (e,r) {
    r.statusCode.should.equal(201);
    r.body.name.should.equal("Coding Blocks");
    r.body.website.should.equal("www.codingblocks.com");
    done();
  })
});

it("POST /jobs/add should add a Job", (done) => {
  api.post("/jobs/add").send({
    title: "Job1",
    description: "this is the description of job1",
    companyId: 1
  }).end((e, r) => {
        r.statusCode.should.equal(201);
        r.body.title.should.equal("Job1");
        done();
      });
    });


// it("POST /add should fetch error", (done) => {
//   api.post("/comments/add").send({}).end((e, r) => {
//     r.statusCode.should.equal(400);
//     r.body.success.should.equal(false);
//     r.body.error.message.should.equal("Could not add the Comment(Incorrect Details).");
//     done();
//   });
// });


it(`GET /jobs/1 should fetch job1`, (done) => {
  api.get("/jobs/1").end((e, r) => {
    r.statusCode.should.equal(200);
    r.body.title.should.equal("Job1");
    done();
  });
});

it(`GET /jobs/ should fetch all jobs`, (done) => {
  api.get("/jobs/").end((e, r) => {
    r.statusCode.should.equal(200);
    r.body[0].title.should.equal("Job1");
    done();
  });
});

it('POST /jobs/1/apply should submit an application', (done) =>{
  api.post("/jobs/1/apply").send({
    application: "this is the application for job1"
  }).end((e, r) => {
    r.statusCode.should.equal(201);
    r.body.status.should.equal("none");
    done();
  });
})

it(`GET /jobs/1/applications should fetch all applications of job1`, (done) => {
  api.get("/jobs/1/applications").end((e, r) => {
    r.statusCode.should.equal(200);
    r.body[0].status.should.equal("none");
    done();
  });
});



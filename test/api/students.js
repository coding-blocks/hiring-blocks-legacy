const mocha = require('mocha')
  , chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = chai.expect
  , should = chai.should();

chai.use(chaiHttp)
const api = chai.request("http://localhost:8000/api/students")

it("Add student", (done) => {

  api.post('/add').send({
  }).end((err, res) => {
    res.statusCode.should.equal(201);
    res.text.should.equal('Student created');
    done();
  });
});

it("Get all students", (done) => {

  api.get('/').end((err, res) => {
    res.statusCode.should.equal(200);
    res.body[0].id.should.equal(1);
    res.body[0].user.id.should.equal(1);
    done();
  });
});

it("Get student", (done) => {

  api.get('/1').end((err, res) => {
    res.statusCode.should.equal(200);
    res.body.id.should.equal(1);
    res.body.student.id.should.equal(1);
    done();
  });
});

it("Update student", (done) => {

  api.put('/1').send({
    cbStudent: true
  }).end((err, res) => {
    res.statusCode.should.equal(200);
    res.body.success.should.equal(true);
    done();
  });
});
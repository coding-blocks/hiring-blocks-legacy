const mocha = require('mocha')
  , chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = chai.expect
  , should = chai.should();
var appjson = require('../../app.json');

chai.use(chaiHttp)
const api = chai.request("http://localhost:8000/api")

it("Status code is 404", (done) => {

  api.get('/').end((err, res) => {
    res.statusCode.should.equal(appjson.error404.code)
    res.text.should.contain('Cannot GET /api/')
    done()
  })
})
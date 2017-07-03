const route = require('express').Router();
const models = require('./../db/models').models;
const password = require('../utils/password');


route.get('/', (req, res) => {
  console.log(1);
  models.AuthToken.destroy({
    where: {
      token: req.headers["authorization"].split('Bearer ')[1],
    },
  }).then(function (match) {
    if (match) {
      res.status(200).send({success: true, message: "Token Deleted"});

    } else {
      res.status(404).send({success: false, message: 'Token not found'})
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({success: false})
  })
});

module.exports = route;

const route = require('express').Router();
const models = require('./../db/models').models;
const uid = require('uid2');
const password = require('../utils/password');
const axios = require('axios');
const secrets = require('./../secrets.json');
const errorFunction = require('../utils/error').errorFunction;

route.post('/', (req, res) => {
  axios.post('https://account.codingblocks.com/oauth/token', {
    "client_id": secrets.CLIENT_ID,
    "redirect_uri": secrets.REDIRECT_URI,
    "client_secret": secrets.CLIENT_SECRET,
    "grant_type": secrets.GRANT_TYPE,
    "code": req.body.code
  }).then(function (authtoken) {
    models.OneAuth.findOne({
      where: {
        oneauthToken: authtoken.data.access_token
      },
      include: [models.User]
    }).then(function (oneauth) {
      if (oneauth !== null) {
        res.status(200).send({
          success: true,
          token: oneauth.token,
          user: oneauth.user.name
        })
      }
      else {
        axios.get('https://account.codingblocks.com/api/users/me', {
          headers: {'Authorization': `Bearer ${authtoken.data.access_token}`}
        }).then(function (user) {
          models.Oneauth.create({
            user: {
              name: user.data.firstname + " " + user.data.lastname,
              email: user.data.email
            }
            , oneauthToken: authtoken.data.access_token
            , token: uid(30)
          }, {
            include: [models.User]
          }).then(function (oneauthFinal) {
            res.status(201).send({
              success: true,
              token: oneauthFinal.token,
              user: user.data.firstname + " " + user.data.lastname
            })
          }).catch(errorFunction(req, res, 500, "Could not create in Oneauth Table(Internal Server Error)."))
        }).catch(errorFunction(req, res, 500, "Could not get details from Oneauth API(Internal Server Error)."))
      }
    }).catch(errorFunction(req, res, 500, "Could not find in Oneauth(Internal Server Error)."))
  }).catch(errorFunction(req, res, 500, "Could not post data to Oneauth API(Internal Server Error)."))
})

module.exports = route;

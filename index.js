const app = require('./server');
const db = require('./db/models').db;

db.sync({force: false}).then(() => {
  console.log('Database configured')

  app.listen(8000, function (req, res, next) {
    console.log('Server Listening at 8000');
  });
});

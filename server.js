const express = require('express')
    , bodyParser = require('body-parser');

const app = express();
const apirouter = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apirouter);

app.listen(4000, function () {
    console.log("Listening on 4000");
});

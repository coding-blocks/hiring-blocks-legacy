const express = require('express')
    , bodyParser = require('body-parser');

const app = express();
const apirouter = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apirouter);

app.use('/',express.static(__dirname+'/public_html'));

app.listen(4000, function () {
    console.log("Listening on 4000");
});

const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('./passport/passporthandler')
    , path = require('path')
    , cookieParser = require('cookie-parser')
    , secrets = require('./secrets.json');

const app = express();
const apirouter = require('./routes/api')
    , loginrouter = require('./routers/login')
    , logoutrouter = require('./routers/logout')
    , signuprouter = require('./routers/signup')
    , authorizerouter = require('./routers/authorize');

const ensure = require('./passport/passportutils');


app.use(cookieParser(secrets.EXPRESS_SESSIONS_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: secrets.EXPRESS_SESSIONS_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/signup', signuprouter);
app.use('/login', loginrouter);
app.use('/logout', logoutrouter);
app.use('/authorize', authorizerouter);



app.use('/api', apirouter);

app.use('/', express.static(__dirname + '/public_html'));

app.listen(4000, function () {
    console.log("Listening on 4000");
});

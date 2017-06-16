const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('./auth/passporthandler')
    , cookieParser = require('cookie-parser')
    , secrets = require('./secrets.json');

const app = express();
const apirouter = require('./routes/api')
    , loginrouter = require('./routes/login')
    , logoutrouter = require('./routes/logout')
    , signuprouter = require('./routes/signup')
    , authorizerouter = require('./routes/authorize')
    , profilerouter = require('./routes/profile');

const ensure = require('./auth/authutils');

app.set("view engine", 'hbs');

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
app.use('/profile', profilerouter);
app.use('/logout', logoutrouter);
// app.use('/authorize', authorizerouter);


app.use('/api', apirouter);

app.use('/', express.static(__dirname + '/public_html'));

app.listen(4000, function () {
    console.log("Listening on 4000");
});

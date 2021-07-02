const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const cors = require("cors");
require('./app/passport/passport');
require('dotenv').config()

const app = express();
const db = require("./app/models");

var multer = require('multer')
var fs = require('fs')

app.use(cookieSession({
    name: process.env.SESSION_PREFIX + 'session',
    keys: ['key1', 'key2']
}))

const corsOptions = {
    origin: /localhost:8080$/, // น้ำตาจะไหล ลืมใส่ regex
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors( corsOptions )); // remove corsOptions to allow all origins

app.use(multer({dest:'./uploads/'}).array('media'));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/feed.routes")(app);

app.listen(port, () => console.log("server running on port " + port))

// connect to database
db.mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});
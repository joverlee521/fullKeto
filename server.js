// Outer dependencies.
var express = require("express");
var passport = require("passport");
var auth = require("./config/auth");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");

// Sets up the express app.
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up data handling for express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// Static directory
app.use(express.static("public"));

// Routes
require("dotenv").config();

auth(passport);
app.use(passport.initialize());

app.use(cookieSession({
    name: "session", 
    keys: [process.env.SESSION_KEY]
}));
app.use(cookieParser());

require("./routes/apiRoutes")(app);
require("./routes/authRoutes")(app);



// Requires our models for syncing.
var db = require("./models");

// Syncing our models and starting app.
db.sequelize.sync({force: true}).then(function(){
    app.listen(PORT, function(){
        console.log("Listening on PORT: " + PORT);
    });
});
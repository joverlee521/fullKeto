// Outer dependencies.
require("dotenv").config();
var express = require("express");
var passport = require("passport");
var auth = require("./config/auth");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var exphbs = require("express-handlebars");

// Requires our models for syncing.
var db = require("./models");

// Sets up the express app.
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up data handling for express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Static directory
app.use(express.static("public"));

// Passport
auth(passport);
app.use(passport.initialize());

// Cookie Session
app.use(cookieSession({
    name: "session", 
    keys: [process.env.SESSION_KEY]
}));
app.use(cookieParser());

// Routes
require("./routes/apiRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/htmlRoutes")(app);

// Syncing our models and starting app.
db.sequelize.sync({force: true}).then(function(){
    app.listen(PORT, function(){
        console.log("Listening on PORT: " + PORT);
    });
});
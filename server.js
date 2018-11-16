// Outer dependencies.
var express = require("express");

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
require("./routes/apiRoutes")(app);

// Requires our models for syncing.
var db = require("./models");

// Syncing our models and starting app.
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("Listening on PORT: " + PORT);
    });
});
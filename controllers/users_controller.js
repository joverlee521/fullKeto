var express = require("express");
var db = require("../models");
var router = express.Router();

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

router.post("/api/google-auth", function(req,res){
    var token = req.body.id
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        res.send(userid);
      }
      verify().catch(console.error);
});

router.post("/api/user", function(req, res){
    var name = req.body.username;
    var token = req.body.token;
    db.User.findOrCreate({
        where: {
            username: name,
        },
        defaults: {
            token: token
        }
    }).spread(function(dbUser, created){
        if(created){
            console.log("New user created!")
        }
        else{
            console.log("Existing user");
        }
        console.log(dbUser);
        res.json(dbUser);
    });
})

module.exports = router;
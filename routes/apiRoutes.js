var request = require("request");
var appId = process.env.EDAMAM_ID;
var appKey = process.env.EDAMAM_KEY;

module.exports = function(app){
    app.get("/api/edamam/random", function(req, res){
        var randomNumber = Math.floor(Math.random()*100);
        var queryURL = "https://api.edamam.com/search?app_id=" + appId + "&app_key=" + appKey + "&diet=low-carb&q=keto&from=" + randomNumber + "&to=" + (randomNumber + 27);
        request(queryURL, function(error, response, body){
            if(error){
                throw error;
            }else if(!error && response.statusCode === 200){
                console.log("OKAY");
                res.json(JSON.parse(body));
            }
        });
    });

    app.get("/api/edamam/:input", function(req, res){
        var userInput = req.params.input
        var queryURL = "https://api.edamam.com/search?app_id=" + appId + "&app_key=" + appKey + "&diet=low-carb&health=sugar-conscious&from=0&to=81&q=keto+" + userInput;
        request(queryURL, function(error, response, body){
            if(error){
                throw error;
            }else if(!error && response.statusCode === 200){
                res.json(JSON.parse(body));
            }
        });
    });
}
var passport = require("passport");

module.exports = function(app){
    app.get("/cookies", function(req, res){
        if(req.session.token){
            res.cookie("token", req.session.token);
            res.json({
                status: "session cookie set"
            });
        }
        else{
            res.cookie("token", "");
            res.json({
                status: "session cookie not set"
            });
        }
    });

    app.get("/auth/google", 
        passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/plus.login'] }));
    
    app.get("/auth/google/callback", 
        passport.authenticate('google', {failureRedirect: '/login'}),
        function(req, res) {
            console.log(res);
            req.session.token = req.user.token;
            res.redirect("/");
    });

    app.get("/logout", function(req, res){
        req.logout();
        req.session = null;
        res.redirect("/");
    });
}
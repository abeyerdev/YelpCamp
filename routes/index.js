var express  = require("express");
var router   = express.Router();
var User     = require("../models/users");
var passport = require("passport");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);  
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
            res.redirect("/campgrounds");
            });  
        }
    });
});

router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local", 
                    {
                        successRedirect:"/campgrounds",
                        failureRedirect:"/login"
                    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout(); //this comes from packages
    req.flash("success", "Successfully logged out!");
    res.redirect("/campgrounds");
})


module.exports = router;
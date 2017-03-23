var Campground = require("../models/campgrounds"),
    Comment    = require("../models/comments");
    
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
    
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                req.flash("error", "That comment doesn't exist...");
                res.redirect("back");
            }
            
            if(comment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash("error", "Campground not found!");
                res.redirect("back");
            }
            
            if(campground.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }    
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;
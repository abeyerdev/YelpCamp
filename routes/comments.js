var express     = require("express");
var router      = express.Router({mergeParams:true});
var middleware  = require("../middleware/");
var Campground  = require("../models/campgrounds"),
    Comment     = require ("../models/comments");

//SHOW new comment route
router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

//CREATE comment route
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            req.flash("error", "That Campground doesn't exist!");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong...");
                    console.log(err);
                } else {
                    //add username and id to comment then save it before adding to campground
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    
                    console.log(comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//EDIT comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            res.redirect("back");
        }
        
        //this req.params.id refers to app.js campgrounds/:id that begins this route
        res.render("comments/edit", {campgroundId: req.params.id, comment: comment}); 
    })
    
})

//UPDATE comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
       if(err){
           res.redirect("back");
       }
       
       res.redirect("/campgrounds/" + req.params.id);
   });
});

//DELETE comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } 
       req.flash("success", "Comment successfully deleted!");
       res.redirect("/campgrounds/" + req.params.id);
    });
})


module.exports = router;
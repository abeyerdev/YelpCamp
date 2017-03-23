var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campgrounds");
var middleware  = require("../middleware/"); //requiring a directory and no file will default to index file in directory

//INDEX route - show all cgs
router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:campgrounds, currentUser: req.user});
        }
    });
});

//CREATE route - add new cg
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newCampground = {name: name, price:price, image:image, description:desc, author:author};
    
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } 
    });
    
    res.redirect("/campgrounds");
});

//NEW route - show form to create new cg
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW route - show info for ONE item ***Needs to be AFTER /campgrounds/new so 'new' doesn't count as an id***
router.get("/:id", function(req,res){
    var campgroundId = req.params.id;
    Campground.findById(campgroundId).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        res.render("campgrounds/edit", {campground: campground});
    });
});

//update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            res.redirect("/");
        }
        res.redirect("/campgrounds/" + req.params.id);
   });
});

//delete campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        req.flash("success", "Campground successfully deleted!");
        res.redirect("/campgrounds");
    })
});


module.exports = router;
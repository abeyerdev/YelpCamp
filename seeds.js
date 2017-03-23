//create a bunch of campgrounds and some comments
var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comments");
    
var data = [
        {
            name:"Buffalo Ass",
            image:"https://www.nps.gov/yell/planyourvisit/images/norris.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum accumsan neque, vitae ornare mauris feugiat in. Cras odio nunc, eleifend et pulvinar in, aliquam quis arcu. Aenean molestie leo at est semper, ultricies efficitur ante suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam tincidunt ultrices suscipit. Nunc sed metus ut libero eleifend vehicula. Donec vitae dui a ipsum rhoncus faucibus. Mauris non placerat mi. Ut enim risus, eleifend ac tempor volutpat, tempus in nulla. Vestibulum accumsan est at sapien facilisis accumsan."
        },
        {
            name:"Greeny Peeny",
            image:"http://www.dec.ny.gov/images/permits_ej_operations_images/kennethwilsonpav.jpg",
            description: "Maecenas sed rhoncus odio. Morbi fringilla dolor et porttitor rhoncus. Sed augue mauris, aliquet et nunc id, rutrum porta nibh. Etiam facilisis egestas enim, eu aliquet tellus. Duis semper, tortor nec tincidunt finibus, nisi elit ullamcorper lorem, sit amet porta mi massa vel arcu. Nulla tincidunt tempus vehicula. Fusce at tincidunt massa. Quisque pretium velit tellus, eget cursus augue semper at. Aliquam at vulputate leo. Cras ut accumsan ex. Sed est quam, accumsan eu iaculis ut, lacinia et metus. Nunc vel mollis risus. Vestibulum congue turpis sed pharetra consectetur."
        },
        {
            name:"Ball's Falls",
            image:"http://www.gettyimages.com/gi-resources/images/frontdoor/creative/PanoramicImagesRM/FD_image.jpg",
            description: "Integer posuere, tellus vel vestibulum vulputate, tellus mi fermentum neque, quis porttitor ex eros vel nibh. Ut molestie vel ante at malesuada. Cras sit amet ligula ac mi sollicitudin pellentesque ac vel lacus. Mauris id consectetur neque. Donec vehicula enim a vulputate sollicitudin. Nullam tempus faucibus quam, quis facilisis ex accumsan non. Suspendisse quis venenatis arcu, a mollis turpis. Aenean sollicitudin nisl ut ipsum fringilla, et rhoncus ipsum pharetra. Aenean cursus ullamcorper turpis vel tempus. In bibendum nec orci eget maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla placerat, neque eget semper fringilla, nulla odio ornare ipsum, at elementum mi justo quis enim. Donec viverra laoreet risus sed suscipit. Mauris cursus eros sed est euismod, vitae rhoncus nulla laoreet."
        }
    ];

//We seed the DB with the above data, making sure to use callbacks to ensure
//order of events (ie. you don't add campgrounds before removing them all)
function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            //add in some campgrounds and comments eventually
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("Added a campground!");
                        //now it's safe to add some comments to this campground
                        Comment.create({
                            text: "This looks like shit, Joe. How dare you put this shit online...",
                            author:"Dickbox2912"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment!");
                            }
                        });
                        
                    }
                });
            });
            
        }
    });
}

module.exports = seedDB;

    

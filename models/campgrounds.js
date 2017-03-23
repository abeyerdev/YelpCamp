var mongoose = require("mongoose");
mongoose.Promise = Promise;

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
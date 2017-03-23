var mongoose = require("mongoose");
mongoose.Promise = Promise;

var commentSchema = mongoose.Schema({
    text:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}); 

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
var express          = require("express"),
    app              = express(),
    flash            = require("connect-flash"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    User             = require("./models/users"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override");
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

var dbUrl = process.env.DATABASEURL || "mongodb://localhost/yelpcamp_final";
mongoose.connect(dbUrl);
mongoose.Promise = Promise;
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Bananas are yellow. Or they should be.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to pass user info to every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//LISTEN
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started...");
});

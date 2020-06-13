const    express = require("express"),
        passport = require("passport"),
   localStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
              db = require("./models/index"),
         session = require("express-session"),
      bodyParser = require("body-parser"),
            cors = require("cors");

const Routes = require("./routes/index");

const app= express();

// Setting Up Dotenv for .env files environment variable
const dotenv = require('dotenv');
dotenv.config();


// Session setup
app.use(session({
  secret:"JS is cool",
  resave:false,
  saveUninitialized:false
}));


//passport Auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// Cors setup
app.use(cors({
  origin:['http://localhost:3000'],
  methods:['GET','POST','PUT','DELETE'],
  credentials: true // enable set cookie
}));

// bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/", function(req,res){
    res.send(`<h1>Hello World Proper Amazon tracker is coming up from Dev Manjot</h1>`);
});

app.use("/auth",Routes.auth);
app.use("/",Routes.main);


const PORT=process.env.PORT || 8000;
app.listen(PORT,function(){
    console.log(`Server Running on ${PORT}`);
});
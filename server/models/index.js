const mongoose=require("mongoose");
mongoose.set("debug",true);
mongoose.Promise=Promise;
console.log(process.env.DATABASEURL);
const databaseURL=process.env.DATABASEURL||"mongodb://localhost/Amazon-tracker";
console.log(databaseURL);
mongoose.connect(databaseURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(() => console.log(`Database connected`))
.catch(err => console.log(`Database connection error: ${err.message}`));


module.exports.User = require("./User");
module.exports.Tracker = require("./tracker");
module.exports.Notification = require("./notification");
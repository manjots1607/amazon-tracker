const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    text:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    important:{
        type:Boolean,
        default:false
    },
    tracker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tracker"
    } 
});

module.exports= mongoose.model("notification",notificationSchema);
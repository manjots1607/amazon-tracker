const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    minPrice:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports=mongoose.model("tracker",trackingSchema);
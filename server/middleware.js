const db = require("./models/index");
module.exports={
    isLoggedIn:function(req,res,next){
        if(req.user){
            return next();
        }
        else{
            return res.status(401).json({success:false,msg:"You are Not Logged In"});
            
        }
    },
    isAuthor:function(req,res,next){
        db.Tracker.findById(req.params.id)
        .then(foundTracker=>{
            if(!foundTracker.user.equals(req.user._id)){
                return res.json({success:false,msg:"You are not authorized to do this action"});
            }
            next();
        }).catch(err=>{
            return res.json({success:false,msg:err.message});
        });
    }
};
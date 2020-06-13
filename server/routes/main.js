const  express = require("express"),
    middleware = require("../middleware"),
            db = require("../models/index");

const Router = express();

Router.get("/tracker",middleware.isLoggedIn,(req,res)=>{
   db.Tracker.find({user:req.user._id})
   .then(trackers=>{
       res.json({success:true,trackers:trackers});
   }).catch(err=>{
       console.log(err);
       res.json({success:false,msg:err.message});
   })
});
Router.post("/tracker",middleware.isLoggedIn,(req,res)=>{
    db.Tracker.create({
        url:req.body.url,
        minPrice:req.body.minPrice,
        user:req.user._id
    }).then(tracker=>{
        res.json({success:true,tracker:tracker});
    }).catch(err=>{
        res.json({success:false,msg:err.message});
    });
});
Router.get("/tracker/:id",middleware.isLoggedIn,(req,res)=>{
    db.Tracker.findOne({_id:req.params.id,user:req.user._id})
    .then(tracker=>{
        if(tracker){
            res.json({success:true,tracker:tracker});
        }else{
            res.json({success:false,msg:"You are not allowed to view this tracker"});
        }
    }).catch(err=>{
        console.log(err);
        res.json({success:false,msg:err.message});
    });
});
Router.put("/tracker/:id",middleware.isAuthor,(req,res)=>{
    db.Tracker.findByIdAndUpdate(req.params.id,req.body).then(tracker=>{
        
        res.json({success:true,tracker:tracker});
    }).catch(err=>{
        res.json({success:false,msg:err.message});
    });
});

Router.get("/notification",middleware.isLoggedIn,(req,res)=>{
    db.Notification.find({user:req.user._id})
    .populate("tracker")
    .then(notifications=>{
        res.json({success:true,notifications:notifications});
    }).catch(err=>{
        res.json({success:false,msg:err.message});
    })
})

module.exports = Router;

const  express = require("express"),
    middleware = require("../middleware"),
            db = require("../models/index"),
    checkPrice = require("../checkPrice");     

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
        url:parserFnc(req.body.url),
        minPrice:req.body.minPrice,
        user:req.user._id
    }).then(tracker=>{

        res.json({success:true,tracker:tracker});
        addLastSeenPrice(tracker._id,tracker.url);

    }).catch(err=>{
        console.log(err);
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
Router.delete("/tracker/:id",middleware.isAuthor,(req,res)=>{
    db.Tracker.findByIdAndRemove(req.params.id).then(track=>{
        res.json({success:true,msg:"deleted Successfully"});
    }).catch(err=>{
        res.json({success:false,msg:err.message});
    })
})

Router.get("/notification",middleware.isLoggedIn,(req,res)=>{
    db.Notification.find({user:req.user._id})
    .populate("tracker")
    .then(notifications=>{
        res.json({success:true,notifications:notifications});
    }).catch(err=>{
        res.json({success:false,msg:err.message});
    })
});


function parserFnc(url){
    const arr= url.split("/");
    var newUrl="";
    let i=0;
    for(i=0;i<arr.length && arr[i]!="dp";i++ ){
        newUrl+=arr[i]+"/";
    }
    if(i==arr.length){
        return false;
    }else{
        newUrl+="dp/"+arr[i+1];
        return newUrl;
    }
}


// This also Runs Fine
function addLastSeenPrice(id,url){
    console.log("Price initiated");
    checkPrice(url)
    .then(price=>{
        console.log(price);
        db.Tracker.findById(id)
        .then(tracker=>{
            tracker.lastSeenPrice=price;
            tracker.lastSeenTimestamp=Date.now();
            tracker.save();
        }).catch(Err=>{
            console.error(Err);
        })
    }).catch(err=>{
        console.error(err);
    })
}

module.exports = Router;

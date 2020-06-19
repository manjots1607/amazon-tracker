const db = require("./models/index"),
checkPrice = require("./checkPrice");  

console.log("inside Main Logic");
setInterval(function(){
    db.Tracker.find({})
    .populate("user")
    .then(trackers=>{
        trackers.forEach(function(tracker){
            console.log(tracker.url);
            checkPrice(""+tracker.url)
            .then(newPrice=>{
                if(newPrice<tracker.lastSeen){
                    db.notification.create({
                      text:`Price Dropped from ${tracker.lastSeen} to ${newPrice}`,
                      user:tracker.user._id,
                      tracker:tracker._id  
                    }).then(createdNotification=>{
                        console.log(createdNotification);
                    });

                    tracker.lastSeen=newPrice;
                    tracker.lastSeenTimestamp=Date.now();
                    tracker.save();
                }
                if(newPrice<=tracker.minPrice){
                    console.log("Min Price Reaced");
                    db.notification.create({
                        text:`Price Dropped less than your Min Price i.e ${newPrice}`,
                        user:tracker.user._id,
                        tracker:tracker._id  ,
                        important:true
                      }).then(createdNotification=>{
                          console.log(createdNotification);
                      });
                }
            })
        })
    }).catch(err=>{
        console.error(err);
    })

},50000);
// Time will Change To 12 hrs in production 12*60*60*1000

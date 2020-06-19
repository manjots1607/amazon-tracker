const db = require("./models/index"),
checkPrice = require("./checkPrice");  

console.log("inside Main Logic");
setInterval(function(){
    console.log("inside interval");

    db.Tracker.find({})
    .populate("user")
    .then(trackers=>{
        trackers.forEach(function(tracker){
            console.log(tracker.url);
            checkPrice(tracker.url)
            .then(newPrice=>{
                console.log("NEW PRICE:------",newPrice);
                console.log("LAST SEEN PRICE:------",tracker.lastSeenPrice);
                console.log("MIN PRICE:------",tracker.minPrice);

                if(newPrice<tracker.lastSeenPrice){
                    db.Notification.create({
                      text:`Price Dropped from ${tracker.lastSeenPrice} to ${newPrice}`,
                      user:tracker.user._id,
                      tracker:tracker._id  
                    }).then(createdNotification=>{
                        console.log(createdNotification);
                    });

                    tracker.lastSeenPrice=newPrice;
                    tracker.lastSeenTimestamp=Date.now();
                    tracker.save();
                }
                if(newPrice<=tracker.minPrice){
                    console.log("Min Price Reaced");
                    db.Notification.create({
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
    // checkPrice("https://www.amazon.in/Test-Exclusive-746/dp/B07DJHXTLJ")
    // .then(price=>{
    //     console.log(price);
    // });
},50000);
// Time will Change To 12 hrs in production 12*60*60*1000

const nightmare = require('nightmare')();
const checkPrice =async function (url){
    try{
    const priceString = await nightmare.goto(url)
                                       .wait("#priceblock_ourprice")
                                       .evaluate(() =>  document.getElementById("priceblock_ourprice").innerText)
                                       .end()

    console.log(priceString);
    return parseFloat(priceString.replace(",","").replace("₹","").replace("$",""));
    }
    catch(e){
        console.log(e);
    }
};

module.exports=checkPrice;

//This Runs Fine
// checkPrice("https://www.amazon.in/Test-Exclusive-746/dp/B07DJHXTLJ")
// .then(price=>{
//     console.log(price);
// });





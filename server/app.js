const express = require("express");


const app= express();

app.get("/", function(req,res){
    res.send("<h1>Hello World Proper Amazon tracker is coming up from Dev Manjot</h1>");
});

const PORT=process.env.PORT || 8000;
app.listen(PORT,function(){
    console.log(`Server Running on ${PORT}`);
});
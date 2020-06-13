const express = require("express"),
     passport = require("passport"),
           db = require("../models/index");

const Router = express.Router();

Router.post("/register",(req,res)=>{
    db.User.register(new db.User({username:req.body.username,name:req.body.name}),req.body.password)
    .then(User=>{
        passport.authenticate("local")(req,res,()=>{
            res.json({success:true,msg:"Created User Successfully"});
        })
    }).catch(err=>{
        console.log(err);
        res.json({success:false,msg:err.message});
    });
});

Router.post("/login",passport.authenticate("local"),(req,res)=>{
    res.json({success:true,msg:"You Logged in successfully"})
});

Router.get("/curUser",(req,res)=>{
    res.json(req.user);
});
Router.get("/logout",(req,res)=>{
    req.logout();
    res.json({success:true,msg:"Logged out Successfully"});
})

module.exports = Router;
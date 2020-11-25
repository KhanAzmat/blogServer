const express = require("express");
const User = require('./models/users.model');
const Router = express.Router();
const config = require("./config");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware")

Router.route("/:username").get(middleware.checkToken, (req,res) => {
    User.findOne({username: req.params.username}, (err,result) => {
        if(err) 
        return res.status(500).json({msg:err});
        else{
            console.log({msg: "No Error"});
        }
        res.json({
            data:result,
            username: req.params.username,
        });
    });
});

Router.route("/login").post((req,res) => {
    User.findOne({username: req.body.username}, (err,result) => {
        if(err) 
        return res.status(500).json({msg:err});
        else if(result === null){
           return res.status(403).json("Username Incorrect")
        }
        else if(result.password===req.body.password){
           let token = jwt.sign({username: req.body.username},config.key,{expiresIn: "24h"},);
            res.json({token: token,msg: "Success"});
        }
        else
        {
         res.status(403).json("Password Incorrect");
        }
    });
});

Router.route("/register").post((req,res) => {
    console.log("Inside the register");
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    user.save().then(() => {
        console.log('User Registered');
        res.status(200).json({msg:'ok'});
    }).catch((err) =>{
        res.status(403).json({msg: err});
    });
});

Router.route("/update/:username").patch(middleware.checkToken,(req,res) => {
    User.findOneAndUpdate(
        {username: req.params.username},
        { $set: {password: req.body.password}},
        (err, result) =>{
            if(err) 
            return res.status(500).json({msg:err});
            else
            console.log("No Error");
            const msg = {
                msg:"Password successfully updated",
                username: req.params.username,
            };
            return res.json(msg);
        }
    );
});

Router.route("/delete/:username").delete(middleware.checkToken,(req,res) => {
    User.findOneAndDelete({username: req.params.username}, (err, result) =>{
        if(err) 
        return res.status(500).json({msg: err});
        else 
        console.log({msg: "No Error"});
        const msg = {
            msg: "User deleted",
            username: req.params.username,
        };
        return res.json(msg);
    });
});
module.exports = Router;


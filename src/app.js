//in this file we will create and config server but we will not call server here we will call server in server.js file
//by config we mean which api you are using and which middleware

const express=require("express");

//this app constant will have access to all express methods
const app=express(); //creating server

//using express.json midlleware
app.use(express.json())
//Note: by default the express server can't read data of req.body by default, so in order to make it read req.body data we are using express.json() middleware


/** Importing Routes */
const authRouter=require("./routes/auth.routes")


//Using Routes
app.use("/api/auth",authRouter)


module.exports=app;
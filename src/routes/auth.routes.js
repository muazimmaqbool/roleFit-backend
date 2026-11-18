// this route will contain all authentication related routes/apis
// login login, register etc

const express=require("express");
const authController=require("../controllers/auth.controller")

const authRouter=express.Router();

//learn about js comment string
/**
 * @route POST : /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register",authController.registerUserController)


//used inside app.js
module.exports=authRouter

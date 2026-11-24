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

/**
 * @route POST : /api/auth/login
 * @description Login to a existing user
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route POST : /api/auth/logout
 * @description Logout from the app
 * @access 
 */
authRouter.post("/logout",authController.logoutUserController)


//used inside app.js
module.exports=authRouter

//used inside auth.routes.js file

const userModel=require("../models/user.model")

/**
 * @name registerUserController
 * @description expects username, email and password in request body
 * @access Public
 */
async function registerUserController(req,res){
    const {userName,email,password}=req.body;

    //checking whether user provides all of the requuied fields or not
    if(!userName || !email || !password){
        return res.status(400).json({
            message:"Please provide username, email and password",
            success:false
        })
    }

    //checking whether the email already exists in the system or not
    const isExists=await userModel.findOne({
        email:email
    })

    //if email already exists
    if(isExists){
        return res.status(422).json({
            message:"Email already exists",
            status:"Failed"
        })
    }
}

module.exports={registerUserController}
//used inside auth.routes.js file

const userModel=require("../models/user.model")

/**
 * @name registerUserController
 * @description expects username, email and password in request body
 * @access Public
 */
async function registerUserController(req,res){
    const {username,email,password}=req.body;

    //checking whether user provides all of the requuied fields or not
    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please provide username, email and password",
            success:false
        })
    }

    //checking whether the user already exists in the system or not
    const isUserAlreadyExists=await userModel.findOne({

        //checking either on the basis of username or email 
        //i.e check whether their is any user with same username or email and return it
        $or:[{username},{email}]
    })

    //if email already exists
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists",
            status:"Failed"
        })
    }

    //if user is new
    const newUser=await userModel.create({
        username,
        email,
        password
    })
}

module.exports={registerUserController}
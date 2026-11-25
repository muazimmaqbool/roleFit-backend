const userModel=require("../models/user.model")
const{generateToken}=require("../middlewares/jwt.middleware")
const tokenBlackListModel=require("../models/tokenBlackList.model")

/**
 * @name registerUserController
 * @description expects username, email and password in request body
 * @access Public
 */
async function registerUserController(req,res){
    // console.log("req.body:",req.body)
    if(!req.body){
        return res.status(500).json({
            message:"request body is empty",
        })
    }
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

    //Note: Hashing password before saving in user.model.js file
    //you can also hashpassword here before saving like this:
    // const hash=await bcrypt.hash(password,10)
    //then save like this: password:hash in newUser create

    //if user is new
    const newUser=await userModel.create({
        username,
        email,
        password
    })

    const payLoad={userId:newUser?._id}
    
    const token=generateToken(payLoad)

    //saving token in cookie
    res.cookie("token",token)
    
    //finall response after everything done
    res.status(200).json({
        message:"User created successfully",
        user:{
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email
        },
        token:token //returning token in response is not required as we are setting token inside cookies
    })
}


/**
 * @name loginUserController
 * @description login a user expects email and password in request body
 * @access Public
 */
async function loginUserController(req,res){
    if(!req.body){
        return res.status(500).json({
            message:"request body is empty",
        })
    }

    const{email,password}=req.body;

    const user=await userModel.findOne({email}).select("+password")
    //.select("+password"); why we used this, because in user.model.js we have set select:false for password
   //means password will not get returned that's why we select .select("+password"); so it gets returned for comparison

  //Note if we do this: ).select("password"); i.e not adding + prefix to password then only password is returned, no email and username
  // console.log("user:",user)

  //user not found i.e email not found in the database
  if(!user){
    return res.status(401).json({
        message:"No user found! please check your email"
    })
  }

  //user is found i.e email is valid, now comparing password
  const isValidPassowrd= await user.comparePassword(password)  
  //comparePassword method is defined inside user.mode.js file

  if(!isValidPassowrd){
    return res.status(401).json({
        message:"Password is invalid!"
    })
  }

  //password is valid
  const payLoad={userId:user._id}
  const token=generateToken(payLoad);

  res.cookie("token",token)

  res.status(200).json({
    message:"User logged in successfully",
    user:{
        _id:user._id,
        username:user.username,
        email:user.email
    },
    token:token
  })

}

/**
 * @name logoutUserController
 * @description logout a user from the app, clear token from user and blacklist token
 * @access public
 */
async function logoutUserController(req,res){
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("token",token)

    //token is missing from header and cookies
    if(!token){
        return res.status(400).json({
            message:"Token is missing",
            success:false
        })
    }

    //Now token is present:
    //adding token to black list so this token won't be used again i.e for hacking/unauthorized
    await tokenBlackListModel.create({
        token:token,
    })

    //clearing cookies
    res.clearCookie("token")

    res.status(200).json({
        message:"User logged out successfully",
        success:true
    })
}

//used inside auth.routes.js file
module.exports={registerUserController,loginUserController,logoutUserController}
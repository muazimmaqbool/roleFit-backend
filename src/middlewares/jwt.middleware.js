//this middleware is used for generating jwt tokens and verifying jwt tokens

const jwt=require("jsonwebtoken");

//generate JWT token:
//token needs payload i.e userData that's why it takes parameter as user data or anyname
const generateToken=(payLoad)=>{
//here payLoad is usually userData

  return jwt.sign(payLoad, process.env.JWT_SECRET_KEY, { expiresIn: "3d" }); 
  //now generate token and check its expiry in jwt.io
  //Note make sure the payload i.e userData here in this case is object and if not object then do like this
  //return jwt.sign({userData},process.env.JWT_SECRET_KEY,{expiresIn:30000})
}

//creating middleware
//this middleware is used to check whether the user is loggedin or not
//(via jwt tokwn) which we returned during login and it gets saved in cookies
//so we will check whether it's inside cookies or not
const jwtAuth=async(req,res,next)=>{

}


module.export={generateToken}
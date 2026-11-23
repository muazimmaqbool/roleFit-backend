const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already taken"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "Account already exists with this email address"],
    required: [true, "Email is required for creating a user"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password should contain more than 6 characters"],
    select: false, //with select:false, whenever we fetch user data by any user query the password will not be returned by default
  },
});

//this will be called just before saving user (it's also an middle ware)
userSchema.pre("save", async function () {
  //checking if password is modified or not and if not modified then saving without hashing password
  if (!this.isModified("password")) {
    return
  }

  //if password is changed or new password added hasing the password before saving it using bcrypt library
  const hash = await bcrypt.hash(this.password, 10); // 10 is salt of size 10
  this.password = hash;
  //we converted password to hash and then saved hash in password
  return
  
});

//method comparePassword used to compare password entered by the user with the hashed password in db
userSchema.methods.comparePassowrd=async function(enteredPassword){
  try{
    //using bcrypt to compared the provided password with hashed password in db
    const isMatch=await bcrypt.compare(enteredPassword,this.password);
    return isMatch;
  }catch(err){
    throw err;
  }
}


//It's data will be stored inside 'users' collection
const userModel=mongoose.model("users",userSchema)
module.exports=userModel;
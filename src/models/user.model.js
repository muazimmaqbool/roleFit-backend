const mongoose = require("mongoose");

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

//It's data will be stored inside 'users' collection
const userModel=mongoose.model("users",userSchema)
module.exports=userModel;
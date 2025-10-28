const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

//create a new user
authRouter.post("/signup",async (req,res)=>{
  try {
    validateSignUpData(req);

    const {firstName, lastName, password, emailId, age} = req.body

    const hashPassword = await bcrypt.hash(password,10) // bcrypt.hash always return a promise
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      age
    }); //creates new user instance every time.
    await user.save(); //saves the user instance in the db. Most of the db operations returns promise so we have to use await.
    res.send("User added successfully!!");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

//login
authRouter.post("/login",async(req,res)=>{
  const {emailId, password} = req.body;
  try {
    const user = await User.findOne({emailId: emailId});
    if (!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){
      const token = await jwt.sign({_id: user._id}, "@DEV#00121998", {expiresIn: "1d"});
      res.cookie("token",token)
      res.send("Login Successful!");
    }else{
      throw new Error("Invalid credentials");
    }
  
  } catch (error) {
    res.status(400).send("Error "+ error.message)
  }
});


//logout
authRouter.post("/logout",(req,res)=>{
  res.cookie("token",null,{expires: new Date(Date.now())});
  res.send("Logged out successfully!");
});

module.exports = authRouter;
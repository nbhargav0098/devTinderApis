const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfile} = require("../utils/validation");

// profile
profileRouter.get("/profile", userAuth , (req,res)=>{
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});


//edit profile
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try {
    if(!validateEditProfile(req)){
      console.log("entered")
      throw new Error("Invalid edit request!")
    }
    const user = req.user;
    Object.keys(req.body).forEach((key)=> (user[key] = req.body[key]));
    await user.save();
    res.send(`${user.firstName}, your profile has been updated successfully!`)
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
})

module.exports = profileRouter;
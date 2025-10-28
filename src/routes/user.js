const express = require('express');
const userRouter  = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequests");

//get all connections that are pending
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
  try {
    const loggedInUser = req.user._id;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested"
    }).populate("fromUserId",["firstName","lastName","age","gender","skills"])
    // if (!connectionRequest){
    //   return res.status(404).json({message: "Connection request not found!"});
    // }

    res.json({message: "Data fetched successfully!", data: connectionRequest});

  } catch (error) {
    res.status(400).send("Error " + error.message)
  }
})

module.exports = userRouter;
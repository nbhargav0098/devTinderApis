const express = require("express");

const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const {validateConnectionRequest} = require("../utils/validation");
const ConnectionRequest = require("../models/connectionRequests");
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
  const user = req.user;
  const {status, toUserId} = req.params;

  const fromUserId = user._id;
  try {
    if(!validateConnectionRequest(req)){
      throw new Error("Invalid status request!")
    }

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json("User not found!")
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]
    })
    
    if(existingConnectionRequest){
      throw new Error("Connection request already exists!")
    }

    const newConnection = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const data = await newConnection.save();

    res.json(data);
    
  } catch (error) {
    res.status(400).send("Error " + error.message)
  }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
  try {
    const validStatus = ["accepted","rejected"];
    const { status , requestId } = req.params;
    const isValidStatus = validStatus.includes(status);
    if(!isValidStatus){
      throw new Error("Status is invalid!");
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: req.user._id,
      status: "interested"
    })

    if(!connectionRequest){
      return res.status(404).json({message: "Connection request not found!"});
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({message: "Connection request " + status, data});

  } catch (error) {
    res.status(400).send("Error " + error.message)
  }
})



module.exports = requestRouter;
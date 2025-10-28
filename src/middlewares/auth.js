const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) => {
  try {
    const {token} = req.cookies;
     if(!token){
      throw new Error("Token is invalid!");
    }
    const decodedMessage = await jwt.verify(token,"@DEV#00121998");
    const {_id} = decodedMessage;
    const user = await User.findOne({_id:_id});
    if (!user){
      throw new Error("User does not exist!");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
}

module.exports = {userAuth};
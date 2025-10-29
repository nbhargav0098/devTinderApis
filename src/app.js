const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
var cors = require('cors');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json()); //Reads json object and converts it into javascript object
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

// //get a single user
// app.get("/getUser", async(req,res)=>{
//   const user = req.body;
//    try {
//     const users = await User.find({emailId: user.emailId});
//     if(users.length === 0) {
//       res.status(404).send("User not found!");
//     }
//     res.send(users);
//    } catch (error) {
//      res.status(500).send("Something went wrong" + error.message);
//    }
// });

// //get all the user documents from users collection
// app.get("/feed",async(req,res)=>{
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(500).send("Something went wrong" + error.message);
//   }
// });

// //delete user document by id in the users collection
// app.delete("/deleteUser",async(req,res)=>{
//   const userId = req.body._id;
//   try {
//     await User.findByIdAndDelete({_id: userId});
//     res.send("User has be deleted successfully!");
//   } catch (error) {
//     res.status(500).send("Something went wrong" + error.message);
//   }
// });

// //update user document
// app.patch("/updateUser/:userId",async(req,res)=>{
//   const data = req.body;
//   const userId = req.params?.userId;
//   try {
//     const Allowed_Updates = ["photoUrl","about","gender","age","skills"];
//     const isUpdateAllowed = Object.keys(data).every((key)=> Allowed_Updates.includes(key));

//     if (!isUpdateAllowed){
//       throw new Error("update not allowed")
//     }

//     if (data.skills.length > 10){
//       throw new Error("max skills can be 10")
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, data, {new: true, runValidators: true});
//     res.send(updatedUser)
//   } catch (error) {
//     res.status(400).send("Something went wrong " + error.message);
//   }
// })

connectDb()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is succssfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection cannot be connected...");
  });

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: 18, max: 60 },
    gender: { 
      type: String, 
      validate(value){
        if(!["male","female","others"].includes(value)){
          throw new Error("Gender is not valid")
        }
      } 
    },
    about: {type: String, default: "this is default about section"},
    photoUrl: {type: String},
    skills: {type: [String]},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

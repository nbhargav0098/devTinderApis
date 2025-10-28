const validator = require("validator");

const validateSignUpData = (req) => {
  const {firstName, lastName, emailId, password} = req.body;
  if (!firstName || !lastName) {
    throw new Error("first name and last name are mandatory!");
  }
  else if (!validator.isEmail(emailId)){
    throw new Error("Please enter valid email id")
  }
  else if (!validator.isStrongPassword(password)){
    throw new Error("Enter a strong password!")
  }
}

const validateEditProfile = (req) => {
  const allowedEditFields = ["firstName","lastName","emailId","age","gender","about","photoUrl","skills"];

  const isEditValid = Object.keys(req.body).every((field)=> allowedEditFields.includes(field));
  return isEditValid;
}

const validateConnectionRequest = (req) => {
  const allowedStatus = ["ignored", "interested"]
  const isAllowed = allowedStatus.includes(req.params.status);

  return isAllowed;
}

module.exports = { validateSignUpData ,validateEditProfile, validateConnectionRequest };


const mongoose = require('mongoose');

const connectDb = async () => {
  await mongoose.connect("mongodb+srv://nbhargav0098:N794Qozlnxis7OZz@mynode.lhcqbn6.mongodb.net/devTinder");
}

module.exports = connectDb;
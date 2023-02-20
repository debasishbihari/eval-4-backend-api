const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
});

const UserModel = model("user", userSchema);

module.exports = {
    UserModel
}
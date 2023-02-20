const express = require("express");
const {UserModel} = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express.Router();

// create user

app.post("/register", async (req, res) => {
  const { name, email, password, gender, age, city } = req.body;

  if (!name || !email || !password || !gender || !age || !city) {
    return res.send({
      mess: "please fill all the required details",
      state: "NOT OK",
    });
  }

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.send({ msg: "user already exists", state: "NOT OK" });
  }

  try {
    bcrypt.hash(password, 8, async function (err, hash) {
      if (err) {
        return res.send({ msg: "something went wrong", state: "NOT OK" });
      }

      let newUser = new UserModel({ email, name, gender,age,city, password: hash });
      await newUser.save();
      return res.send({ msg: "new user created", state: "OK" });

      // Store hash in your password DB.
    });
  } catch (e) {
    res.send({ msg: e.message, state: "NOT OK" });
  }
});

//  login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({
      mess: "please fill all the required details",
      state: "NOT OK",
    });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.send({ msg: "user not exists", state: "NOT OK" });
  }

  try {
    bcrypt.compare(password, user.password, function (err, result) {
      if (!result) {
        return res.send({ msg: "invalid credentials", state: "NOT OK" });
      }

      let token = jwt.sign(
        { email, name: user.name, id: user._id },
        process.env.JWT
      );

      return res.send({ mess: token, state: "Ok" });

      // result == true
    });
  } catch (e) {
    res.send({ msg: e.message, state: "NOT OK" });
  }
});

module.exports = app;

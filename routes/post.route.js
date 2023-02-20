const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {PostModel} = require("../model/post.model");

const app = express.Router();

//  post created

app.post("/", async (req, res) => {
  let { title, body, device } = req.body;
  let userID = req.userID;
  //   console.log(userID);

  try {
    let newPost = new PostModel({ title, body, device, user: userID });
    await newPost.save();
    return res.send({ msg: "new post created", state: "OK" });
  } catch (e) {
    return res.send({ msg: e.message, state: "NOT OK" });
  }
});

// post get

app.get("/", async (req, res) => {
  let { device1, device2, device } = req.query;
  let userID = req.userID;

  try {
    if (device1 && device2) {
      let post = await PostModel.find({
        user: userID,
        device: device1,
        device: device2,
      });
      return res.send({ msg: post, state: "OK" });
    } else if (device) {
      let post = await PostModel.find({
        user: userID,
        device,
      });
      return res.send({ msg: post, state: "OK" });
    }
    let post = await PostModel.find({ user: userID });
    return res.send({ msg: post, state: "OK" });
  } catch (e) {
    return res.send({ msg: e.message, state: "NOT OK" });
  }
});

// update title

app.patch("/update/:id", async (req, res) => {
  let { title } = req.body;
  const { id } = req.params;
  let userID = req.userID;
  let post = await PostModel.findOne({ _id: id });
  if (!post) {
    return res.send({ msg: "books not found", state: "NOT OK" });
  }

  try {
    let update = await PostModel.updateOne({ _id: id, title: title });

    return res.send({ msg: "updated", state: "OK" });
  } catch (e) {
    return res.send({ msg: e.message, state: "NOT OK" });
  }
});

//  delete

app.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  let userID = req.userID;
  console.log(id);

  let post = await PostModel.findOne({ _id: id });
  if (!post) {
    return res.send({ msg: "invalid post id", state: "NOT OK" });
  }

  try {
    await PostModel.deleteOne({ _id: id });
    return res.send({ msg: "new post deleted", state: "OK" });
  } catch (e) {
    return res.send({ msg: e.message, state: "NOT OK" });
  }
});
module.exports = app;

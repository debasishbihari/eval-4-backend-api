const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: String,
  body: String,
  device: String,
  no_of_comments: Number,
});

const PostModel = model("post", postSchema);

module.exports = {
    PostModel
}

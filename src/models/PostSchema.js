const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  createdAt: { type: String, default: Date.now },
  // expiryAt: { type: String, required: true },
  heading: { type: String },
  details: { type: String },
  imglink: { type: String },
  visibility: {
    type: String,
    enum: ["public", "private", "friends"],
    default: "public",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

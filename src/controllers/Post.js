const Post = require("../models/PostSchema");
const { v4: uuidv4 } = require("uuid");
const imagekit = require("../utils/imagekit-config");

const createPost = async (req, res) => {
  try {
    const { heading, details } = req.body;
    const file = req.file;
    let id = uuidv4();
    let newPost;
    if (file) {
      var uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: id + "-" + req.file.originalname,
        folder: "castview",
      });
      newPost = new Post({
        id,
        heading,
        details,
        imglink: uploadResponse.url,
      });
    } else {
      newPost = new Post({
        id,
        heading,
        details,
      });
    }

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
};

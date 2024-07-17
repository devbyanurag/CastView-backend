const postController = require("../controllers/Post");
const express = require("express");
const router = express.Router();

const upload = require("../utils/multer-config");

router.post("/create", upload.single("image"), postController.createPost);
router.post("/getpost", postController.getPosts);

module.exports = router;

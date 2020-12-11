const express = require("express");
const router = express.Router();

//@route GET Posts
//@desc test
// access public

router.get("/", (req, res) => {
  res.send("posts");
});

module.exports = router;

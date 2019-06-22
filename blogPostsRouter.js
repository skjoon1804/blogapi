const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { BlogPosts } = require("./models");

// GET
router.get("/", (req, res) => {
  res.json(BlogPosts.get());
});

// POST
router.post("/", jsonParser, (req, res) => {
  const requiredFields = ["title", "content", "author", "publishDate"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post item ${req.params.id}`);
  res.status(204).end();
});

// UPDATE
router.put("/:id", jsonParser, (req, res) => {
  const requiredFields = [];
});

module.exports = router;

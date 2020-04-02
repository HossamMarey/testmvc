const express = require("express");
const router = express.Router();
const Author = require("../models/Author");

router.get("/", async (req, res) => {
  const authors = await Author.find();
  res.render("authors/index", { authors: authors });
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", async (req, res) => {
  await Author.create(req.body);
  console.log(req.body);
  res.redirect("/authors");
});

module.exports = router;

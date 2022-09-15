const express = require("express");
const path = require("path");
const blogs = require("../data/blogs");
const languages = require("../data/languages");

const route = express.Router();

route.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../templates/index.html"));
  res.render("home");
});

route.get("/blog", (req, res) => {
  //   blogs.forEach((e) => {
  //     console.log(e.title);
  //   });
  //   res.sendFile(path.join(__dirname, "../views/bloghome.html"));
  res.render("bloghome", {
    blogs: blogs,
  });
});

route.get("/blogpost/:slug", (req, res) => {
  let myBlog = blogs.filter((item) => item.slug == req.params.slug);
  //   console.log(myBlog);
  //   res.sendFile(path.join(__dirname, "../views/blogpage.html"));
  res.render("blogpage", {
    title: myBlog[0].title,
    content: myBlog[0].content,
  });
});

route.get("/home", (req, res) => {
  res.render("homepage", {
    languages: languages,
  });
});

module.exports = route;

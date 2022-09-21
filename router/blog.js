const express = require("express");
const path = require("path");
const blogs = require("../data/blogs");
const languages = require("../data/languages");
const fs = require("fs");
const Programs = require("../models/programs");

const route = express.Router();

route.use(express.json());

route.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../templates/index.html"));
  res.render("home");
});

route.get("/programming", async (req, res) => {
  try {
    const programs = await Programs.findAll();
    res.json({ programs });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
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

route.post("/home", (req, res) => {
  const lang = req.body;
  languages.push(lang);
  res.status(201).send("A home page post request");
});

route.put("/blogpost/:slug", (req, res) => {
  let slug = req.params.slug;
  let title = req.body.title;
  let content = req.body.content;

  let index = blogs.findIndex((blogs) => blogs.slug == slug);

  if (index >= 0) {
    let blog = blogs[index];
    blog.title = title;
    blog.content = content;
    res.json(blog);
  } else {
    res.status(404);
  }
});

route.delete("/blogpost/:slug", (req, res) => {
  let slug = req.params.slug;

  let index = blogs.findIndex((blogs) => blogs.slug == slug);

  if (index >= 0) {
    let blog = blogs[index];
    blogs.splice(index, 1);
    res.json(blog);
  } else {
    res.status(404);
  }
});

module.exports = route;

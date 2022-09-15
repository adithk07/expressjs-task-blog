const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "static")));
app.use("/", require(path.join(__dirname, "router/blog.js")));

app.use((req, res) => {
  res.status(404).send("The requested page was not found on this server");
});

let server = app.listen(3000, () => {
  var port = server.address().port;
  console.log(`Listening at http://localhost:${port}`);
});

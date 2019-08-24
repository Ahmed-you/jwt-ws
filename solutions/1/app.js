const express = require("express");
const cookieParser = require("cookie-parser");

const router = require("./router.js");

const app = express();

app.set("port", 3000);

app.use(cookieParser);
app.use(router);

app.use((req, res) => {
  const notFoundPage =
    '<p style="font-size: 10vh; text-align: center;">404!</p>';

  res.set("Content-Length", notFoundPage.length);
  res.status(404).send(notFoundPage);
});

module.exports = app;
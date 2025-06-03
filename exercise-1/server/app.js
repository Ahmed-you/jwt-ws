"use strict";

const path = require("path");
const express = require("express");

const router = require("./controllers");

const cookieParser = require("cookie-parser");
const app = express();

app.set("port", 3000);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(router);
module.exports = app;

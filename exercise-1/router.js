"use strict";

const path = require("path");
const { sign, verify } = require("jsonwebtoken");
const router = require("express").Router();

const SECRET = "poiugyfguhijokpkoihugyfyguhijo";

const userDetails = { userId: 5, role: "admin" };

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.post("/login", (req, res) => {
  const cookie = sign(userDetails, SECRET);
  res.cookie("jwt", cookie, { httpOnly: true });
  res.redirect("/");
});

router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

router.get("/auth_check", (req, res) => {
  const send401 = () => {
    const message = "fail!";
    res.set("Content-Length", message.length);
    res.status(401).send(message);
  };

  if (!req.cookies) return send401();

  const { jwt } = req.cookies;
  if (!jwt) return send401();

  verify(jwt, SECRET, (err, jwt) => {
    if (err) return send401();
    const message = `Your user id is: ${jwt.userId}`;
    res.set("Content-Length", message.length);
    res.send(message);
  });
});

module.exports = router;

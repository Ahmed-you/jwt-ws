"use strict";

const jwt = require("jsonwebtoken");
const router = require("express").Router();
const error = require("./error");

const secret = "123";
const user = { id: 99, email: "ahmed@example.com" };

// log in
router.post("/login", (req, res) => {
  jwt.sign(
    user,
    secret,
    { algorithm: "HS256", expiresIn: "5m" },
    function (err, token) {
      if (err) return res.status(500).send("Error signing token: " + err);
      res.cookie("token", token, { httpOnly: true, maxAge: 60000 });
      res.redirect("/");
    }
  );
});

//log out
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// check user status if is logged in
router.post("/auth_check", (req, res) => {
  jwt.verify(req.cookies.token, secret, function (err, decoded) {
    if (err) {
      console.log(`jwtE Error:  ${err}`);

      return res.status(401).send("invalid Or Expired Token");
    }

    res.send("You Are Logged In ");
  });
});
router.use(error.client);
router.use(error.server);

module.exports = router;

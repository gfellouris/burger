var express = require("express");
var router = express.Router();
var burgers = require("../models/burger.js");

router.get("/", function(req, res) {
  burgers.all(function(data) {
    res.json(data);
  });
}); // get /
module.exports = router;

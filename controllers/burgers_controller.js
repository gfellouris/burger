var express = require("express");
var router = express.Router();
var burgers = require("../models/burger.js");

router.get("/", function(req, res) {
  burgers.all(function(data) {
    // res.json(data);
    var hbsObject = { burgers: data };
    res.render("index", hbsObject);
  });
});

router.post("/api/addburger", function(req, res) {
  burgers.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/eatburger/:id/:devoured", function(req, res) {
  var burgerId = req.params.id;
  var devoured = req.params.devoured;

  console.log("burgerId=" + burgerId);

  burgers.update(devoured, burgerId, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
module.exports = router;

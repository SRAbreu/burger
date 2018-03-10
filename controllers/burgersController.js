var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgerv = require("../models/burger.js");
//burgerv: to differentiate from burger.js, & burgers table

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burgerv.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
    //"index" is the index.hdbs?
  });
});

router.post("/api/burgers", function(req, res) {
  console.log(req.body);
  burgerv.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, false
    //for some reason the my NOT NULL option in the DB was causing trouble
    //it wasnt populating "devoured", so I set it to false
  ], function(result) {
    // should send back the ID of the new burger
    res.redirect("/");
  });
});

//this was supposed to be a PUT but HTML 5 doesn't support it, so this is a workaround.
//since the instructions of the activ doesn't have a FE js file, I did everything on the html side,
//instead of creating a jquery file to handle the PUT & DELETE to the html.
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgerv.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      console.log("Error 404");
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      //because of the workaround, I used .redirect
      return res.redirect ("/");
    }
  });
});
//this was supposed to be a DELETE but HTML 5 doesn't support it, so this is a workaround.
router.delete("/api/burgers/:id", function(req, res) {
  //_method is also part of the workaround (see index.handlebars)
  var condition = "id = " + req.params.id;
  console.log("in delete route", req.params._method);
  burgerv.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      return res.redirect ("/");
    }
  });
});

// Export routes for server.js to use.
module.exports = router;

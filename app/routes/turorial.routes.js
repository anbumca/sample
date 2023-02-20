module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  router.get("/", tutorials.findAll);

  router.get("/:marketId/", tutorials.findOne);

  app.use("/api/tutorials", router);
};

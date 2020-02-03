const express = require("express");
const questions = require("../routes/questions");
const topics = require("../routes/topics");
const users = require("../routes/users");
const cardends = require("../routes/cardends");
const restful = require("../routes/restful");
const rests = require("../routes/rests");
const settings = require("../routes/settings");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/questions", questions);
  app.use("/api/topics", topics);
  app.use("/api/users", users);
  app.use("/api/cardends", cardends);
  app.use("/api/restful", restful);
  app.use("/api/rests", rests);
  app.use("/api/settings", settings);
  app.use("/api/auth", auth);
  app.use(error);
};

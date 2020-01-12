const { Setting, validate } = require("../models/setting");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const winston = require("winston");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const queryResult = await req.query;
  const settings = await Setting.find(queryResult).select("-_id");
  res.send(settings);
});

module.exports = router;

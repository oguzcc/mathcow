const { Avatar, validate } = require("../models/avatar");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const avatars = await Avatar.find();
  res.send(avatars);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const avatar = new Avatar(_.pick(req.body, ["avatarSvg"]));

  await avatar.save();

  res.send(avatar);
});

module.exports = router;

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const users = await User.find()
    .select("-email -password -finishedCards._id -__v")
    .sort("-points");
  res.send(users);
});

router.get("/me", [auth], async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.params.id);

  let userCorrectQ = user.correctQuestions;
  let userWrongQ = user.wrongQuestions;
  const bodyCorrectQ = req.body.correctQuestions;
  const bodyWrongQ = req.body.wrongQuestions;
  let userAccPer = user.accuracyPercentage;

  userCorrectQ = userCorrectQ + bodyCorrectQ;
  userWrongQ = userWrongQ + bodyWrongQ;
  userAccPer = (userCorrectQ / (userCorrectQ + userWrongQ)) * 100;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      points: req.body.points,
      correctQuestions: userCorrectQ,
      wrongQuestions: userWrongQ,
      accuracyPercentage: userAccPer,
      finishedCards: req.body.finishedCards
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(
    _.pick(user, [
      "_id",
      "name",
      "email",
      "isAdmin",
      "points",
      "correctQuestions",
      "wrongQuestions",
      "accuracyPercentage",
      "finishedCards"
    ])
  );
});

module.exports = router;

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

  await user.findOne({ name: req.body.name });
  if (user) return res.status(400).send("This user name is already use.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

router.put("/:name", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ name: req.params.name });

  if (!user)
    return res.status(404).send("The user with the given name was not found.");

  user2 = await User.findOne({ name: req.body.name });
  if (user2) return res.status(400).send("This user name is already in use.");

  user2.name = req.body.name;
  await user2.save();

  res.send(
    _.pick(user2, [
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

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  user.correctQuestions = user.correctQuestions + req.body.correctQuestions;
  user.wrongQuestions = user.wrongQuestions + req.body.wrongQuestions;
  user.accuracyPercentage =
    (user.correctQuestions / (user.correctQuestions + user.wrongQuestions)) *
    100;

  await user.save();

  /* const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      points: req.body.points,
      correctQuestions: req.body.correctQuestions,
      wrongQuestions: req.body.wrongQuestions,
      accuracyPercentage: user.accuracyPercentage,
      finishedCards: req.body.finishedCards
    },
    { new: true }
  ); */

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

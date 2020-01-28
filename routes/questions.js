const { Question, validate } = require("../models/question");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const winston = require("winston");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const queryResult = await req.query;
  const questions = await Question.find(queryResult)
    .sort("topicID")
    .select("-answers._id -__v");
  res.send(questions);
});

router.get("/:topicID/:cardID/:questionID", [auth], async (req, res) => {
  const topicID = req.params.topicID;
  const cardID = req.params.cardID;
  const questionID = req.params.questionID;

  const question = await Question.find({
    topicID: topicID,
    cardID: cardID,
    questionID: questionID
  }).select("-answers._id -__v");

  if (!question)
    return res
      .status(404)
      .send("The question with the given ID was not found.");

  res.send(question);
});

router.get("/:topicID/:cardID", [auth], async (req, res) => {
  const topicID = req.params.topicID;
  const cardID = req.params.cardID;

  const question = await Question.find({
    topicID: topicID,
    cardID: cardID
  }).select("-answers._id -__v");

  if (!question)
    return res
      .status(404)
      .send("The question with the given ID was not found.");

  res.send(question);
});

router.get("/:topicID", [auth], async (req, res) => {
  const topicID = req.params.topicID;

  const question = await Question.find({
    topicID: topicID
  }).select("-answers._id -__v");

  if (!question)
    return res
      .status(404)
      .send("The question with the given ID was not found.");

  res.send(question);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const question = await Question.findById(req.params.id).select(
    "-answers._id -__v"
  );

  if (!question)
    return res
      .status(404)
      .send("The question with the given ID was not found.");

  res.send(question);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = new Question(
    _.pick(req.body, [
      "topicID",
      "cardID",
      "questionID",
      "question",
      "trainingQuestion",
      "answers"
    ])
  );

  await question.save();

  res.send(question);
});

router.patch("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      topicID: req.body.topicID,
      cardID: req.body.cardID,
      questionID: req.body.questionID,
      question: req.body.question,
      answers: req.body.answers
    },
    { new: true }
  );

  if (!question)
    return res
      .status(404)
      .send("The question with the given ID was not found.");

  res.send(question);
});

router.patch(
  "/:topicID/:cardID/:questionID",
  [auth, admin],
  async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const topicID = req.params.topicID;
    const cardID = req.params.cardID;
    const questionID = req.params.questionID;

    const question = await Question.findOneAndUpdate(
      { topicID: topicID, cardID: cardID, questionID: questionID },
      {
        $set: {
          topicID: req.body.topicID,
          cardID: req.body.cardID,
          questionID: req.body.questionID,
          question: req.body.question,
          answers: req.body.answers
        }
      },
      { new: true }
    );

    if (!question)
      return res
        .status(404)
        .send("The question with the given ID was not found.");

    res.send(question);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);

  if (!question)
    return res
      .status(404)
      .send("The question with the given ID was not found.");

  res.send(question);
});

module.exports = router;

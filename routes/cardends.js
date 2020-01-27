const { Cardend, validate } = require("../models/cardend");
const { User } = require("../models/user");
const { Question } = require("../models/question");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const validateObjectId = require("../middleware/validateObjectId");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(400).send("Invalid user.");

  if (req.user._id !== req.body.user_id)
    return res.status(401).send("Access denied");

  user.correctQuestions = user.correctQuestions + req.body.correctQuestions;
  user.wrongQuestions = user.wrongQuestions + req.body.wrongQuestions;
  user.accuracyPercentage =
    (user.correctQuestions / (user.correctQuestions + user.wrongQuestions)) *
    100;
  user.points = user.points + req.body.points;

  for (let i = 0; i < req.body.finishedCards.length; i++) {
    if (!_.some(user.finishedCards, req.body.finishedCards[i])) {
      user.finishedCards.push(req.body.finishedCards[i]);
    }
  }

  for (let i = 0; i < req.body.finishedQuestions.length; i++) {
    let question = {};
    question = await Question.findById(
      req.body.finishedQuestions[i].question_id
    );
    if (req.body.finishedQuestions[i].isCorrect) {
      question.correctNumber = question.correctNumber + 1;
      question.questionLevel =
        (question.correctNumber /
          (question.correctNumber + question.wrongNumber)) *
        100;
      await question.save();
    } else {
      question.wrongNumber = question.wrongNumber + 1;
      question.questionLevel =
        (question.correctNumber /
          (question.correctNumber + question.wrongNumber)) *
        100;
      await question.save();
    }
  }

  try {
    new Fawn.Task()
      .update(
        "users",
        { _id: user._id },
        {
          $set: {
            correctQuestions: user.correctQuestions,
            wrongQuestions: user.wrongQuestions,
            points: user.points,
            accuracyPercentage: user.accuracyPercentage,
            lastOnline: new Date(),
            finishedCards: user.finishedCards
          }
        }
      )
      .run();

    res.send(
      _.pick(user, [
        "_id",
        "name",
        "email",
        "isAdmin",
        "isGold",
        "lastOnline",
        "points",
        "correctQuestions",
        "wrongQuestions",
        "accuracyPercentage",
        "finishedCards"
      ])
    );
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

module.exports = router;

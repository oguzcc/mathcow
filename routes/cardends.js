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

  const user = await User.findById(req.body.userID);
  if (!user) return res.status(400).send("Invalid user.");

  /*   const question = await Question.findById(
    req.body.finishedQuestions.questionID
  );
  if (!question) return res.status(400).send("Invalid question."); */

  user.correctQuestions = user.correctQuestions + req.body.correctQuestions;
  user.wrongQuestions = user.wrongQuestions + req.body.wrongQuestions;
  user.accuracyPercentage =
    (user.correctQuestions / (user.correctQuestions + user.wrongQuestions)) *
    100;
  user.points = user.points + req.body.points;

  /* let cardend = new Cardend({
    user: {
      _id: user._id,
      points: user.points,
      lastOnline: user.lastOnline,
      correctQuestions: user.correctQuestions,
      wrongQuestions: user.wrongQuestions
    },
    question: {
      _id: question._id,
      correctNumber: question.correctNumber,
      wrongNumber: question.wrongNumber
    }
  }); */

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
            lastOnline: new Date()
          },
          $addToSet: {
            finishedCards: req.body.finishedCards[0]
          }
        }
      )
      /*       .update(
        "questions",
        { _id: question._id },
        {
          $inc: {
            correctNumber: +1
            correctNumber: question.correctNumber + req.body.correctNumber,
              wrongNumber: question.wrongNumber + req.body.wrongNumber,
              questionLevel:
                (question.correctNumber /
                  (question.correctNumber + question.wrongNumber)) *
                100 
          }
        }
      ) */
      .run();

    res.send(user);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

module.exports = router;

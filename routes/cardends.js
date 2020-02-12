const { validate } = require("../models/cardend");
const { User } = require("../models/user");
const { Question } = require("../models/question");
const auth = require("../middleware/auth");
const _ = require("lodash");
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

  const remainingTime = req.body.remainingTime;
  const bodyCQ = req.body.correctQuestions;
  const bodyWQ = req.body.wrongQuestions;
  const bodyFC0 = req.body.finishedCards[0];
  const topicID = bodyFC0.topicID;
  const cardID = req.body.finishedCards[0].cards[0].cardID;

  user.correctQuestions = user.correctQuestions + bodyCQ;
  user.wrongQuestions = user.wrongQuestions + bodyWQ;
  user.accuracyPercentage =
    (user.correctQuestions / (user.correctQuestions + user.wrongQuestions)) *
    100;
  user.points = user.points + remainingTime;
  user.coins = user.coins + remainingTime / 2;
  user.level = user.level + user.points;

  // if (!_.some(user.finishedCards, bodyFC0)) {
  //   user.finishedCards.push(bodyFC0);
  // }

  let iofc = _.findIndex(user.finishedCards, {
    topicID: topicID
  });

  let iofc2;

  if (iofc != -1) {
    iofc2 = _.findIndex(user.finishedCards[iofc].cards, {
      cardID: cardID
    });
    if (iofc2 == -1) {
      user.finishedCards[iofc].cards.push(bodyFC0.cards[0]);
      iofc2 = _.findIndex(user.finishedCards[iofc].cards, {
        cardID: cardID
      });
    }
  } else {
    user.finishedCards.push(bodyFC0);
    iofc = _.findIndex(user.finishedCards, {
      topicID: topicID
    });
    iofc2 = 0;
  }

  user.finishedCards[iofc].cards[iofc2].correctInCard =
    user.finishedCards[iofc].cards[iofc2].correctInCard + bodyCQ;
  user.finishedCards[iofc].cards[iofc2].wrongInCard =
    user.finishedCards[iofc].cards[iofc2].wrongInCard + bodyWQ;
  user.finishedCards[iofc].cards[iofc2].accuracyPercentageInCard =
    (user.finishedCards[iofc].cards[iofc2].correctInCard /
      (user.finishedCards[iofc].cards[iofc2].correctInCard +
        user.finishedCards[iofc].cards[iofc2].wrongInCard)) *
    100;

  user.finishedCards.sort(function(a, b) {
    return a.topicID - b.topicID;
  });

  /*  user.finishedCards[iofc].correctInCard =
    user.finishedCards[iofc].correctInCard + bodyCQ;
  user.finishedCards[iofc].wrongInCard =
    user.finishedCards[iofc].wrongInCard + bodyWQ;
  user.finishedCards[iofc].accuracyPercentageInCard =
    (user.finishedCards[iofc].correctInCard /
      (user.finishedCards[iofc].correctInCard +
        user.finishedCards[iofc].wrongInCard)) *
    100; */

  /* for (let i = 0; i < req.body.finishedCards.length; i++) {
    if (!_.some(user.finishedCards, req.body.finishedCards[i])) {
      user.finishedCards.push(req.body.finishedCards[i]);
    }
  } */

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
            coins: user.coins,
            level: user.level,
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
        "coins",
        "level",
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

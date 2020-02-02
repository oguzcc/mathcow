const { Question } = require("../models/question");
const { Rest, validate } = require("../models/rest");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.put("/:topicID/:cardID", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const topicID = req.params.topicID;
  const cardID = req.params.cardID;

  const rest = new Rest(_.pick(req.body, ["restQuestions"]));

  for (const q of rest.restQuestions) {
    if (topicID != q.topicID || cardID != q.cardID) {
      return res.status(400).send("topicID or cardID are not matched");
    }
  }

  for (const q of rest.restQuestions) {
    let questionID = q.questionID;

    question = await Question.findOneAndUpdate(
      { topicID: topicID, cardID: cardID, questionID: questionID },
      {
        $set: {
          topicID: q.topicID,
          cardID: q.cardID,
          questionID: q.questionID,
          trainingQuestion: q.trainingQuestion,
          question: q.question,
          layoutType: q.layoutType,
          answers: q.answers
        }
      },
      { new: true }
    );

    if (!question) {
      question = new Question({
        topicID: q.topicID,
        cardID: q.cardID,
        questionID: q.questionID,
        trainingQuestion: q.trainingQuestion,
        question: q.question,
        layoutType: q.layoutType,
        answers: q.answers
      });
      await question.save();
    }
  }

  res.send("completed successfully");
});

module.exports = router;

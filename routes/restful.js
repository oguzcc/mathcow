const { Question } = require("../models/question");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.put(
  "/:topicID/:cardID/:beginN/:endN",
  [auth, admin],
  async (req, res) => {
    const topicID = req.params.topicID;
    const cardID = req.params.cardID;
    const beginN = req.params.beginN;
    const endN = req.params.endN;

    let questionID = 101;
    const trainingQuestion = [];
    const layoutType = [0, 1, 2];

    const svgBegin =
      "<svg viewBox='0 0 64 64'><text x='32' y='40' text-anchor='middle' font-size='32' fill='#FFFFFF' font-family='RobotoMono'>";
    const svgEnd = "</text></svg>";
    for (let i = beginN; i < endN; i++) {
      for (let j = beginN; j < endN; j++) {
        let q00 = `${svgBegin}${i} + ${j}${svgEnd}`;
        let ii = parseInt(i);
        let jj = parseInt(j);
        let a00 = `${svgBegin}${ii + jj}${svgEnd}`;
        let a01 = `${svgBegin}${ii + jj - 2}${svgEnd}`;
        let a02 = `${svgBegin}${ii + jj - 1}${svgEnd}`;
        let a03 = `${svgBegin}${ii + jj + 1}${svgEnd}`;
        let a04 = `${svgBegin}${ii + jj + 2}${svgEnd}`;
        let a05 = `${svgBegin}${ii + jj + 3}${svgEnd}`;
        let answers = [
          { answer: a00, isCorrect: true },
          { answer: a01, isCorrect: false },
          { answer: a02, isCorrect: false },
          { answer: a03, isCorrect: false },
          { answer: a04, isCorrect: false },
          { answer: a05, isCorrect: false }
        ];

        question = await Question.findOneAndUpdate(
          { topicID: topicID, cardID: cardID, questionID: questionID },
          {
            $set: {
              topicID: topicID,
              cardID: cardID,
              questionID: questionID,
              question: q00,
              trainingQuestion: trainingQuestion,
              layoutType: layoutType,
              answers: answers
            }
          },
          { new: true }
        );

        if (!question) {
          question = new Question({
            topicID: topicID,
            cardID: cardID,
            questionID: questionID,
            question: q00,
            trainingQuestion: trainingQuestion,
            layoutType: layoutType,
            answers: answers
          });
          await question.save();
        }

        questionID++;
      }
    }
    res.send("finished");
  }
);

module.exports = router;

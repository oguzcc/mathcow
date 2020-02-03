const { Question } = require("../models/question");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.put(
  "/:typeQ/:topicID/:cardID/:begini/:endi/:beginj/:endj",
  [auth, admin],
  async (req, res) => {
    const typeQ = req.params.typeQ;
    const topicID = req.params.topicID;
    const cardID = req.params.cardID;
    const begini = req.params.begini;
    const endi = req.params.endi;
    const beginj = req.params.beginj;
    const endj = req.params.endj;

    let questionID = 101;
    const trainingQuestion = [];
    const layoutType = [0, 1, 2];

    let ii;
    let jj;
    let kk;
    let q00;
    let a00;
    let a01;
    let a02;
    let a03;
    let a04;
    let a05;
    let answers;
    let rand;

    const svgBegin =
      "<svg viewBox='0 0 64 64'><text x='32' y='40' text-anchor='middle' font-size='32' fill='#FFFFFF' font-family='RobotoMono'>";
    const svgEnd = "</text></svg>";
    for (let i = begini; i < endi; i++) {
      for (let j = beginj; j < endj; j++) {
        if (typeQ == 1) {
          // toplama -> a + b
          q00 = `${svgBegin}${i} + ${j}${svgEnd}`;
          ii = parseInt(i);
          jj = parseInt(j);
          a00 = `${svgBegin}${ii + jj}${svgEnd}`;
          a01 = `${svgBegin}${ii + jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii + jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii + jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii + jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii + jj + 3}${svgEnd}`;
        } else if (typeQ == 11) {
          // toplama -> a + b + c
          ii = Math.round(Math.random() * 10 + 1);
          jj = Math.round(Math.random() * 10 + 1);
          kk = Math.round(Math.random() * 10 + 1);
          q00 = `${svgBegin}${ii} + ${jj} + ${kk}${svgEnd}`;
          a00 = `${svgBegin}${ii + jj + kk}${svgEnd}`;
          a01 = `${svgBegin}${ii + jj + kk - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii + jj + kk - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii + jj + kk + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii + jj + kk + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii + jj + kk + 3}${svgEnd}`;
        } else if (typeQ == 12) {
          // toplama -> a + ? = c or ? + b = c
          rand = Math.random();
          ii = parseInt(i);
          jj = parseInt(j);
          if (rand < 0.5) {
            q00 = `${svgBegin}${i} + ? = ${ii + jj}${svgEnd}`;
          } else {
            q00 = `${svgBegin}? + ${i} = ${ii + jj}${svgEnd}`;
          }
          a00 = `${svgBegin}${jj}${svgEnd}`;
          a01 = `${svgBegin}${jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${jj + 3}${svgEnd}`;
        } else if (typeQ == 2) {
          // cikarma
          if (i > j) {
            q00 = `${svgBegin}${i} - ${j}${svgEnd}`;
            ii = parseInt(i);
            jj = parseInt(j);
            a00 = `${svgBegin}${ii - jj}${svgEnd}`;
            a01 = `${svgBegin}${ii - jj - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii - jj + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii - jj + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii - jj + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii - jj + 4}${svgEnd}`;
          } else {
            continue;
          }
        } else if (typeQ == 21) {
          // cikarma a - ? = c
          if (i > j) {
            ii = parseInt(i);
            jj = parseInt(j);
            q00 = `${svgBegin}${i} - ? = ${ii - jj}${svgEnd}`;
            a00 = `${svgBegin}${jj}${svgEnd}`;
            a01 = `${svgBegin}${jj - 1}${svgEnd}`;
            a02 = `${svgBegin}${jj + 1}${svgEnd}`;
            a03 = `${svgBegin}${jj + 2}${svgEnd}`;
            a04 = `${svgBegin}${jj + 3}${svgEnd}`;
            a05 = `${svgBegin}${jj + 4}${svgEnd}`;
          } else {
            continue;
          }
        } else if (typeQ == 22) {
          // cikarma ? - b = c
          if (i > j) {
            ii = parseInt(i);
            jj = parseInt(j);
            q00 = `${svgBegin}? - ${j} = ${ii - jj}${svgEnd}`;
            a00 = `${svgBegin}${ii}${svgEnd}`;
            a01 = `${svgBegin}${ii - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii + 4}${svgEnd}`;
          } else {
            continue;
          }
        } else if (typeQ == 3) {
          // carpma
          q00 = `${svgBegin}${j} x ${i}${svgEnd}`;
          ii = parseInt(i);
          jj = parseInt(j);
          a00 = `${svgBegin}${ii * jj}${svgEnd}`;
          a01 = `${svgBegin}${ii * jj - 1}${svgEnd}`;
          a02 = `${svgBegin}${ii * jj + 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * jj + 2}${svgEnd}`;
          a04 = `${svgBegin}${ii * jj + 3}${svgEnd}`;
          a05 = `${svgBegin}${ii * jj + 4}${svgEnd}`;
        }

        answers = [
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

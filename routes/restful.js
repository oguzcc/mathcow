const { Question } = require("../models/question");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.put(
  "/:typeQ/:layType/:topicID/:cardID/:begini/:endi/:beginj/:endj",
  [auth, admin],
  async (req, res) => {
    const typeQ = req.params.typeQ;
    const layoutType = req.params.layType;
    const topicID = req.params.topicID;
    const cardID = req.params.cardID;
    const begini = req.params.begini;
    const endi = req.params.endi;
    const beginj = req.params.beginj;
    const endj = req.params.endj;

    let questionID = 101;
    const trainingQuestion = [];

    let i;
    let j;
    let ii;
    let jj;
    let kk;

    let semanticQuestion;
    let semanticAnswer;
    let q00;
    let a00;
    let a01;
    let a02;
    let a03;
    let a04;
    let a05;
    let answers;
    let rand;
    let rand2;

    const svgBegin =
      "<svg viewBox='0 0 64 64'><text x='32' y='40' text-anchor='middle' font-size='32' fill='#FFFFFF' font-family='RobotoMono'>";
    const svgEnd = "</text></svg>";
    for (i = begini; i < endi; i++) {
      for (j = beginj; j < endj; j++) {
        if (typeQ == 10101) {
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
          semanticQuestion = `${i}+${j}`;
          semanticAnswer = `${ii + jj}`;
        } else if (typeQ == 10104) {
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
          semanticQuestion = `${ii}+${jj}+${kk}`;
          semanticAnswer = `${ii + jj + kk}`;
        } else if (typeQ == 10108) {
          // toplama -> a + ? = c or ? + b = c

          rand = Math.random();
          ii = parseInt(i);
          jj = parseInt(j);

          if (rand < 0.5) {
            q00 = `${svgBegin}${i} + ? = ${ii + jj}${svgEnd}`;
            a00 = `${svgBegin}${jj}${svgEnd}`;
            a01 = `${svgBegin}${jj - 2}${svgEnd}`;
            a02 = `${svgBegin}${jj - 1}${svgEnd}`;
            a03 = `${svgBegin}${jj + 1}${svgEnd}`;
            a04 = `${svgBegin}${jj + 2}${svgEnd}`;
            a05 = `${svgBegin}${jj + 3}${svgEnd}`;
            semanticQuestion = `${i}+?=${ii + jj}`;
            semanticAnswer = `${jj}`;
          } else {
            q00 = `${svgBegin}? + ${j} = ${ii + jj}${svgEnd}`;
            a00 = `${svgBegin}${ii}${svgEnd}`;
            a01 = `${svgBegin}${ii - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii + 3}${svgEnd}`;
            semanticQuestion = `?+${j}=${ii + jj}`;
            semanticAnswer = `${ii}`;
          }
        } else if (typeQ == 10105) {
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
            semanticQuestion = `${i}-${j}`;
            semanticAnswer = `${ii - jj}`;
          } else {
            continue;
          }
        } else if (typeQ == 10201) {
          // toplama -> a+(+b)
          q00 = `${svgBegin}${i}+(+${j})${svgEnd}`;
          ii = parseInt(i);
          jj = parseInt(j);
          a00 = `${svgBegin}${ii + jj}${svgEnd}`;
          a01 = `${svgBegin}${ii + jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii + jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii + jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii + jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii + jj + 3}${svgEnd}`;
          semanticQuestion = `${i}+(+${j})`;
          semanticAnswer = `${ii + jj}`;
        } else if (typeQ == 10202) {
          // toplama -> a+(-b)
          q00 = `${svgBegin}${i}+(-${j})${svgEnd}`;
          ii = parseInt(i);
          jj = parseInt(j);
          a00 = `${svgBegin}${ii - jj}${svgEnd}`;
          a01 = `${svgBegin}${ii - jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii - jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii - jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii - jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii - jj + 3}${svgEnd}`;
          semanticQuestion = `${i}+(-${j})`;
          semanticAnswer = `${ii - jj}`;
        } else if (typeQ == 10203) {
          // toplama -> a-(+b)
          q00 = `${svgBegin}${i}-(+${j})${svgEnd}`;
          ii = parseInt(i);
          jj = parseInt(j);
          a00 = `${svgBegin}${ii - jj}${svgEnd}`;
          a01 = `${svgBegin}${ii - jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii - jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii - jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii - jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii - jj + 3}${svgEnd}`;
          semanticQuestion = `${i}-(+${j})`;
          semanticAnswer = `${ii - jj}`;
        } else if (typeQ == 10204) {
          // toplama -> a-(-b)
          q00 = `${svgBegin}${i}-(-${j})${svgEnd}`;
          ii = parseInt(i);
          jj = parseInt(j);
          a00 = `${svgBegin}${ii + jj}${svgEnd}`;
          a01 = `${svgBegin}${ii + jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii + jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii + jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii + jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii + jj + 3}${svgEnd}`;
          semanticQuestion = `${i}-(-${j})`;
          semanticAnswer = `${ii + jj}`;
        } else if (typeQ == 10111) {
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
            semanticQuestion = `${i}-?=${ii - jj}`;
            semanticAnswer = `${jj}`;
          } else {
            continue;
          }
        } else if (typeQ == 10112) {
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
            semanticQuestion = `?-${j}=${ii - jj}`;
            semanticAnswer = `${ii}`;
          } else {
            continue;
          }
        } else if (typeQ == 10117) {
          // cikarma a +- b +- c
          ii = Math.round(Math.random() * 10 + 1);
          jj = Math.round(Math.random() * 10 + 1);
          kk = Math.round(Math.random() * 10 + 1);

          if (ii + jj > kk) {
            q00 = `${svgBegin}${ii} + ${jj} - ${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii + jj - kk}${svgEnd}`;
            a01 = `${svgBegin}${ii + jj - kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + jj - kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + jj - kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii + jj - kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii + jj - kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}+${jj}-${kk}`;
            semanticAnswer = `${ii + jj - kk}`;
          }
          if (ii > jj + kk) {
            q00 = `${svgBegin}${ii} - ${jj} - ${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii - jj - kk}${svgEnd}`;
            a01 = `${svgBegin}${ii - jj - kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii - jj - kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii - jj - kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii - jj - kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii - jj - kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}-${jj}-${kk}`;
            semanticAnswer = `${ii - jj - kk}`;
          }
        } else if (typeQ == 10118) {
          // cikarma a +- b +- c
          ii = Math.round(Math.random() * 10 + 11);
          jj = Math.round(Math.random() * 10 + 1);
          kk = Math.round(Math.random() * 10 + 1);

          if (ii + jj > kk) {
            q00 = `${svgBegin}${ii} + ${jj} - ${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii + jj - kk}${svgEnd}`;
            a01 = `${svgBegin}${ii + jj - kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + jj - kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + jj - kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii + jj - kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii + jj - kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}+${jj}-${kk}`;
            semanticAnswer = `${ii + jj - kk}`;
          }
          if (ii > jj + kk) {
            q00 = `${svgBegin}${ii} - ${jj} - ${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii - jj - kk}${svgEnd}`;
            a01 = `${svgBegin}${ii - jj - kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii - jj - kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii - jj - kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii - jj - kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii - jj - kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}-${jj}-${kk}`;
            semanticAnswer = `${ii - jj - kk}`;
          }
        } else if (typeQ == 10213) {
          // +-a +-b +-c

          rand = _.random(1, 2);

          ii = _.random(10, 20);
          jj = _.random(1, 9);
          kk = _.random(1, 9);

          if (rand == 1) {
            q00 = `${svgBegin}${ii}+(+${jj}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii + (jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii + (jj - kk) - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + (jj - kk) + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + (jj - kk) + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii + (jj - kk) + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii + (jj - kk) + 4}${svgEnd}`;
            semanticQuestion = `${ii}+(+${jj}-${kk})`;
            semanticAnswer = `${ii + jj - kk}`;
          }
          if (rand == 2) {
            q00 = `${svgBegin}${ii}-(+${jj}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii - (jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii - (jj - kk) - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii - (jj - kk) + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii - (jj - kk) + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii - (jj - kk) + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii - (jj - kk) + 4}${svgEnd}`;
            semanticQuestion = `${ii}-(+${jj}-${kk})`;
            semanticAnswer = `${ii - (jj - kk)}`;
          }
        } else if (typeQ == 10301) {
          // carpma

          ii = parseInt(i);
          jj = parseInt(j);

          if (ii == 2 || ii == 5 || ii == 10) {
            q00 = `${svgBegin}${i} x ${j}${svgEnd}`;
            a00 = `${svgBegin}${ii * jj}${svgEnd}`;
            a01 = `${svgBegin}${ii * jj - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * jj - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * jj + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * jj + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * jj + 3}${svgEnd}`;
            semanticQuestion = `${i}*${j}`;
            semanticAnswer = `${ii * jj}`;
          } else {
            continue;
          }
        } else if (typeQ == 10302) {
          // carpma

          ii = parseInt(i);
          jj = parseInt(j);

          if (ii > 1 && ii < 6) {
            q00 = `${svgBegin}${i} x ${j}${svgEnd}`;
            a00 = `${svgBegin}${ii * jj}${svgEnd}`;
            a01 = `${svgBegin}${ii * jj - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * jj - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * jj + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * jj + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * jj + 3}${svgEnd}`;
            semanticQuestion = `${i}*${j}`;
            semanticAnswer = `${ii * jj}`;
          } else {
            continue;
          }
        } else if (typeQ == 10303) {
          // carpma

          ii = parseInt(i);
          jj = parseInt(j);

          q00 = `${svgBegin}${i} x ${j}${svgEnd}`;
          a00 = `${svgBegin}${ii * jj}${svgEnd}`;
          a01 = `${svgBegin}${ii * jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii * jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * jj + 3}${svgEnd}`;
          semanticQuestion = `${i}*${j}`;
          semanticAnswer = `${ii * jj}`;
        } else if (typeQ == 10305) {
          // carpma

          ii = parseInt(i);
          jj = parseInt(j);

          q00 = `${svgBegin}${ii * jj} / ${i}${svgEnd}`;
          a00 = `${svgBegin}${(ii * jj) / ii}${svgEnd}`;
          a01 = `${svgBegin}${(ii * jj) / ii - 1}${svgEnd}`;
          a02 = `${svgBegin}${(ii * jj) / ii + 1}${svgEnd}`;
          a03 = `${svgBegin}${(ii * jj) / ii + 2}${svgEnd}`;
          a04 = `${svgBegin}${(ii * jj) / ii + 3}${svgEnd}`;
          a05 = `${svgBegin}${(ii * jj) / ii + 4}${svgEnd}`;
          semanticQuestion = `${ii * jj}/${i}`;
          semanticAnswer = `${(ii * jj) / ii}`;
        } else if (typeQ == 10306) {
          // toplama -> a + ? = c or ? + b = c

          rand = _.random(0, 1);
          ii = parseInt(i);
          jj = parseInt(j);

          if (rand == 0) {
            q00 = `${svgBegin}${i} x ? = ${ii * jj}${svgEnd}`;
            a00 = `${svgBegin}${jj}${svgEnd}`;
            a01 = `${svgBegin}${jj - 2}${svgEnd}`;
            a02 = `${svgBegin}${jj - 1}${svgEnd}`;
            a03 = `${svgBegin}${jj + 1}${svgEnd}`;
            a04 = `${svgBegin}${jj + 2}${svgEnd}`;
            a05 = `${svgBegin}${jj + 3}${svgEnd}`;
            semanticQuestion = `${i}*?=${ii * jj}`;
            semanticAnswer = `${jj}`;
          } else {
            q00 = `${svgBegin}? x ${j} = ${ii * jj}${svgEnd}`;
            a00 = `${svgBegin}${ii}${svgEnd}`;
            a01 = `${svgBegin}${ii - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii + 3}${svgEnd}`;
            semanticQuestion = `?*${j}=${ii * jj}`;
            semanticAnswer = `${ii}`;
          }
        } else if (typeQ == 10307) {
          // carpma
          rand = _.random(2, 10);
          ii = parseInt(i);
          jj = parseInt(j);

          q00 = `${svgBegin}${i}x${rand} + ${j}${svgEnd}`;
          a00 = `${svgBegin}${ii * rand + jj}${svgEnd}`;
          a01 = `${svgBegin}${ii * rand + jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii * rand + jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * rand + jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * rand + jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * rand + jj + 3}${svgEnd}`;
          semanticQuestion = `${i}*${rand}+${j}`;
          semanticAnswer = `${ii * rand + jj}`;
        } else if (typeQ == 10308) {
          // carpma
          rand = _.random(2, 10);
          ii = parseInt(i);
          jj = parseInt(j);

          q00 = `${svgBegin}${i} + ${j}x${rand}${svgEnd}`;
          a00 = `${svgBegin}${ii + rand * jj}${svgEnd}`;
          a01 = `${svgBegin}${ii + rand * jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii + rand * jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii + rand * jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii + rand * jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii + rand * jj + 3}${svgEnd}`;
          semanticQuestion = `${i}+${rand}*${j}`;
          semanticAnswer = `${ii + rand * jj}`;
        } else if (typeQ == 10309) {
          // carpma
          rand = _.random(2, 10);
          ii = parseInt(i);
          jj = parseInt(j);

          q00 = `${svgBegin}${i}x${rand} - ${j}${svgEnd}`;
          a00 = `${svgBegin}${ii * rand - jj}${svgEnd}`;
          a01 = `${svgBegin}${ii * rand - jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii * rand - jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * rand - jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * rand - jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * rand - jj + 3}${svgEnd}`;
          semanticQuestion = `${i}*${rand}-${j}`;
          semanticAnswer = `${ii * rand - jj}`;
        } else if (typeQ == 10310) {
          // carpma
          rand = _.random(2, 10);
          rand2 = _.random(2, 10);
          ii = parseInt(i);
          jj = parseInt(j);

          q00 = `${svgBegin}${i}x${rand} + ${j}x${rand2}${svgEnd}`;
          a00 = `${svgBegin}${ii * rand + jj * rand2}${svgEnd}`;
          a01 = `${svgBegin}${ii * rand + jj * rand2}${svgEnd}`;
          a02 = `${svgBegin}${ii * rand + jj * rand2 - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * rand + jj * rand2 + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * rand + jj * rand2 + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * rand + jj * rand2 + 3}${svgEnd}`;
          semanticQuestion = `${i}*${rand}+${j}*${rand2}`;
          semanticAnswer = `${ii * rand + jj * rand2}`;
        } else if (typeQ == 10311) {
          // carpma
          rand = _.random(2, 10);
          rand2 = _.random(2, 10);
          ii = parseInt(i);
          jj = parseInt(j);

          q00 = `${svgBegin}${i}x${rand} - ${j}x${rand2}${svgEnd}`;
          a00 = `${svgBegin}${ii * rand - jj * rand2}${svgEnd}`;
          a01 = `${svgBegin}${ii * rand - jj * rand2}${svgEnd}`;
          a02 = `${svgBegin}${ii * rand - jj * rand2 - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * rand - jj * rand2 + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * rand - jj * rand2 + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * rand - jj * rand2 + 3}${svgEnd}`;
          semanticQuestion = `${i}*${rand}-${j}*${rand2}`;
          semanticAnswer = `${ii * rand - jj * rand2}`;
        } else if (typeQ == 10312) {
          // toplama -> +a x -b  or -a x +b

          rand = _.random(0, 1);
          ii = parseInt(i);
          jj = parseInt(j);

          if (rand == 0) {
            q00 = `${svgBegin}(+${i})x(-${j})${svgEnd}`;
            a00 = `${svgBegin}${+ii * -jj}${svgEnd}`;
            a01 = `${svgBegin}${+ii * -jj - 2}${svgEnd}`;
            a02 = `${svgBegin}${+ii * -jj - 1}${svgEnd}`;
            a03 = `${svgBegin}${+ii * -jj + 1}${svgEnd}`;
            a04 = `${svgBegin}${+ii * -jj + 2}${svgEnd}`;
            a05 = `${svgBegin}${+ii * -jj + 3}${svgEnd}`;
            semanticQuestion = `(+${i})*(-${j})`;
            semanticAnswer = `${+ii * -jj}`;
          } else {
            q00 = `${svgBegin}(-${i})x(+${j})${svgEnd}`;
            a00 = `${svgBegin}${-ii * +jj}${svgEnd}`;
            a01 = `${svgBegin}${-ii * +jj - 2}${svgEnd}`;
            a02 = `${svgBegin}${-ii * +jj - 1}${svgEnd}`;
            a03 = `${svgBegin}${-ii * +jj + 1}${svgEnd}`;
            a04 = `${svgBegin}${-ii * +jj + 2}${svgEnd}`;
            a05 = `${svgBegin}${-ii * +jj + 3}${svgEnd}`;
            semanticQuestion = `(-${i})*(+${j})`;
            semanticAnswer = `${-ii * +jj}`;
          }
        } else if (typeQ == 10313) {
          // carpma -> -a x -b

          ii = parseInt(i);
          jj = parseInt(j);

          q00 = `${svgBegin}(-${i})x(-${j})${svgEnd}`;
          a00 = `${svgBegin}${-ii * -jj}${svgEnd}`;
          a01 = `${svgBegin}${-ii * -jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${-ii * -jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${-ii * -jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${-ii * -jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${-ii * -jj + 3}${svgEnd}`;
          semanticQuestion = `(-${i})*(-${j})`;
          semanticAnswer = `${-ii * -jj}`;
        } else if (typeQ == 10314) {
          // toplama -> +a x -b  or -a x +b

          rand = _.random(1, 4);
          ii = parseInt(i);
          jj = parseInt(j);
          kk = _.random(2, 11);

          if (rand == 1) {
            q00 = `${svgBegin}${i}x(+${j}+${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii * (jj + kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii * (jj + kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * (jj + kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * (jj + kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * (jj + kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * (jj + kk) + 3}${svgEnd}`;
            semanticQuestion = `${i}x(${j}+${kk})`;
            semanticAnswer = `${ii * (jj + kk)}`;
          } else if (rand == 2) {
            q00 = `${svgBegin}${i}x(+${j}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii * (jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii * (jj - kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * (jj - kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * (jj - kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * (jj - kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * (jj - kk) + 3}${svgEnd}`;
            semanticQuestion = `${i}x(${j}-${kk})`;
            semanticAnswer = `${ii * (jj - kk)}`;
          } else if (rand == 3) {
            q00 = `${svgBegin}${i}x(-${j}+${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii * (-jj + kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii * (-jj + kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * (-jj + kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * (-jj + kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * (-jj + kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * (-jj + kk) + 3}${svgEnd}`;
            semanticQuestion = `${i}x(-${j}+${kk})`;
            semanticAnswer = `${ii * (-jj + kk)}`;
          } else if (rand == 4) {
            q00 = `${svgBegin}${i}x(-${j}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii * (-jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii * (-jj - kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * (-jj - kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * (-jj - kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * (-jj - kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * (-jj - kk) + 3}${svgEnd}`;
            semanticQuestion = `${i}x(-${j}-${kk})`;
            semanticAnswer = `${ii * (-jj - kk)}`;
          }
        } else if (typeQ == 10315) {
          // toplama -> +a x -b  or -a x +b

          rand = _.random(1, 4);
          ii = parseInt(i);
          jj = parseInt(j);
          kk = _.random(2, 11);

          if (rand == 1) {
            q00 = `${svgBegin}-${i}x(+${j}+${kk})${svgEnd}`;
            a00 = `${svgBegin}${-ii * (jj + kk)}${svgEnd}`;
            a01 = `${svgBegin}${-ii * (jj + kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${-ii * (jj + kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${-ii * (jj + kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${-ii * (jj + kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${-ii * (jj + kk) + 3}${svgEnd}`;
            semanticQuestion = `-${i}x(${j}+${kk})`;
            semanticAnswer = `${-ii * (jj + kk)}`;
          } else if (rand == 2) {
            q00 = `${svgBegin}-${i}x(+${j}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${-ii * (jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${-ii * (jj - kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${-ii * (jj - kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${-ii * (jj - kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${-ii * (jj - kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${-ii * (jj - kk) + 3}${svgEnd}`;
            semanticQuestion = `-${i}x(${j}-${kk})`;
            semanticAnswer = `${-ii * (jj - kk)}`;
          } else if (rand == 3) {
            q00 = `${svgBegin}-${i}x(-${j}+${kk})${svgEnd}`;
            a00 = `${svgBegin}${-ii * (-jj + kk)}${svgEnd}`;
            a01 = `${svgBegin}${-ii * (-jj + kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${-ii * (-jj + kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${-ii * (-jj + kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${-ii * (-jj + kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${-ii * (-jj + kk) + 3}${svgEnd}`;
            semanticQuestion = `-${i}x(-${j}+${kk})`;
            semanticAnswer = `${-ii * (-jj + kk)}`;
          } else if (rand == 4) {
            q00 = `${svgBegin}-${i}x(-${j}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${-ii * (-jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${-ii * (-jj - kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${-ii * (-jj - kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${-ii * (-jj - kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${-ii * (-jj - kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${-ii * (-jj - kk) + 3}${svgEnd}`;
            semanticQuestion = `-${i}x(-${j}-${kk})`;
            semanticAnswer = `${-ii * (-jj - kk)}`;
          }
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
              layoutType: layoutType,
              semanticQuestion: semanticQuestion,
              semanticAnswer: semanticAnswer,
              question: q00,
              trainingQuestion: trainingQuestion,
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
            layoutType: layoutType,
            semanticQuestion: semanticQuestion,
            semanticAnswer: semanticAnswer,
            question: q00,
            trainingQuestion: trainingQuestion,
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

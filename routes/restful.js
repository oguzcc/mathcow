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
    let c;
    let c2;

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
        //
        if (typeQ == 14101) {
          // 1,2,3...
          ii = parseInt(i);
          c = parseInt(j);
          if (c == 1 || c == 2 || c == 5 || c == 10) {
            q00 = `${svgBegin}${ii},${ii + c},${ii + c * 2},?${svgEnd}`;
            a00 = `${svgBegin}${ii + c * 3}${svgEnd}`;
            a01 = `${svgBegin}${ii + c * 3 + 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + c * 3 + 2}${svgEnd}`;
            a03 = `${svgBegin}${ii + c * 3 + 3}${svgEnd}`;
            a04 = `${svgBegin}${ii + c * 3 + 4}${svgEnd}`;
            a05 = `${svgBegin}${ii + c * 3 + 5}${svgEnd}`;
            semanticQuestion = `${ii},${ii + c},${ii + c * 2},?`;
            semanticAnswer = `${ii + c * 3}`;
          } else {
            continue;
          }
          //
        } else if (typeQ == 14102) {
          // 1,2,3...
          ii = parseInt(i);
          c = parseInt(j);
          q00 = `${svgBegin}${ii},${ii + c},${ii + c * 2},?${svgEnd}`;
          a00 = `${svgBegin}${ii + c * 3}${svgEnd}`;
          a01 = `${svgBegin}${ii + c * 3 + 1}${svgEnd}`;
          a02 = `${svgBegin}${ii + c * 3 + 2}${svgEnd}`;
          a03 = `${svgBegin}${ii + c * 3 + 3}${svgEnd}`;
          a04 = `${svgBegin}${ii + c * 3 + 4}${svgEnd}`;
          a05 = `${svgBegin}${ii + c * 3 + 5}${svgEnd}`;
          semanticQuestion = `${ii},${ii + c},${ii + c * 2},?`;
          semanticAnswer = `${ii + c * 3}`;
          //
        } else if (typeQ == 14103) {
          // 1,2,3...
          ii = parseInt(i);
          c = parseInt(j);
          if (c == 1 || c == 2 || c == 5 || c == 10) {
            q00 = `${svgBegin}${ii + c * 3},${ii + c * 2},${ii + c},?${svgEnd}`;
            a00 = `${svgBegin}${ii}${svgEnd}`;
            a01 = `${svgBegin}${ii - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii + 4}${svgEnd}`;
            semanticQuestion = `${ii + c * 3},${ii + c * 2},${ii + c},?`;
            semanticAnswer = `${ii}`;
          } else {
            continue;
          }
          //
        } else if (typeQ == 14104) {
          // 1,2,3...
          ii = parseInt(i);
          c = parseInt(j);
          q00 = `${svgBegin}${ii + c * 3},${ii + c * 2},${ii + c},?${svgEnd}`;
          a00 = `${svgBegin}${ii}${svgEnd}`;
          a01 = `${svgBegin}${ii - 1}${svgEnd}`;
          a02 = `${svgBegin}${ii + 1}${svgEnd}`;
          a03 = `${svgBegin}${ii + 2}${svgEnd}`;
          a04 = `${svgBegin}${ii + 3}${svgEnd}`;
          a05 = `${svgBegin}${ii + 4}${svgEnd}`;
          semanticQuestion = `${ii + c * 3},${ii + c * 2},${ii + c},?`;
          semanticAnswer = `${ii}`;
          //
        } else if (typeQ == 15101) {
          // a+b
          q00 = `${svgBegin}${i}+${j}${svgEnd}`;
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
          //
        } else if (typeQ == 15104) {
          // a+b+c
          ii = _.random(1, 9);
          jj = _.random(1, 9);
          kk = _.random(1, 9);
          q00 = `${svgBegin}${ii}+${jj}+${kk}${svgEnd}`;
          a00 = `${svgBegin}${ii + jj + kk}${svgEnd}`;
          a01 = `${svgBegin}${ii + jj + kk - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii + jj + kk - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii + jj + kk + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii + jj + kk + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii + jj + kk + 3}${svgEnd}`;
          semanticQuestion = `${ii}+${jj}+${kk}`;
          semanticAnswer = `${ii + jj + kk}`;
          //
        } else if (typeQ == 15105) {
          // a-b
          if (i > j) {
            q00 = `${svgBegin}${i}-${j}${svgEnd}`;
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
          //
        } else if (typeQ == 15108) {
          // a+?=c or ?+b=c
          rand = _.random(0, 1);
          ii = parseInt(i);
          jj = parseInt(j);
          if (rand == 0) {
            q00 = `${svgBegin}${i}+?=${ii + jj}${svgEnd}`;
            a00 = `${svgBegin}${jj}${svgEnd}`;
            a01 = `${svgBegin}${jj - 2}${svgEnd}`;
            a02 = `${svgBegin}${jj - 1}${svgEnd}`;
            a03 = `${svgBegin}${jj + 1}${svgEnd}`;
            a04 = `${svgBegin}${jj + 2}${svgEnd}`;
            a05 = `${svgBegin}${jj + 3}${svgEnd}`;
            semanticQuestion = `${i}+?=${ii + jj}`;
            semanticAnswer = `${jj}`;
          } else {
            q00 = `${svgBegin}?+${j}=${ii + jj}${svgEnd}`;
            a00 = `${svgBegin}${ii}${svgEnd}`;
            a01 = `${svgBegin}${ii - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii + 3}${svgEnd}`;
            semanticQuestion = `?+${j}=${ii + jj}`;
            semanticAnswer = `${ii}`;
          }
          //
        } else if (typeQ == 15111) {
          // cikarma a-?=c
          if (i > j) {
            ii = parseInt(i);
            jj = parseInt(j);
            q00 = `${svgBegin}${i}-?=${ii - jj}${svgEnd}`;
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
          //
        } else if (typeQ == 15112) {
          // ?-b=c
          if (i > j) {
            ii = parseInt(i);
            jj = parseInt(j);
            q00 = `${svgBegin}?-${j}=${ii - jj}${svgEnd}`;
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
          //
        } else if (typeQ == 15117) {
          // a+b-c or a-b+c
          rand = _.random(0, 1);
          ii = _.random(1, 9);
          jj = _.random(1, 9);
          kk = _.random(1, 9);
          if (ii + jj > kk && rand == 0) {
            q00 = `${svgBegin}${ii}+${jj}-${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii + jj - kk}${svgEnd}`;
            a01 = `${svgBegin}${ii + jj - kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + jj - kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + jj - kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii + jj - kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii + jj - kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}+${jj}-${kk}`;
            semanticAnswer = `${ii + jj - kk}`;
          } else if (ii + kk > jj && rand == 1) {
            q00 = `${svgBegin}${ii}-${jj}+${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii - jj + kk}${svgEnd}`;
            a01 = `${svgBegin}${ii - jj + kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii - jj + kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii - jj + kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii - jj + kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii - jj + kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}-${jj}+${kk}`;
            semanticAnswer = `${ii - jj + kk}`;
          } else {
            continue;
          }
          //
        } else if (typeQ == 15118) {
          // a+b-c or a-b+c or a-b-c
          rand = _.random(0, 2);
          ii = _.random(10, 20);
          jj = _.random(1, 9);
          kk = _.random(1, 9);
          if (ii + jj > kk && rand == 0) {
            q00 = `${svgBegin}${ii}+${jj}-${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii + jj - kk}${svgEnd}`;
            a01 = `${svgBegin}${ii + jj - kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + jj - kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + jj - kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii + jj - kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii + jj - kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}+${jj}-${kk}`;
            semanticAnswer = `${ii + jj - kk}`;
          } else if (ii + kk > jj && rand == 1) {
            q00 = `${svgBegin}${ii}-${jj}+${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii - jj + kk}${svgEnd}`;
            a01 = `${svgBegin}${ii - jj + kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii - jj + kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii - jj + kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii - jj + kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii - jj + kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}-${jj}+${kk}`;
            semanticAnswer = `${ii - jj + kk}`;
          } else if (ii > jj + kk && rand == 2) {
            q00 = `${svgBegin}${ii}-${jj}-${kk}${svgEnd}`;
            a00 = `${svgBegin}${ii - jj - kk}${svgEnd}`;
            a01 = `${svgBegin}${ii - jj - kk - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii - jj - kk + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii - jj - kk + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii - jj - kk + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii - jj - kk + 4}${svgEnd}`;
            semanticQuestion = `${ii}-${jj}-${kk}`;
            semanticAnswer = `${ii - jj - kk}`;
          } else {
            continue;
          }
          //
        } else if (typeQ == 16101) {
          // a+(+b)
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
          //
        } else if (typeQ == 16102) {
          // a+(-b)
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
          //
        } else if (typeQ == 16103) {
          // a-(+b)
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
          //
        } else if (typeQ == 16104) {
          // a-(-b)
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
          //
        } else if (typeQ == 16106) {
          // -a-b
          q00 = `${svgBegin}${i}-${j}${svgEnd}`;
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

          //
        } else if (typeQ == 16107) {
          // -a+b
          q00 = `${svgBegin}${i}+${j}${svgEnd}`;
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
          //
        } else if (typeQ == 16113) {
          // a+(+b-c)
          rand = _.random(0, 1);
          ii = parseInt(i);
          jj = _.random(1, 9);
          kk = _.random(1, 9);
          if (rand == 0) {
            q00 = `${svgBegin}${ii}+(+${jj}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii + (jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii + (jj - kk) - 1}${svgEnd}`;
            a02 = `${svgBegin}${ii + (jj - kk) + 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + (jj - kk) + 2}${svgEnd}`;
            a04 = `${svgBegin}${ii + (jj - kk) + 3}${svgEnd}`;
            a05 = `${svgBegin}${ii + (jj - kk) + 4}${svgEnd}`;
            semanticQuestion = `${ii}+(+${jj}-${kk})`;
            semanticAnswer = `${ii + jj - kk}`;
          } else {
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
          //
        } else if (typeQ == 17101) {
          // axb
          ii = parseInt(i);
          jj = parseInt(j);
          if (ii == 2 || ii == 5 || ii == 10) {
            q00 = `${svgBegin}${i}x${j}${svgEnd}`;
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
          //
        } else if (typeQ == 17102) {
          // axb
          ii = parseInt(i);
          jj = parseInt(j);
          if (ii > 1 && ii < 6) {
            q00 = `${svgBegin}${i}x${j}${svgEnd}`;
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
          //
        } else if (typeQ == 17103) {
          // axb
          ii = parseInt(i);
          jj = parseInt(j);
          q00 = `${svgBegin}${i}x${j}${svgEnd}`;
          a00 = `${svgBegin}${ii * jj}${svgEnd}`;
          a01 = `${svgBegin}${ii * jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii * jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * jj + 3}${svgEnd}`;
          semanticQuestion = `${i}*${j}`;
          semanticAnswer = `${ii * jj}`;
          //
        } else if (typeQ == 17105) {
          // a/b
          ii = parseInt(i);
          jj = parseInt(j);
          q00 = `${svgBegin}${ii * jj}/${i}${svgEnd}`;
          a00 = `${svgBegin}${(ii * jj) / ii}${svgEnd}`;
          a01 = `${svgBegin}${(ii * jj) / ii - 1}${svgEnd}`;
          a02 = `${svgBegin}${(ii * jj) / ii + 1}${svgEnd}`;
          a03 = `${svgBegin}${(ii * jj) / ii + 2}${svgEnd}`;
          a04 = `${svgBegin}${(ii * jj) / ii + 3}${svgEnd}`;
          a05 = `${svgBegin}${(ii * jj) / ii + 4}${svgEnd}`;
          semanticQuestion = `${ii * jj}/${i}`;
          semanticAnswer = `${(ii * jj) / ii}`;
          //
        } else if (typeQ == 17106) {
          // a+?=c or ?+b=c
          rand = _.random(0, 1);
          ii = parseInt(i);
          jj = parseInt(j);
          if (rand == 0) {
            q00 = `${svgBegin}${i}x?=${ii * jj}${svgEnd}`;
            a00 = `${svgBegin}${jj}${svgEnd}`;
            a01 = `${svgBegin}${jj - 2}${svgEnd}`;
            a02 = `${svgBegin}${jj - 1}${svgEnd}`;
            a03 = `${svgBegin}${jj + 1}${svgEnd}`;
            a04 = `${svgBegin}${jj + 2}${svgEnd}`;
            a05 = `${svgBegin}${jj + 3}${svgEnd}`;
            semanticQuestion = `${i}*?=${ii * jj}`;
            semanticAnswer = `${jj}`;
          } else {
            q00 = `${svgBegin}?x${j}=${ii * jj}${svgEnd}`;
            a00 = `${svgBegin}${ii}${svgEnd}`;
            a01 = `${svgBegin}${ii - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii + 3}${svgEnd}`;
            semanticQuestion = `?*${j}=${ii * jj}`;
            semanticAnswer = `${ii}`;
          }
          //
        } else if (typeQ == 17107) {
          // axb+c
          rand = _.random(2, 9);
          ii = parseInt(i);
          jj = parseInt(j);
          q00 = `${svgBegin}${i}x${rand}+${j}${svgEnd}`;
          a00 = `${svgBegin}${ii * rand + jj}${svgEnd}`;
          a01 = `${svgBegin}${ii * rand + jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii * rand + jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * rand + jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * rand + jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * rand + jj + 3}${svgEnd}`;
          semanticQuestion = `${i}*${rand}+${j}`;
          semanticAnswer = `${ii * rand + jj}`;
          //
        } else if (typeQ == 17108) {
          // a+bxc
          rand = _.random(2, 9);
          ii = parseInt(i);
          jj = parseInt(j);
          q00 = `${svgBegin}${i}+${j}x${rand}${svgEnd}`;
          a00 = `${svgBegin}${ii + rand * jj}${svgEnd}`;
          a01 = `${svgBegin}${ii + rand * jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii + rand * jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii + rand * jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii + rand * jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii + rand * jj + 3}${svgEnd}`;
          semanticQuestion = `${i}+${rand}*${j}`;
          semanticAnswer = `${ii + rand * jj}`;
          //
        } else if (typeQ == 17109) {
          // axb-c
          rand = _.random(2, 9);
          ii = parseInt(i);
          jj = parseInt(j);
          q00 = `${svgBegin}${i}x${rand}-${j}${svgEnd}`;
          a00 = `${svgBegin}${ii * rand - jj}${svgEnd}`;
          a01 = `${svgBegin}${ii * rand - jj - 2}${svgEnd}`;
          a02 = `${svgBegin}${ii * rand - jj - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * rand - jj + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * rand - jj + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * rand - jj + 3}${svgEnd}`;
          semanticQuestion = `${i}*${rand}-${j}`;
          semanticAnswer = `${ii * rand - jj}`;
          //
        } else if (typeQ == 17110) {
          // axb+cxd
          rand = _.random(2, 9);
          rand2 = _.random(2, 9);
          ii = parseInt(i);
          jj = parseInt(j);
          q00 = `${svgBegin}${i}x${rand}+${j}x${rand2}${svgEnd}`;
          a00 = `${svgBegin}${ii * rand + jj * rand2}${svgEnd}`;
          a01 = `${svgBegin}${ii * rand + jj * rand2}${svgEnd}`;
          a02 = `${svgBegin}${ii * rand + jj * rand2 - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * rand + jj * rand2 + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * rand + jj * rand2 + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * rand + jj * rand2 + 3}${svgEnd}`;
          semanticQuestion = `${i}*${rand}+${j}*${rand2}`;
          semanticAnswer = `${ii * rand + jj * rand2}`;
          //
        } else if (typeQ == 17111) {
          // axb-cxd
          rand = _.random(2, 9);
          rand2 = _.random(2, 9);
          ii = parseInt(i);
          jj = parseInt(j);
          q00 = `${svgBegin}${i}x${rand}-${j}x${rand2}${svgEnd}`;
          a00 = `${svgBegin}${ii * rand - jj * rand2}${svgEnd}`;
          a01 = `${svgBegin}${ii * rand - jj * rand2}${svgEnd}`;
          a02 = `${svgBegin}${ii * rand - jj * rand2 - 1}${svgEnd}`;
          a03 = `${svgBegin}${ii * rand - jj * rand2 + 1}${svgEnd}`;
          a04 = `${svgBegin}${ii * rand - jj * rand2 + 2}${svgEnd}`;
          a05 = `${svgBegin}${ii * rand - jj * rand2 + 3}${svgEnd}`;
          semanticQuestion = `${i}*${rand}-${j}*${rand2}`;
          semanticAnswer = `${ii * rand - jj * rand2}`;
          //
        } else if (typeQ == 17112) {
          // (+a)x(-b) or (-a)x(+b)
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
          //
        } else if (typeQ == 17113) {
          // (-a)x(-b)
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
          //
        } else if (typeQ == 17114) {
          // ax(+b+c) or ax(+b-c) or ax(-b+c) or ax(-b-c)
          rand = _.random(0, 3);
          ii = parseInt(i);
          jj = parseInt(j);
          kk = _.random(2, 9);
          if (rand == 0) {
            q00 = `${svgBegin}${i}x(+${j}+${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii * (jj + kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii * (jj + kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * (jj + kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * (jj + kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * (jj + kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * (jj + kk) + 3}${svgEnd}`;
            semanticQuestion = `${i}x(${j}+${kk})`;
            semanticAnswer = `${ii * (jj + kk)}`;
          } else if (rand == 1) {
            q00 = `${svgBegin}${i}x(+${j}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii * (jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii * (jj - kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * (jj - kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * (jj - kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * (jj - kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * (jj - kk) + 3}${svgEnd}`;
            semanticQuestion = `${i}x(${j}-${kk})`;
            semanticAnswer = `${ii * (jj - kk)}`;
          } else if (rand == 2) {
            q00 = `${svgBegin}${i}x(-${j}+${kk})${svgEnd}`;
            a00 = `${svgBegin}${ii * (-jj + kk)}${svgEnd}`;
            a01 = `${svgBegin}${ii * (-jj + kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${ii * (-jj + kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${ii * (-jj + kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${ii * (-jj + kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${ii * (-jj + kk) + 3}${svgEnd}`;
            semanticQuestion = `${i}x(-${j}+${kk})`;
            semanticAnswer = `${ii * (-jj + kk)}`;
          } else if (rand == 3) {
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
          //
        } else if (typeQ == 17115) {
          // -ax(+b+c) or -ax(+b-c) or -ax(-b+c) or -ax(-b-c)
          rand = _.random(0, 3);
          ii = parseInt(i);
          jj = parseInt(j);
          kk = _.random(2, 9);
          if (rand == 0) {
            q00 = `${svgBegin}-${i}x(+${j}+${kk})${svgEnd}`;
            a00 = `${svgBegin}${-ii * (jj + kk)}${svgEnd}`;
            a01 = `${svgBegin}${-ii * (jj + kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${-ii * (jj + kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${-ii * (jj + kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${-ii * (jj + kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${-ii * (jj + kk) + 3}${svgEnd}`;
            semanticQuestion = `-${i}x(${j}+${kk})`;
            semanticAnswer = `${-ii * (jj + kk)}`;
          } else if (rand == 1) {
            q00 = `${svgBegin}-${i}x(+${j}-${kk})${svgEnd}`;
            a00 = `${svgBegin}${-ii * (jj - kk)}${svgEnd}`;
            a01 = `${svgBegin}${-ii * (jj - kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${-ii * (jj - kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${-ii * (jj - kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${-ii * (jj - kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${-ii * (jj - kk) + 3}${svgEnd}`;
            semanticQuestion = `-${i}x(${j}-${kk})`;
            semanticAnswer = `${-ii * (jj - kk)}`;
          } else if (rand == 2) {
            q00 = `${svgBegin}-${i}x(-${j}+${kk})${svgEnd}`;
            a00 = `${svgBegin}${-ii * (-jj + kk)}${svgEnd}`;
            a01 = `${svgBegin}${-ii * (-jj + kk) - 2}${svgEnd}`;
            a02 = `${svgBegin}${-ii * (-jj + kk) - 1}${svgEnd}`;
            a03 = `${svgBegin}${-ii * (-jj + kk) + 1}${svgEnd}`;
            a04 = `${svgBegin}${-ii * (-jj + kk) + 2}${svgEnd}`;
            a05 = `${svgBegin}${-ii * (-jj + kk) + 3}${svgEnd}`;
            semanticQuestion = `-${i}x(-${j}+${kk})`;
            semanticAnswer = `${-ii * (-jj + kk)}`;
          } else if (rand == 3) {
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

const Joi = require("joi");
const mongoose = require("mongoose");
const { finishedCardSchema } = require("./finishedCard");
const { finishedQuestionSchema } = require("./finishedQuestion");

const cardendSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({}),
    required: true
  },
  lastOnline: {
    type: Date,
    default: Date.now
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  correctQuestions: {
    type: Number,
    default: 0,
    min: 0
  },
  wrongQuestions: {
    type: Number,
    default: 0,
    min: 0
  },
  finishedCards: [finishedCardSchema]
  //finishedQuestions: [finishedQuestionSchema]
});

const Cardend = mongoose.model("Cardend", cardendSchema);

function validateCardend(cardend) {
  const schema = {
    userID: Joi.objectId().required(),
    lastOnline: Joi.date(),
    points: Joi.number(),
    correctQuestions: Joi.number(),
    wrongQuestions: Joi.number(),
    finishedCards: Joi.array()
    //finishedQuestions: Joi.array()
  };

  return Joi.validate(cardend, schema);
}

exports.Cardend = Cardend;
exports.validate = validateCardend;

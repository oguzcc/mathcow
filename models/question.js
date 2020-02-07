const Joi = require("joi");
const mongoose = require("mongoose");
const { answerSchema } = require("./answer");

const questionSchema = new mongoose.Schema({
  topicID: {
    type: String,
    required: true
  },
  cardID: {
    type: String,
    required: true
  },
  questionID: {
    type: String,
    required: true
  },
  layoutType: {
    type: Number,
    required: true
  },
  semanticQuestion: {
    type: String,
    default: ""
  },
  semanticAnswer: {
    type: String,
    default: ""
  },
  question: {
    type: String,
    required: true
  },
  trainingQuestion: {
    type: Array,
    default: []
  },
  answers: [answerSchema],
  correctNumber: {
    type: Number,
    default: 0,
    min: 0
  },
  wrongNumber: {
    type: Number,
    default: 0,
    min: 0
  },
  questionLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

const Question = mongoose.model("Question", questionSchema);

function validateQuestion(question) {
  const schema = {
    topicID: Joi.string()
      .min(3)
      .max(3)
      .required(),
    cardID: Joi.string()
      .min(3)
      .max(3)
      .required(),
    questionID: Joi.string()
      .min(3)
      .max(3)
      .required(),
    layoutType: Joi.number().required(),
    semanticQuestion: Joi.string(),
    semanticAnswer: Joi.string(),
    question: Joi.string()
      .min(5)
      .required(),
    trainingQuestion: Joi.array(),
    answers: Joi.array().required(),
    correctNumber: Joi.number().min(0),
    wrongNumber: Joi.number().min(0),
    questionLevel: Joi.number().min(0)
  };

  return Joi.validate(question, schema);
}

exports.Question = Question;
exports.validate = validateQuestion;

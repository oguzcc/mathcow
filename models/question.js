const Joi = require("joi");
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
});

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
  question: {
    type: String,
    required: true
  },
  trainingQuestion: {
    type: String
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
    max: 5
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
    question: Joi.string()
      .min(5)
      .required(),
    trainingQuestion: Joi.string().required((questionID = "100")),
    answers: Joi.array().required(),
    correctNumber: Joi.number().min(0),
    wrongNumber: Joi.number().min(0),
    questionLevel: Joi.number()
  };

  return Joi.validate(question, schema);
}

exports.Question = Question;
exports.validate = validateQuestion;

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

function validateAnswer(answer) {
  const schema = {
    answer: Joi.string()
      .min(5)
      .required(),
    isCorrect: Joi.boolean().required()
  };

  return Joi.validate(answer, schema);
}

exports.answerSchema = answerSchema;
exports.validate = validateAnswer;

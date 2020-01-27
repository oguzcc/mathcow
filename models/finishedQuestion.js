const Joi = require("joi");
const mongoose = require("mongoose");

const finishedQuestionSchema = new mongoose.Schema({
  question: {
    type: new mongoose.Schema({}),
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
});

function validateFinishedQuestion(finishedQuestion) {
  const schema = {
    question_id: Joi.objectId().required(),
    isCorrect: Joi.boolean()
  };

  return Joi.validate(finishedQuestion, schema);
}

exports.finishedQuestionSchema = finishedQuestionSchema;
exports.validate = validateFinishedQuestion;

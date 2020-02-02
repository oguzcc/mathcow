const Joi = require("joi");
const mongoose = require("mongoose");

const finishedCardSchema = new mongoose.Schema({
  topicID: {
    type: String,
    required: true
  },
  cardID: {
    type: String,
    required: true
  },
  correctInCard: {
    type: Number,
    default: 0,
    min: 0
  },
  wrongInCard: {
    type: Number,
    default: 0,
    min: 0
  },
  accuracyPercentageInCard: {
    type: Number,
    default: 0,
    min: 0
  }
});

function validateFinishedCard(finishedCard) {
  const schema = {
    topicID: Joi.string()
      .min(3)
      .max(3)
      .required(),
    cardID: Joi.string()
      .min(3)
      .max(3)
      .required(),
    correctInCard: Joi.number().min(0),
    wrongInCard: Joi.number().min(0),
    accuracyPercentageInCard: Joi.number()
      .min(0)
      .max(100)
  };

  return Joi.validate(finishedCard, schema);
}

exports.finishedCardSchema = finishedCardSchema;
exports.validate = validateFinishedCard;

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
      .required()
  };

  return Joi.validate(finishedCard, schema);
}

exports.finishedCardSchema = finishedCardSchema;
exports.validate = validateFinishedCard;

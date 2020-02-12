const Joi = require("joi");
const mongoose = require("mongoose");
const { topicFCSchema } = require("./topicFC");

const finishedCardSchema = new mongoose.Schema({
  topicID: {
    type: String,
    required: true
  },
  cards: [topicFCSchema]
});

function validateFinishedCard(finishedCard) {
  const schema = {
    topicID: Joi.string()
      .min(3)
      .max(3)
      .required(),
    cards: Joi.array()
  };

  return Joi.validate(finishedCard, schema);
}

exports.finishedCardSchema = finishedCardSchema;
exports.validate = validateFinishedCard;

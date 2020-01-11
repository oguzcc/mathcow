const Joi = require("joi");
const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema({
  cardID: {
    type: String,
    required: true
  },
  cardName: {
    type: String,
    required: true
  }
});

const topicSchema = new mongoose.Schema({
  topicID: {
    type: String,
    required: true
  },
  topicName: {
    type: String,
    required: true
  },
  cards: [cardsSchema]
});

const Topic = mongoose.model("Topic", topicSchema);

function validateTopic(topic) {
  const schema = {
    topicID: Joi.string()
      .min(3)
      .max(3)
      .required(),
    topicName: Joi.string()
      .min(3)
      .max(64)
      .required(),
    cards: Joi.array().required()
  };

  return Joi.validate(topic, schema);
}

exports.Topic = Topic;
exports.validate = validateTopic;

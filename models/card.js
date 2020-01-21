const Joi = require("joi");
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardID: {
    type: String,
    required: true
  },
  cardName: {
    type: String,
    required: true
  }
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = {
    cardID: Joi.string()
      .min(3)
      .max(3)
      .required(),
    cardName: Joi.string()
      .min(3)
      .max(64)
      .required()
  };

  return Joi.validate(card, schema);
}

exports.cardSchema = cardSchema;
exports.validate = validateCard;

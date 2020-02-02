const Joi = require("joi");
const mongoose = require("mongoose");

const restSchema = new mongoose.Schema({
  restQuestions: {
    type: Array,
    required: true
  }
});

const Rest = mongoose.model("Rest", restSchema);

function validateRest(rest) {
  const schema = {
    restQuestions: Joi.array().required()
  };

  return Joi.validate(rest, schema);
}

exports.Rest = Rest;
exports.validate = validateRest;

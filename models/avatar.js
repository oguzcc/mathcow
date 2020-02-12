const Joi = require("joi");
const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  avatarSvg: {
    type: String,
    required: true
  }
});

const Avatar = mongoose.model("Avatar", avatarSchema);

function validateAvatar(avatar) {
  const schema = {
    avatarSvg: Joi.string().required()
  };

  return Joi.validate(avatar, schema);
}

exports.Avatar = Avatar;
exports.avatarSchema = avatarSchema;
exports.validate = validateAvatar;

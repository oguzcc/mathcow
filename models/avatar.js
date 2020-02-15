const Joi = require("joi");
const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  avatarSvg: {
    type: String
  }
});

const Avatar = mongoose.model("Avatar", avatarSchema);

function validateAvatar(avatar) {
  const schema = {
    avatarSvg: Joi.string()
  };

  return Joi.validate(avatar, schema);
}

exports.Avatar = Avatar;
exports.avatarSchema = avatarSchema;
exports.validate = validateAvatar;

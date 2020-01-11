const Joi = require("joi");
const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  versionID: {
    type: String,
    required: true
  }
});

const Setting = mongoose.model("Setting", settingSchema);

function validateSetting(setting) {
  const schema = {
    versionID: Joi.string()
      .min(10)
      .max(10)
      .required()
  };

  return Joi.validate(setting, schema);
}

exports.Setting = Setting;
exports.validate = validateSetting;

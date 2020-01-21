const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const { finishedCardSchema } = require("./finishedCard");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 8,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  lastOnline: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  correctQuestions: {
    type: Number,
    default: 0,
    min: 0
  },
  wrongQuestions: {
    type: Number,
    default: 0,
    min: 0
  },
  accuracyPercentage: {
    type: Number,
    default: 0,
    min: 0
  },
  finishedCards: [finishedCardSchema]
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, email: this.email, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(8)
      .max(50)
      .lowercase()
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .lowercase()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    isAdmin: Joi.boolean(),
    points: Joi.number().min(0),
    correctQuestions: Joi.number().min(0),
    wrongQuestions: Joi.number().min(0),
    accuracyPercentage: Joi.number()
      .min(0)
      .max(100),
    finishedCards: Joi.array()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;

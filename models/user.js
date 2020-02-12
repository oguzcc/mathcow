const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const { Avatar } = require("./avatar");
const { finishedCardSchema } = require("./finishedCard");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 8,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 1024
  },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Avatar"
  },
  lastOnline: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    default: ""
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isGold: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  coins: {
    type: Number,
    default: 0,
    min: 0
  },
  level: {
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
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
      isGold: this.isGold
    },
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
      .trim()
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .lowercase()
      .trim()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .trim()
      .required(),
    avatar: Joi.string(),
    isAdmin: Joi.boolean(),
    isGold: Joi.boolean(),
    points: Joi.number().min(0),
    coins: Joi.number().min(0),
    level: Joi.number().min(0),
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

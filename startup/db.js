const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => winston.info(`Connected to 3000...`));
};

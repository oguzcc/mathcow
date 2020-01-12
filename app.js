const winston = require("winston");
const bodyParser = require("body-parser");
const _ = require("lodash");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./startup/db")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  winston.info("Server has started successfully");
});

const winston = require("winston");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

require("./startup/prod")(app);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./startup/db")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/validation")();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  winston.info("Server has started successfully");
});

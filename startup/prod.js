const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

module.exports = function(app) {
  const guestLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 2, // start blocking after 2 requests
    message:
      "Too many accounts created from this IP, please try again after an hour"
  });

  const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 3 requests
    message:
      "Too many try for login from this IP, please try again after an hour"
  });

  app.enable("trust proxy");
  app.use(helmet());
  app.use("/api/users/guest", guestLimiter);
  app.use("/api/auth", authLimiter);
  app.use(compression());
};

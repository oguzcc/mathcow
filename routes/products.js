const { Product, validate } = require("../models/product");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });


/* router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
}); */

//upload.single("productImage"),

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product(
    _.pick(req.body, [
      "name",
      "price"
    ])
  );

  await product.save();

  res.send(product);
});

module.exports = router;

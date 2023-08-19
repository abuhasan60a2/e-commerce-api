const express = require("express");
const Router = express.Router();
const productController = require("../controllers/ProductController");
Router.route('/top-5-cheap').get(productController.aliasTopProducts, productController.getAllProducts);
Router.route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);
Router.route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
module.exports = Router;
// Path: routes/index.js
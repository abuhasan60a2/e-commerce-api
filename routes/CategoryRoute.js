const express = require("express");
const categoryController = require("../controllers/CategoryController");
const Router = express.Router();
Router.route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);
Router.route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = Router;

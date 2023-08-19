const Category = require("../models/Category");
//modular scaffolding
const categoryController = {};
categoryController.getAllCategories = async (req, res) => {
  res.status(500).json({
    status: "error",
    message: "getAllCategories handler is not yet defined",
  });
};
categoryController.createCategory = async (req, res) => {
    try{
        await Category.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Category created successfully'
        })
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}
categoryController.getCategory = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'getCategory handler is not yet defined'
    })
}
categoryController.updateCategory = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'updateCategory handler is not yet defined'
    })
}
categoryController.deleteCategory = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'deleteCategory handler is not ye defined'
    })
}
module.exports = categoryController;
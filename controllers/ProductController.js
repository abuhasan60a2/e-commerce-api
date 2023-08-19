const Product = require('../models/Products')
//modular scaffolding
const productController = {};
productController.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json({
            message: 'success',
            result:{
                ...products
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
productController.createProduct = async (req, res) => {
    try{
        const newProduct =  await Product.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                newProduct
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }

}
productController.getProduct = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'getProduct handler is not yet defined'
    });
}
productController.updateProduct = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'updateProduct handler is not yet defined'
    });
}
productController.deleteProduct = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'deleteProduct handler is not yet defined'
    });
}
module.exports = productController;
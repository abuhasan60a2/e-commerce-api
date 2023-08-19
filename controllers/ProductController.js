const Product = require("../models/Products");
const APIFeatures = require("../utils/apiFeatures");
//modular scaffolding
const productController = {};

//APIFeatures class(will be removed to a separate file later)


productController.aliasTopProducts = (req, res, next) => {
    req.query.limit=5;
    req.query.sort = 'price, rating';
    req.query.fields = 'name, description, price, rating, category';
    next()
}
productController.getAllProducts = async (req, res) => {
  try {
    //build the query
    const features = new APIFeatures(Product.find(), req.query);
    const countProduct = await Product.count();
    
    features.filter().sort().limitFields().paginate(countProduct);
    

    //execute the query and return the result
    const products = await features.query;
    //send the response to the client
    res.status(200).json({
      message: "success",
      result: {
        ...products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
productController.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
productController.getProduct = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "getProduct handler is not yet defined",
  });
};
productController.updateProduct = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "updateProduct handler is not yet defined",
  });
};
productController.deleteProduct = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "deleteProduct handler is not yet defined",
  });
};
//aggregation pipeline
productController.getProductStat = async (req,res)=>{
    try{
        const stats = await Product.aggregate([
            {
                $match: {rating:{$gte:4}}
            },
            {
                $group: {
                    _id: '$category',
                    numProducts: {$sum: '$stock'}, 
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'}
                }
            },
            {
                $sort: {avgPrice: 1}
            }
        ])
        res.status(200).json({
            status: "success",
            data: {
                stats
            }
        })
    }
    catch(err){
        res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}

module.exports = productController;

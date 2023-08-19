const Product = require("../models/Products");
//modular scaffolding
const productController = {};
productController.getAllProducts = async (req, res) => {
  try {
        //1) Filtering
        //destructure the req.query and make a copy of it using spread operator
        const queryObj = { ...req.query };
        //exclude the fields from the query
        const excludedFields = ["page", "sort", "limit", "fields"];
        //delete the excluded fields from the queryObj
        excludedFields.forEach((element) => delete queryObj[element]);

        //2) Advance Filtering
        let queryString = JSON.stringify(queryObj);
        console.log(queryString);
        //querystring replaces gt|gte|lt|lte with $gt|$gte|$lt|$lte using regular expression
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match=>`$${match}`);
        console.log(JSON.parse(queryString));


        // first return query for further chaining the query
        const query =  Product.find(JSON.parse(queryString));
        //execute the query and return the result
        const products = await query;
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
module.exports = productController;

const Product = require("../models/Products");
//modular scaffolding
const productController = {};
productController.getAllProducts = async (req, res) => {
  try {
    //1A) Filtering
    //destructure the req.query and make a copy of it using spread operator
    const queryObj = { ...req.query };
    //exclude the fields from the query
    const excludedFields = ["page", "sort", "limit", "fields"];
    //delete the excluded fields from the queryObj
    excludedFields.forEach((element) => delete queryObj[element]);

    //1B) Advance Filtering
    let queryString = JSON.stringify(queryObj);
    //querystring replaces gt|gte|lt|lte with $gt|$gte|$lt|$lte using regular expression
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    // first return query for further chaining the query
    let query = Product.find(JSON.parse(queryString));

    //2) Sorting the result
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
      console.log(sortBy);
    }

    //3) Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      //exclude the __v field from the query
      query = query.select("-__v");
    }

    //4) Pagination
    if (req.query.page || req.query.limit) {
      //page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
      const page = req.query.page * 1 || 1;
      console.log(page);
      //skip the first 10 results and show the next 10 results
      const limit = req.query.limit * 1 || 1;
      console.log(limit);
      const skip = page * limit - limit;
      query = query.skip(skip).limit(limit);
      const totalProducts = await Product.count()
      if(skip >=totalProducts) throw new Error("This page does not exist")
    } else {
      query = query.skip(0).limit(10);
    }

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

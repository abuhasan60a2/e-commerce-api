const {Schema, model} = require('mongoose');
const Product = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name'],
            unique: true,
            trim: true,
            maxlength: [100, 'Product name cannot be more than 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
            trim: true,
            maxlength: [500, 'Product description cannot be more than 500 characters']
        },
        category:{
            type: String,
            required: [true, 'Category must be provided'],
            trim: true,
            maxlength: [100, 'Category cannot be more than 100 characters']
        },
        price: {
            type: Number,  
            required: [true, 'Please enter product price'],
            trim: true,
            maxlength: [5, 'Product price cannot be more than 5 characters']

        },
        rating:{
            type: Number,
            default:0
        },
        ratingCount:{
            type: Number,
            default:0
        },
        discount:{
            type: Number,
            
        },

        stock: {
            type: Number,
            required: [true, 'Please enter product stock'],
            trim: true,
            maxlength: [5, 'Product stock cannot be more than 5 characters']
        },
        image: {
            type: String,
            required: [true, 'Please enter product image'],
            trim: true,
            maxlength: [100, 'Product image cannot be more than 100 characters']
        },
        images: [String],
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        dateUpdated: {
            type: Date,
            default: Date.now()
        }
    }
)
const product = model('Product', Product);
module.exports = product;


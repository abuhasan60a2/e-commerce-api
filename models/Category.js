const {Schema, model} = require('mongoose');
const Category = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter category name'],
        unique: true,
        trim: true,
        maxlength: [100, 'Category name cannot be more than 100 characters']
    },

})
const category = model('Category', Category);
module.exports = category;
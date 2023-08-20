const {Schema, model} = require('mongoose');
const slugify = require('slugify');
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
            //custom validator
            validator:{
                validate: function(val){
                    return val<this.price;

                },
                message: 'Discount price ({VALUE}) should be less than the regular price'

            }
            
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
        slug: String,
        secretProduct: {
            type: Boolean,
            default: false
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        dateUpdated: {
            type: Date,
            default: Date.now()
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)
//Document pre middleware
Product.pre('save',function(next){
    this.slug = slugify(this.name, {lower: true});
    next();
})
// //Document pre middleware
// Product.pre('save',function(next){
//    console.log('Saving Document...');
//    next();
// })
// //Document post middleware
// Product.post('save',function(doc,next){
//     console.log(doc);
//     next();
// })

//Query pre middleware
Product.pre(/^find/, function(next){
    this.find({secretProduct: {$ne:true}});
    this.start = Date.now();
    next();
})
//Query post middleware
Product.post(/^find/, function(docs, next){
    console.log(`Query took ${Date.now()-this.start} milliseconds`);
    next();
})

//Aggregation pre middleware
Product.pre('aggregate', function(next){
    this.pipeline().unshift({$match: {secretProduct: {$ne: true}}})
    console.log(this.pipeline());
    next();
})
//virtual populate
Product.virtual('vendor').get(function(){
    return 'Startech';
})
const product = model('Product', Product);
module.exports = product;



const { Schema,model, mongo } = require('mongoose');
const User = new Schema({
    firstName:{
        type: String,
        required: [true, 'Please enter your first name'],
        trim: true,
        maxlength: [20, 'First name cannot be more than 20 characters']
    },
    lastName:{
        type: String,
        required: [true, 'Please enter your last name'],
        trim: true,
        maxlength: [20, 'Last name cannot be more than 20 characters']
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true,
        maxlength: [50, 'Email cannot be more than 50 characters']
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        trim: true,
        maxlength: [20, 'Password cannot be more than 20 characters']
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contact:{
        type: String,
        required: [true, 'Please enter your contact number'],
        trim: true,
        match: /^[0-9]{11}$/,
        maxlength: 11,
        minlength: 11
    },
    address:{
        type: String,
        required: [true, 'Please enter your address'],
        trim: true,
        maxlength: [100, 'Address cannot be more than 100 characters']
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
})
const user = model('User', User);
module.exports = user

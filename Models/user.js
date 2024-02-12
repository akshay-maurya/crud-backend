const mongoose = require('mongoose');
const { productSchema } = require('./product');

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return value.match(regEx);
            },
            message: "Please enter the valid email",
        },
    },
    mobileNumber: {
        required: true,
        type: String,
        trim: true,
    },
    password: {
        required: true,
        type: String,
        trim: true,
    },
    address: {
        type: String,
        default : "",
    },
    type: {
        type: String,
        default: 'user',
    },
    cart: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
            },
        },
    ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
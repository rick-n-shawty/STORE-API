const mongoose = require('mongoose')
const MySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },

    price:{
        type: Number,
        required: [true, 'price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
})
const Product = mongoose.model('products', MySchema)
module.exports = Product
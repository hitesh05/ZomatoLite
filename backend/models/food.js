const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addon = new Schema({
    item: String, price: Number
});

const RatingSchema = mongoose.Schema({userId:String,rating:Number});

const FoodItem = new Schema({
    vendorname: {
        type:String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shopStart: {
        type:String
    },
    shopEnd: {
        type:String
    },
    rating: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    tag: [{
        type: String,
        required: false
    }],
    addons: {
        type: [addon],
        required: false
    }
});

module.exports = fooditem = mongoose.model("fooditem", FoodItem);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addon = new Schema({
    item: String, price: Number
});

const Order = new Schema({
    buyerid: {
        type: String
    },
    vendorname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    addons: {
        type: [addon],
        required: false
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: String
    },
    status: {
        type: String,
        default: "Placed"
    }
});

module.exports = order = mongoose.model("order", Order);
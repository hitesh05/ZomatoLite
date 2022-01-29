const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const solditems = new Schema({
    item: String, qty: Number
});

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		unique: true,
		required: true
	},
	shopName: {
		type: String,
        unique: true,
		required: true
	},
	shopStart: {
		type: String,
		required: true
	},
	shopEnd: {
		type: String,
		required: true
	}
});

module.exports = vendor = mongoose.model("vendor", VendorSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
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
	age: {
		type: Number,
		required: true
	},
	batch: {
		type: String,
		enum: ['UG1', 'UG2', 'UG3', 'UG4', 'UG5', 'PG1', 'PG2','PhD','Other'],
		required: true
	},
	wallet: {
		type: Number,
		required: false
	}
});

module.exports = buyer = mongoose.model("buyer", BuyerSchema);

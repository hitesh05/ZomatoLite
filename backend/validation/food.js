const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateProductInput(data) {
	let errors = {};

	if(isEmpty(data.name)){
		data.name = "";
	}

	if(isEmpty(data.vendorname)){
		data.vendorname = "";
	}

	if(isEmpty(data.price)){
		data.price = "";
	}

	if(isEmpty(data.category)){
		data.category = "";
	}

	if(isEmpty(data.tag)){
		data.tag = "";
	}

	if(Validator.isEmpty(data.vendorname)){
		errors.vendorname = "Vendor Name is Required!!";
	}
	
	if(Validator.isEmpty(data.name)){
		errors.name = "Name is Required!!";
	}

	if(Validator.isEmpty(String(data.price))){
		errors.price = "Price is Required";
	}

	if(Validator.isEmpty(data.category)){
		errors.category = "Category is Required";
	}

	var tag;
	tag = data.tag.join();
	if(Validator.isEmpty(tag)){
		errors.tag = "Tag(s) are Required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
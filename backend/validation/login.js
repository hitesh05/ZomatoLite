const Validator = require('validator');
const isEmpty  = require('is-empty');

module.exports = function validateLoginInput(data) {
	let errors = {};

	if(isEmpty(data.email)){
		data.email = "";
	}
	if(isEmpty(data.password)){
		data.password = "";
	}

	if(Validator.isEmpty(data.email)){
		errors.email = "Email is required";
	}

	if(Validator.isEmpty(data.password)){
		errors.psswd1 = "Password field is required"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

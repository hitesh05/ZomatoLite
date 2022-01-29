const Validator = require('validator');
const isEmpty  = require('is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	if(isEmpty(data.name)){
		data.name = "";
	}
	if(isEmpty(data.email)){
		data.email = "";
	}
	if(isEmpty(data.password)){
		data.password= "";
	}
	if(isEmpty(data.password2)){
		data.password2= "";
	}
    if(isEmpty(data.contact)){
        data.contact="";
    }
    if(isEmpty(data.age)){
        data.age="";
    }
    if(isEmpty(data.batch)){
        data.batch="";
    }

	if(Validator.isEmpty(data.name)){
		errors.name="Name field is required";
	}

	if(Validator.isEmpty(data.email)){
		errors.email = "Email field is required";
	}
	else if(!Validator.isEmail(data.email)){
		errors.email = "Email is invalid";
	}

    if(Validator.isEmpty(data.contact)){
		errors.contact = "Contact field is required";
	}
	else if(!Validator.isLength(data.contact, {min:10,max:10})){
		errors.contact ="Contact length must be 10"
	}

    if(Validator.isEmpty(data.age)){
		errors.age = "Age field is required";
	}

    if(Validator.isEmpty(data.batch)){
		errors.batch = "Batch field is required";
	}

	if(Validator.isEmpty(data.password)){
		errors.psswd = "Password field is required"
	}

	if(Validator.isEmpty(data.password2)){
		errors.psswd2 = "Confirm Password field is required"
	}

	if(!Validator.isLength(data.password, {min: 6, max:25})){
		errors.psswd1 = "Password Length must be between 6 and 25";
	}

	if(!Validator.equals(data.password, data.password2)){
		errors.psswd2 = "Passwords must be same"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

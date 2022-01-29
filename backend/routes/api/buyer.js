const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');


const Student = require('../../models/buyer');

router.route('/all').get((req, res) => {
	Student.find()
		.then(students => res.json(students))
		.catch(err => res.status(800).json('Error: ' + err));

});

router.get('/buy/:buyerID', (req, res) => {
	Student.findById(req.params.buyerID).then(buyer => {
		if (!buyer) res.send({ message: "buyer not found!", status: 801 });
		else res.status(200).send(buyer);
	});
});

router.post("/register", (req, res) => {

	const { errors, isValid } = validateRegisterInput(req.body);

	console.log(req.body);
	console.log(errors, isValid)
	// isValid=isEmpty(errors) in register.js
	if (!isValid) {
		return res.json({ errors, status: 800 });
	}
	Student.find({ name: req.body.name }).then(user => {
		console.log(user)
		if (user.length > 0) {
			return res.json({ message: " Name already Taken ", status: 800 });
		} else {
			Student.find({ email: req.body.email }).then(user => {
				if (user.length > 0) {
					return res.json({ message: "Email already Exists", status: 800 });
				}
				else {
					Student.find({ contact: req.body.contact }).then(user => {
						if (user.length > 0) {
							return res.json({ message: "Contact already Exists", status: 800 });
						}
						else {
							const newStudent = new Student({
								name: req.body.name,
								email: req.body.email,
								password: req.body.password,
								contact: req.body.contact,
								age: req.body.age,
								batch: req.body.batch,
								wallet: 0
							});
							console.log(newStudent);

							// Hash password before saving in database
							bcrypt.genSalt(10, (err, salt) => {
								bcrypt.hash(newStudent.password, salt, (err, hash) => {
									if (err) throw err;
									newStudent.password = hash;
									newStudent.save()
										.then(user => res.json({ user, status: 200 }))
										.catch(err => console.log(err));
								});
							});
						}
					});
				}
			});
		}
	});
});


router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.json({ ...errors, status: 800 });
	}
	else {
		Student.findOne({ email: req.body.email }).then(user => {
			if (!user) res.json({ message: "Email not found", status: 800 })
			else {
				// console.log(count1)
				bcrypt.compare(req.body.password, user.password)
					.then(isMatch => {
						if (isMatch) {
							const payload = {
								id: user.id,
								name: user.name
							};
							// console.log(payload);
							jwt.sign(
								payload,
								keys.secretOrKey,
								{
									expiresIn: 6 * 30 * 60 * 60
									// 6 months
								},
								(err, token) => {
									res.json({
										success: true,
										token: token,
										status: 200
									});
								}
							);
						}
						else {
							res.json({ message: "Password entered is wrong", status: 800 })
						}
					})
			}
		})
	}
});

router.post('/update', (req, res) => {
	Student.findById(req.body._id).then(async (student) => {
		if (student.contact === req.body.contact) {
			if (student.shopName === req.body.shopName) {
				await Student.findByIdAndUpdate(req.body._id, req.body);
				res.send({ student, message: "updated!", status: 200 });
			}
			else {
				Student.findOne({ shopName: req.body.shopName }).then(async (student) => {
					if (student) res.send({ student, message: "shop name used!", status: 800 });
					else {
						await Student.findByIdAndUpdate(req.body._id, req.body);
						res.send({ student, message: "updated!", status: 200 });
					}
				});
			}
		}
		else {
			Student.findOne({ contact: req.body.contact }).then(async (student) => {
				if (student) res.send({ student, message: "contact used!", status: 800 });
				else {
					await Student.findByIdAndUpdate(req.body._id, req.body);
					res.send({ student, message: "updated!", status: 200 });
				}
			});
		}
	});
});

router.post('/delete', (req, res) => {
	Student.findById(req.body._id).then(async (student) => {
		await Student.findByIdAndDelete(req.body._id, req.body);
		res.status(200).send({ message: "deleted!" });
	});
});

module.exports = router;
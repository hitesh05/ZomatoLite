const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/registration2');
const validateLoginInput = require('../../validation/login');


const Vendor = require('../../models/vendor');

router.route('/all').get((req, res) => {
	Vendor.find()
		.then(vendors => res.json(vendors))
		.catch(err => res.status(400).json('Error: ' + err));
	// console.log('here');
	// console.log(req);
});

router.get('/ven/:vendorId', (req, res) => {
	Vendor.findById(req.params.vendorId).then(vendor => {
		if (!vendor) res.send({ message: "Vendor not found!", status: 801 });
		else res.status(200).send(vendor);
	});
});

router.route('/vdetails/').post((req, res) => {
	console.log(req.body.name)
	Vendor.findOne({ name: req.body.name })
		.then(vendors => {
			return res.json(vendors)
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post("/register", (req, res) => {

	const { errors, isValid } = validateRegisterInput(req.body);

	// isValid=isEmpty(errors) in register.js
	if (!isValid) {
		return res.json({ errors, status: 800 });
	}
	Vendor.find({ name: req.body.name }).then(user => {
		if (user.length > 0) {
			return res.json({ message: " Username already Taken " });
		} else {
			Vendor.find({ email: req.body.email }).then(user => {
				if (user.length > 0) {
					return res.json({ message: "Email already Exists" });
				}
				else {
					Vendor.find({ contact: req.body.contact }).then(user => {
						if (user.length > 0) {
							res.send({ message: "Contact already exists", status: 800 });
						}
						else {
							Vendor.find({ shopName: req.body.shopName }).then(user => {
								if (user.length > 0) {
									res.send({ message: "Vendor already Exists", status: 800 });
								}
								else {
									const newVendor = new Vendor({
										name: req.body.name,
										email: req.body.email,
										password: req.body.password,
										contact: req.body.contact,
										shopName: req.body.shopName,
										shopStart: req.body.shopStart,
										shopEnd: req.body.shopEnd
									});
									console.log('vendor registered')
									console.log(newVendor);

									// Hash password before saving in database
									bcrypt.genSalt(10, (err, salt) => {
										bcrypt.hash(newVendor.password, salt, (err, hash) => {
											if (err) throw err;
											newVendor.password = hash;
											newVendor.save()
												.then(user => res.json({ user, status: 200 }))
												.catch(err => console.log('Error: ' + err));
										});
									});
								}
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
		Vendor.findOne({ email: req.body.email }).then(user => {
			if (!user) res.json({ message: "Email not found", status: 800 })
			else {
				// console.log(count1)
				bcrypt.compare(req.body.password, user.password)
					.then(isMatch => {
						if (isMatch) {
							const payload = {
								id: user.id,
								name: user.name,
								shopName: user.shopName,
								shopStart: user.shopStart,
								shopEnd: user.shopEnd
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
							res.json({ "message": "Password entered is wrong", status: 800 })
						}
					})
			}
		})
	}
});

router.post('/update', (req, res) => {
	Vendor.findById(req.body._id).then(async (vendor) => {
		if (vendor.contact === req.body.contact) {
			if (vendor.shopName === req.body.shopName) {
				await Vendor.findByIdAndUpdate(req.body._id, req.body);
				res.send({ vendor, message: "updated!", status: 200 });
			}
			else {
				Vendor.findOne({ shopName: req.body.shopName }).then(async (vendor) => {
					if (vendor) res.send({vendor, message: "shop name used!", status: 800 });
					else {
						await Vendor.findByIdAndUpdate(req.body._id, req.body);
						res.send({ vendor, message: "updated!", status: 200 });
					}
				});
			}
		}
		else {
			Vendor.findOne({ contact: req.body.contact }).then(async (vendor) => {
				if (vendor) res.send({vendor, message: "contact used!", status: 800 });
				else {
					await Vendor.findByIdAndUpdate(req.body._id, req.body);
					res.send({ vendor, message: "updated!", status: 200 });
				}
			});
		}
	});
});

router.post('/delete', (req, res) => {
	Vendor.findById(req.body._id).then(async (vendor) => {
		await Vendor.findByIdAndDelete(req.body._id, req.body);
		res.status(200).send({ message: "deleted!" });
	});
});

module.exports = router;
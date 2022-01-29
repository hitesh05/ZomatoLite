const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const Order = require("../../models/order");

router.route('/all').get((req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(800).json("Error:" + err));
});

router.route('/add').post((req, res) => {

    const order = new Order({
        buyerid: String(req.body.buyerid),
        vendorname: req.body.vendorname,
        name: req.body.name,
        quantity: Number(req.body.quantity),
        price: Number(req.body.price),
        time: String(req.body.time),
        status: "Placed",
        addons: req.body.addons
    });

    console.log(order);
    order.save()
        .then(()=>res.status(200).send(order))
        .catch(err=>res.status(800).send(err));
});

router.route('/updateStatus/').post((req,res) => {

	console.log(req.body.id);

	Order.findById(req.body.id)
		.then(order => {
			order.status=req.body.status;

			order.save()
				.then(() => res.json('Product status changed'))
				.catch(err => res.status(800).json('Error: '+err));
		})
		.catch(err => res.status(800).json('Error: '+ err));
});

module.exports = router;
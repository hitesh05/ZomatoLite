const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const Product = require("../../models/food");
const validateProductInput = require("../../validation/food");

router.route('/all').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(800).json("Error:" + err));
});

router.route('/FindByVendor/:foodId').get((req, res) => {
    Product.findById(req.params.foodId).then(product => {
        if (!product) res.send({ message: "product not found!", status: 800 });
        else res.status(200).send(product);
    });
});

router.route('/add').post((req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // isValid=isEmpty(errors) in register.js
    if (!isValid) {
        return res.send({ errors, status: 800 });
    }

    const product = new Product({
        // vendorname: String(req.body._id),
        name: req.body.name,
        price: Number(req.body.price),
        vendorname: req.body.vendorname,
        rating: 0,
        category: req.body.category,
        tag: req.body.tag,
        addons: req.body.addons,
        shopStart: req.body.shopStart,
        shopEnd: req.body.shopEnd
    });

    console.log(product);
    product.save()
        .then(() => res.json('Product added!!!'))
        .catch(err => res.status(800).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    console.log(req.body);

    const { errors, isValid } = validateProductInput(req.body);

    // isValid=isEmpty(errors) in register.js
    if (!isValid) {
        return res.status(800).send(errors);
    }
    
    Product.findById(req.body.id).then(async (product) => {
        console.log(product);
        await Product.findByIdAndUpdate(req.body.id, req.body);
        res.status(200).send({ message: "updated!" });
    })
})

router.route('/delete').post((req, res) => {
    // console.log(req.body._id);
    Product.findByIdAndDelete(req.body._id, (err) => {
        if (err) res.status(800).send(err);
        res.status(200).send({ message: "Delete succesful!" });
    });
});

router.route('/rating').post((req, res) => {
    Product.findById(req.body.id).then(async (product) => {
        flag = true;
        for (i = 0; i < product.rating.length; i++) {
            // console.log("aithe vekhla");
            if (product.rating[i].userId === req.body.userId) {
                flag = false;
                product.rating[i].rating = req.body.rating;
                await Product.findByIdAndUpdate(req.body._id, { rating: product.rating });
                res.send({ message: "rating updated" });
                break;
            }
        }
        if (flag === true) {
            product.rating.push({ userId: req.body.userId, rating: req.body.rating });
            await Product.findByIdAndUpdate(req.body._id, { rating: product.rating });
            res.send({ message: "rating dedi hai" });
        }
    })
        .catch(err => console.log(err));
});

module.exports = router;


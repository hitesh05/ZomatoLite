const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: false
	}))
app.use(bodyParser.json());

// Connection to mongodb

const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true ,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// routes
const vendorapi = require('./routes/api/vendor');
const buyerapi = require('./routes/api/buyer');
const foodapi = require('./routes/api/food');
const req = require('express/lib/request');
const orderapi = require('./routes/api/order');

app.use("/vendor",vendorapi);
app.use('/buyer',buyerapi);
app.use('/food',foodapi);
app.use('/order', orderapi);
// API endpoints

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});


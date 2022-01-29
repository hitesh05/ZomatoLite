const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt  = require("passport-jwt").ExtractJwt;
const mongoose = require('mongoose');
// const User =  require('../models/user');
const Student = require('../models/buyer');
const Vendor = require('../models/vendor');
const keys = require("../config/keys");

const opts ={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			Student.findById(jwt_payload.id)
				.then(user =>{
					if(user) {
						return done(null, user);
					}
					else{
						Vendor.findById(jwt_payload.id)
							.then(user => {
								if(user) {
									return done(null,user);
								}
								return done(null,false);
							})
					}
					// return done(null,false);
				})
				.catch(err => console.log(err));

		})
	);
};
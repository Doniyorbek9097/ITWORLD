const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	username:String,
	email:String,
	password:String,
	verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({_id: this._id },process.env.JWTPRIVATEKEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return token;
	
};

const User = mongoose.model("User", userSchema);

const userValidate = (data) => {
	const schema = Joi.object({
		username:Joi.string().required().label("username"),
		email:Joi.string().required().label("email"),
		password:passwordComplexity().required().label("password")
	})

	return schema.validate(data);
}


module.exports = { User, userValidate };


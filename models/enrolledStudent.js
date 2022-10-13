const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = new mongoose.Schema({
	fullname:String,
	field:String,
	phone:Number
})

const EnrolledStudent = mongoose.model("enrolledStudent", Schema);

const validate = (data) => {
const schema = Joi.object({
		fullname:Joi.string().required().label("Ismingizni kiriting"),
		field:Joi.string().required().label("Soha tanlang"),
		phone:Joi.number().required().label("Telefon raqam kiriting")
	});
	
return schema.validate(data);
	
}

module.exports = {validate, EnrolledStudent};


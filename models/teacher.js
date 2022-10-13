const mongoose = require("mongoose");
const Joi = require("joi");

const teacherSchema = new mongoose.Schema({
	name:String,
	surname:String,
	age:Number,
	address:String,
	phone:Number,
	subject:String,
	technologies:Array
});

const Teacher = mongoose.model("Teacher",teacherSchema);

const teacherValidate = (data) => {
	const schema = Joi.object({
		name:Joi.string().required().label("name"),
		surname:Joi.string().required().label("surname"),
		age:Joi.number().required().label("age"),
		address:Joi.string().required().label("address"),
		phone:Joi.number().required().label("phone"),
		subject:Joi.string().required().label("subject"),
		technologies:Joi.array().items(Joi.string()).required().label("technologies")
	});

	return schema.validate(data);
	
}



module.exports = {Teacher, teacherValidate};
const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
	name:String,
	surname:String,
	age:Number,
	address:String,
	phone:Number,
});

const Student = mongoose.model("Student", studentSchema);

const studentValidate = (data) => {
	const schema = Joi.object({
		name:Joi.string().required().label("name"),
		surname:Joi.string().required().label("surname"),
		age:Joi.number().required().label("age"),
		address:Joi.string().required().label("address"),
		phone:Joi.number().required().label("phone")
	});

	return schema.validate(data);
	
}



module.exports = {Student, studentValidate};
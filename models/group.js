const mongoose = require("mongoose");
const Joi = require("joi");

const groupSchema = new mongoose.Schema({
  name:String,
	teacher:Object,
	techs:Array,
	days:String,
	lesson_start:String,
	lesson_end:String,
	started:String,
	students:Array,
	totalPrice:{type:Number, default:0}
	
});


const Group = mongoose.model("Group", groupSchema);

const groupValidate = (data) => {
	const schema = Joi.object({
		name:Joi.string().required().label("name"),
		teacher:Joi.object().required().label("teacher"),
		techs:Joi.array().items(Joi.string()).required().label("technologies"),
		days:Joi.string().required().label("days"),
		lesson_start:Joi.string().required().label("lesson_start"),
		lesson_end:Joi.string().required().label("leesson_end"),
		started:Joi.string().required().label("started"),
		students:Joi.array().items(Joi.string()).label("students"),
		totalPrice:Joi.number().label("totalPrice")
	});

return schema.validate(data);
	
} 


module.exports = {Group, groupValidate};



const mongoose = require("mongoose");
const Joi = require("joi");
const subjectSchema = new mongoose.Schema({
	title:String,
	technologies:Array
})

const Subject = mongoose.model("Subject",subjectSchema);

const subjectValidate = (data) => {
	const schema = Joi.object({
		title:Joi.string().required().label("Title"),
		technologies:Joi.array().items(Joi.string())
	})
	return schema.validate(data);
}

module.exports = { Subject, subjectValidate };


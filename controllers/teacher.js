const {Teacher, teacherValidate} = require("../models/teacher");

// ---------------------------------
const Teachers = async (req,res) => {
try {
	const teachers = await Teacher.find();
  return	res.json({status:200, message:"success", result:teachers});
} catch (err) {
	console.log(err)
}
}

// ---------------------------

const TeacherById = async (req,res) => {
	try {
		const teacher =  await Teacher.findById(req.params.id);
		return res.json({status:200, message:"success", result:teacher})
	} catch (err) {
		console.log(err)
	}
}

const EditTeacher = async (req,res) => {
	try {
	const {error} = teacherValidate(req.body);
	 if(error) return res.json({message:error.details[0].message})
		const updateTeacher =  await Teacher.findByIdAndUpdate(req.params.id,req.body);
		return res.json({status:200, message:"success"})
	} catch (err) {
		console.log(err)
	}
}

// -----------------

const AddTeacher = async (req,res) => {
	try {
	  const {error} = teacherValidate(req.body);
		// if(error) return res.json({message:error.details[0].message})
		
		const newTeacher = new Teacher(req.body);
		const savedTeacher = await newTeacher.save();
		console.log(savedTeacher);
		return res.json({status:201, message:"success", result:savedTeacher})
	} catch (err) {
		console.log(err)
	}
}

// -------------------

const DeleteTeacher = async (req,res) => {
	try {
		const deleteTeacher = await Teacher.findByIdAndRemove(req.params.id);
		return res.json({status:200, message:"deleted!"});
	} catch (err) {
		console.log(err)
	}
}


module.exports = {
	Teachers,
	AddTeacher,
	TeacherById,
	EditTeacher,
	DeleteTeacher

};
const {Student, studentValidate} = require("../models/student");

// ---------------------------------
const Students = async (req,res) => {
try {
	const students = await Student.find();
  return	res.json({status:200, message:"success", result:students});
} catch (err) {
	console.log(err)
}
}

// ---------------------------

const StudentById = async (req,res) => {
	try {
		const student =  await Student.findById(req.params.id);
		return res.json({status:200, message:"success", result:student})
	} catch (err) {
		console.log(err)
	}
}

const EditStudent = async (req,res) => {
	try {
	const {error} = teacherValidate(req.body);
	 if(error) return res.json({message:error.details[0].message})
		const updateStudent =  await Student.findByIdAndUpdate(req.params.id,req.body);
		return res.json({status:200, message:"success updated!"})
	} catch (err) {
		console.log(err)
	}
}

// -----------------

const AddStudent = async (req,res) => {
	try {
	  const {error} = studentValidate(req.body);
		// if(error) return res.json({message:error.details[0].message})
		
		const newStudent = new Student(req.body);
		const savedStudent = await newStudent.save();
		return res.json({status:201, message:"success", result:savedStudent})
	} catch (err) {
		console.log(err)
	}
}

// -------------------

const DeleteStudent = async (req,res) => {
	try {
		const deleteStudent = await Student.findByIdAndRemove(req.params.id);
		return res.json({status:200, message:"deleted!"});
	} catch (err) {
		console.log(err)
	}
}


module.exports = {
	Students,
	AddStudent,
	StudentById,
	EditStudent,
	DeleteStudent

};
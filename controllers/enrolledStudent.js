
const {validate, EnrolledStudent } = require("../models/enrolledStudent");

const studentList = async (req,res) => {
 try {
	const students = await EnrolledStudent.find();
  console.log(students)
	 return res.json({status:200, msg:"success", result:students})
 } catch (err) {
 	  console.log(err)
 }	
}

const enrolledAdd = async (req,res) => {
	try {
	const {error} = validate(req.body);
 if(error) return res.json({msg:error.details[0].message});

 const findedStudent = await EnrolledStudent.findOne({field:req.body.field, phone:req.body.phone});
	if(findedStudent) return res.json({msg:`Siz alaqachon ${req.body.field} kursiga ro'yhatdan o'tgansiz!`}) 

	const saveStudent = await EnrolledStudent(req.body).save();
	 return res.json({stauts:201, msg:`${req.body.field} kursiga Muofaqiyatli ro'yhatdan o'tdingiz Tez orada siz bilan bog'lanamaiz!`});
	
	} catch (err) {
		console.log(err)
	}
}


const deleteEnrolled = async (req,res) => {
	await EnrolledStudent.findByIdAndRemove(req.params.id);
	return res.json({msg:"deleted!"})
}

module.exports = {
studentList,
enrolledAdd,
deleteEnrolled
};




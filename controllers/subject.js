const { Subject, subjectValidate } = require("../models/subject");

// ---------------------------------------
// get all subjects
const Subjects = async (req,res) => {
	try {
  const subjects = await Subject.find();
  return res.json({status:200, message:"success", subjects});
		
	} catch (err) {
		console.log(err)
	}
}
// ----------------------------------------
// get one subject
const SubjectById = async (req,res) => {
	try {
		console.log(req.params.id);
  const subject = await Subject.findById(req.params.id);
  return res.json({status:200, message:"success", subject});
		
	} catch (err) {
		console.log(err)
	}
}

// -----------------------------------------



// ---------------------------------------
// subject add 
const AddSubject = async (req,res) => {
	try {
	const { error } = subjectValidate(req.body);
	if(error) return res.json({ message:error.details[0].message })
	const newSubject =  new Subject(req.body);
	const savedSubject = await newSubject.save();
		return res.json({status:201, message:"success", data:savedSubject})
	} catch (err) {
		console.log(err)
	}
} 

// ------------------------------------
// subject update
const UpdateSubject = async (req,res) => {
	try {
const id = req.params;
const { error } = subjectValidate(req.body);
if(error) return res.json({ message:error.details[0].message })

const { title, technologies } = req.body;
	const editedSubject = await Subject.findByIdAndUpdate(req.params.id, {
		title,
		technologies
	})
		
return res.json({status:200, message:"success updated!"})

		
	} catch (err) {
		console.log(err)
	}
}

// ------------------------------------
// subject delete 
const DeleteSubject = async (req,res) => {
try {
	const id = req.params.id;
	const deleted = await Subject.findByIdAndRemove(id);
	return res.json({status:200, message:"success deleted!", data:deleted});
	
} catch (err) {
	console.log(err)
}

}

// subject technologies add 
const PushTechnology = async (req,res) => {
	try {
  const subjects = await Subject.findByIdAndUpdate(
	  req.params.id,
		{$push: {technologies:req.body.technologies} }
	);
		console.log(subjects)
		
  return res.json({status:200, message:"success updeted!"});
		
	} catch (err) {
		console.log(err)
	}

}

	// -------------------
// subject technologies delete

const deleteSubjectTech = async (req,res) => {
	const subject = await Subject.findById(req.params.id);
	subject.technologies.splice(parseInt(req.params.index),1);
 const result = await subject.save();
	return res.json({status:200, message:"success", result})

}

// subject find by Title
const subjectFindByTitle = async(req,res) => {
	const result = await Subject.find({title:req.params.title});
	 return res.json({status:200, message:"success", result})
}




module.exports = { 
	Subjects,
	AddSubject, 
	UpdateSubject, 
	DeleteSubject, 
	SubjectById,
	PushTechnology,
	deleteSubjectTech,
	subjectFindByTitle 

};


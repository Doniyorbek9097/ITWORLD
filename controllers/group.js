const {Group, groupValidate} = require("../models/group");

const getGroups = async(req,res) => {
	const groups = await Group.find();
	return res.json({status:200, message:"success", result:groups});
}

// -------------------------------------------------
// ONE get group
const getGroupById = async (req,res) => {
	const group = await Group.findById(req.params.id);
	console.log(group)
	return res.json({status:200, message:"success", result:group})
}



// -------------------------------------------------

const createGroup = async (req,res) => {
 try {
  const {error} = groupValidate(req.body);
	 if(error) return res.json({ message:error.details[0].message })
	const newGroup = new Group(req.body);
 	const savedGroup = await newGroup.save();
	 return res.json({status:201, message:"success", result:savedGroup})
 } catch (err) {
 	console.log(err)
 }
}
// ------------------------------------------

const editGroup = async (req,res) => {
	const result = await Group.findByIdAndUpdate(req.params.id,req.body);
	return res.json({status:200, message:"success", result});
}



// ------------------------------------------

const deleteGroup = async(req,res)=> {
	try {
	  const delgroup = await Group.findByIdAndRemove(req.params.id);
		return res.json({status:200, message:"success deleted!"})
	} catch (error) {
   console.log(error)		
	}
}

// -------------------

const groupPushStudent = async(req,res) => {
	const result = await Group.findByIdAndUpdate(req.params.id, {$push:{students:req.body.students}});
	return res.json({status:200, message:"seccess", result});
}
// ----------------

const groupStudentDelete = async (req,res) => {
	const group = await Group.findById(req.params.id);
	group.students.splice(parseInt(req.params.index),1);
  const deleted =  await group.save();
	return res.json({status:200, message:"success deleted!", result:deleted})
}

// ------------------
// group search by name
const searchGroup = async (req,res) => {
	const result = await Group.findOne({name:req.params.name});
	return res.json({status:200, message:"success", result})
}

// -------------------------
// group searched student update
const groupStudentUpdate = async (req,res) => {
	const group = await Group.updateOne({_id:req.body._id, "students.name":req.body.name}, {
		$set: {
			"students.$.name":req.body.name,
			"students.$.price":req.body.price
				}
	});
	return res.json({status:200, message:"success updated!"})
} 

	
module.exports = {
	createGroup,
	getGroups,
	getGroupById,
	editGroup,
	deleteGroup,
	groupPushStudent,
	groupStudentDelete,
	searchGroup,
	groupStudentUpdate
}
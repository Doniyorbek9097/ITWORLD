const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User, userValidate } = require("../models/users");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
// -----------------------------------------
const createUser = async(req,res) => {
try {
const { error } = userValidate(req.body);
if(error) return res.json({message:error.details[0].message})

let user = await User.findOne({email:req.body.email});
if(user) return res.json({status:409, message:"Berilgan emailga ro'yhatga olingan!"})

const salt = await bcrypt.genSalt(parseInt(process.env.SOLT));
const hashPassword = await bcrypt.hash(req.body.password, salt);
	
 user = await new User({...req.body, password:hashPassword}).save();
	console.log(user)

			const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
	const userEmail =	await sendEmail(user.email, "Elektron pochtani tasdiqlang", url);


	 return res.json({ status:201, message:userEmail.message});

} catch (err) {
	console.log(err)
}
	
}

// -----------------------------------------

const Users = async() => {
try {
	const users = await User.find();
	return res.json({status:200, message:"success", result:users });
} catch (err) {
	console.log(err)
}
} 



const VerifyUser = async (req,res) => {
		try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Havola noto‘g‘ri" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Havola noto‘g‘ri" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Elektron pochta muvaffaqiyatli tasdiqlandi" });
	} catch (error) {
		res.status(500).send({ message: "Serverdagi ichki xatolik!" });
	}

}






module.exports = {createUser, Users, VerifyUser };
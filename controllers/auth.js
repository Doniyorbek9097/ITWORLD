const router = require("express").Router();
const { User } = require("../models/users");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const Auth =  async (req, res) => {
	try {

		const { error } = validate(req.body);
		if (error) return res.json({status:400, message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		console.log(user)
		if (!user) return res.json({status:401, message: "Parol yoki Email xato" });

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) return res.json({status:401, message: "Parol yoki Email xato" });

		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			console.log(token)
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
			}
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
		await sendEmail(user.email, "Elektron pochtani tasdiqlang", url);

		return res.json({status:201, message:"Biz sizning Elektron pochta hisobingizga ro'yxatdan o'tish uchun tasdiqlash havolasini yubordik iltimos tasdiqlang! "});
		}


		const token = await user.generateAuthToken();

		res.json({status:200, token, message: "muvaffaqiyatli tizimga kirdingiz!" });
	} catch (error) {
		res.status(500).send({ message: "Serverda xatolik bor!" });
	}
};

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = Auth;


const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			// host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			// logger: true,
      // debug: true,
      // ignoreTLS: true, // add this 
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: process.env.USER,
			subject: subject,
			text: text,
		});
		console.log("email send successfully");
		return {status:200, message:`Biz sizning ${email} emailingizga tasdiqlovchi havola yubordik! iltimos tasdiqlang!`};
	} catch (error) {
		console.log("email not send!");
		console.log(error);
		return {status:404, message:"Hozirgi paytda server ishlamayapti..."};
	}
};

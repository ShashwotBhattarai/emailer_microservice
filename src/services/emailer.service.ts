import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EmailPayload } from "../validators/emailPayload.validator";

dotenv.config();

export class EmailerService {
	async sendMail(emailPayload: EmailPayload) {
		const transporter = nodemailer.createTransport({
		  service: process.env.SERVICE,
		  auth: {
		    user: process.env.EMAILER,
		    pass: process.env.PASSWORD,
		  },
		});

		// const transporter = nodemailer.createTransport({
		// 	host: "mail@baseraboutiquehotel.com.np",
		// 	port: 465,
		// 	secure: false, // upgrade later with STARTTLS
		// 	auth: {
		// 		user: "sulav@baseraboutiquehotel.com.np",
		// 		pass: "Nepal@1234",
		// 	},
		// });

		// transporter.verify(function (error, success) {
		// 	if (error) {
		// 		console.log(error);
		// 	} else {
		// 		console.log("Server is ready to take our messages");
		// 	}
		// });

		const mailOptions = {
			from: process.env.EMAILER,
			to: emailPayload.to,
			subject: emailPayload.subject,
			text: emailPayload.text,
		};

		try {
			const result = await transporter.sendMail(mailOptions);
			return {
				status: 200,
				message: "Email sent successfully",
			};
		} catch (error) {
			console.log("Email send failed with error:", error);
			return {
				status: 500,
				message: error,
			};
		}
	}
}

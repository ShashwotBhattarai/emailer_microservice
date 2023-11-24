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

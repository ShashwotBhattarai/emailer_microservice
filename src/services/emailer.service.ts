import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EmailPayload } from "../types/emailPayload.type";
import logger from "../configs/logger.config";

dotenv.config();

export class EmailerService {
  async sendMail(emailPayload: EmailPayload) {
    const transporter = nodemailer.createTransport({
      secure: true,
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
      await transporter.sendMail(mailOptions);
      logger.info("Email sent successfully");
      return {
        status: 200,
        message: "Email sent successfully",
      };
    } catch (error) {
      logger.error("Unknown error in sending email", error);
      return {
        status: 500,
        message: error,
      };
    }
  }
}

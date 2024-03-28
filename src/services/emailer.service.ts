import nodemailer from "nodemailer";
import { EmailPayload } from "../models/emailPayload.type";
import logger from "../configs/logger.config";
import { envVars } from "../configs/envVars.config";
import { ServiceResponse } from "../models/serviceResponse.type";

export class EmailerService {
  async sendMail(emailPayload: EmailPayload): Promise<ServiceResponse> {
    const transporter = nodemailer.createTransport({
      secure: true,
      service: envVars.SERVICE,
      auth: {
        user: envVars.EMAILER,
        pass: envVars.PASSWORD,
      },
    });

    const mailOptions = {
      from: envVars.EMAILER,
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
        message: "Unknown error in sending email",
      };
    }
  }
}

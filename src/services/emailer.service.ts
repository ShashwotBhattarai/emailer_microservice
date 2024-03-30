import { EmailPayload } from "../models/emailPayload.type";
import logger from "../configs/logger.config";
import { envVars } from "../configs/envVars.config";
import { ServiceResponse } from "../models/serviceResponse.type";
import transporter from "../configs/nodemailerTransport.config";

export class EmailerService {
  async sendMail(emailPayload: EmailPayload): Promise<ServiceResponse> {
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

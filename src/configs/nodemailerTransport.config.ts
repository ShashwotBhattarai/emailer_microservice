import nodemailer from "nodemailer";
import { envVars } from "./envVars.config";

const transporter = nodemailer.createTransport({
  secure: true,
  service: envVars.SERVICE,
  auth: {
    user: envVars.EMAILER,
    pass: envVars.PASSWORD,
  },
});

export default transporter;

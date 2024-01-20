"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_config_1 = __importDefault(require("../configs/logger.config"));
dotenv_1.default.config();
class EmailerService {
    sendMail(emailPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
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
                yield transporter.sendMail(mailOptions);
                logger_config_1.default.info("Email sent successfully");
                return {
                    status: 200,
                    message: "Email sent successfully",
                };
            }
            catch (error) {
                logger_config_1.default.error("Unknown error in sending email", error);
                return {
                    status: 500,
                    message: error,
                };
            }
        });
    }
}
exports.EmailerService = EmailerService;

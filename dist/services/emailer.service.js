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
dotenv_1.default.config();
class EmailerService {
    sendMail(emailPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            // const transporter = nodemailer.createTransport({
            //   service: process.env.SERVICE,
            //   auth: {
            //     user: process.env.EMAILER,
            //     pass: process.env.PASSWORD,
            //   },
            // });
            const transporter = nodemailer_1.default.createTransport({
                host: "mail@baseraboutiquehotel.com.np",
                port: 465,
                secure: false,
                auth: {
                    user: "sulav@baseraboutiquehotel.com.np",
                    pass: "Nepal@1234",
                },
            });
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Server is ready to take our messages");
                }
            });
            const mailOptions = {
                from: process.env.EMAILER,
                to: emailPayload.to,
                subject: emailPayload.subject,
                text: emailPayload.text,
            };
            try {
                const result = yield transporter.sendMail(mailOptions);
                return {
                    status: 200,
                    message: "Email sent successfully",
                };
            }
            catch (error) {
                console.log("Email send failed with error:", error);
                return {
                    status: 500,
                    message: error,
                };
            }
        });
    }
}
exports.EmailerService = EmailerService;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailerService = void 0;
const nodemailer = require("nodemailer");
class EmailerService {
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "shashwot.media@gmail.com",
                    pass: "igfi bakt gsgh graj",
                },
            });
            const mailOptions = {
                from: "shashwot.media@gmail.com",
                to: "babudallay@gmail.com,acstockthankot@gmail.com",
                subject: "Welcome to NodeJS App",
                text: "This is an email using nodemail in nodejs, chalyo re chalyo",
            };
            try {
                const result = yield transporter.sendMail(mailOptions);
                console.log("Email sent successfully");
            }
            catch (error) {
                console.log("Email send failed with error:", error);
            }
        });
    }
}
exports.EmailerService = EmailerService;

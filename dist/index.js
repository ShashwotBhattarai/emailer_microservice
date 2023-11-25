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
const node_cron_1 = __importDefault(require("node-cron"));
const emailer_service_1 = require("./services/emailer.service");
const sqs_service_1 = require("./services/sqs.service");
function listenToSQS() {
    return __awaiter(this, void 0, void 0, function* () {
        let messages = [];
        const response = yield new sqs_service_1.SQS_Service().receiveMessageFromQueue();
        if (response.status == 200) {
            messages = response.message;
            for (let message of messages) {
                const emailPayload = {
                    to: message.MessageAttributes.To.StringValue,
                    subject: message.MessageAttributes.Subject.StringValue,
                    text: message.Body,
                };
                const sendmailResponse = yield new emailer_service_1.EmailerService().sendMail(emailPayload);
                console.log(sendmailResponse);
            }
        }
        else {
            console.log(response.message);
        }
    });
}
node_cron_1.default.schedule('*/30 * * * * *', listenToSQS);

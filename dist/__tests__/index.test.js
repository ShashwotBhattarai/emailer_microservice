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
const index_1 = require("../index");
const emailer_service_1 = require("../services/emailer.service");
const sqs_service_1 = require("../services/sqs.service");
describe("listenToSQS", () => {
    it("should send eamil if there is message present ", () => __awaiter(void 0, void 0, void 0, function* () {
        const messages = [
            {
                MessageAttributes: {
                    To: { StringValue: "recipient@example.com" },
                    Subject: { StringValue: "Test Subject" },
                },
                Body: "Test message body",
            },
            {
                MessageAttributes: {
                    To: { StringValue: "recipient@example.com" },
                    Subject: { StringValue: "Test Subject" },
                },
                Body: "Test message body",
            },
        ];
        const sqsSpy = jest.spyOn(sqs_service_1.SQSService.prototype, "receiveMessageFromQueue");
        sqsSpy.mockResolvedValue({ status: 200, message: "messages found in queue", data: messages });
        const emailerSpy = jest.spyOn(emailer_service_1.EmailerService.prototype, "sendMail");
        emailerSpy.mockResolvedValue({ status: 200, message: "Email sent successfully" });
        (0, index_1.listenToSQS)();
        expect(sqsSpy).toHaveBeenCalled();
    }));
    it("should conosle.log no message in queue to send if no message present ", () => __awaiter(void 0, void 0, void 0, function* () {
        const sqsSpy = jest.spyOn(sqs_service_1.SQSService.prototype, "receiveMessageFromQueue");
        sqsSpy.mockResolvedValue({ status: 404, message: "No message in queue to fetch for now", data: null });
        (0, index_1.listenToSQS)();
        expect(sqsSpy).toHaveBeenCalled();
    }));
});

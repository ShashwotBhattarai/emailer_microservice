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
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailer_service_1 = require("../services/emailer.service"); // Adjust the import path
jest.mock("nodemailer", () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn(),
    }),
}));
describe("EmailerService", () => {
    let mockTransporter;
    beforeEach(() => {
        mockTransporter = nodemailer_1.default.createTransport();
        jest.clearAllMocks();
    });
    it("should send an email successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailPayload = {
            to: "test@example.com",
            subject: "Test Subject",
            text: "Test Message",
        };
        mockTransporter.sendMail.mockResolvedValue({
        /* Mocked sendMail response */
        });
        const emailerService = new emailer_service_1.EmailerService();
        const response = yield emailerService.sendMail(emailPayload);
        expect(mockTransporter.sendMail).toHaveBeenCalledWith(expect.objectContaining(emailPayload));
        expect(response).toEqual({ status: 200, message: "Email sent successfully" });
    }));
    it("should handle errors when sending an email", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailPayload = {
            to: "test@example.com",
            subject: "Test Subject",
            text: "Test Message",
        };
        const mockError = new Error("Failed to send email");
        mockTransporter.sendMail.mockRejectedValue(mockError);
        const emailerService = new emailer_service_1.EmailerService();
        const response = yield emailerService.sendMail(emailPayload);
        expect(mockTransporter.sendMail).toHaveBeenCalledWith(expect.objectContaining(emailPayload));
        expect(response).toEqual({ status: 500, message: mockError });
    }));
});

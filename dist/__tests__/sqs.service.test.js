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
const client_sqs_1 = require("@aws-sdk/client-sqs");
const aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
const sqs_service_1 = require("../services/sqs.service");
describe("Sqs service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("more than one messages in queue received", () => __awaiter(void 0, void 0, void 0, function* () {
        const sqsClientMock = (0, aws_sdk_client_mock_1.mockClient)(client_sqs_1.SQSClient);
        const mockMessages = [{ Body: "Message 1" }, { Body: "Message 2" }, { Body: "Message 3" }];
        sqsClientMock.on(client_sqs_1.ReceiveMessageCommand).resolves({
            Messages: mockMessages,
        });
        const result = yield new sqs_service_1.SQSService().receiveMessageFromQueue();
        expect(result.status).toBe(200);
        expect(result.data).toBe(mockMessages);
        expect(result.message).toBe("messages present in sqs queue");
    }));
    test("one messages in queue received", () => __awaiter(void 0, void 0, void 0, function* () {
        const sqsClientMock = (0, aws_sdk_client_mock_1.mockClient)(client_sqs_1.SQSClient);
        const mockMessages = [{ Body: "Message 1" }];
        sqsClientMock.on(client_sqs_1.ReceiveMessageCommand).resolves({
            Messages: mockMessages,
        });
        const result = yield new sqs_service_1.SQSService().receiveMessageFromQueue();
        expect(result.status).toBe(200);
        expect(result.message).toBe("messages present in sqs queue");
        expect(result.data).toBe(mockMessages);
    }));
    test("no messages in queue received", () => __awaiter(void 0, void 0, void 0, function* () {
        const sqsClientMock = (0, aws_sdk_client_mock_1.mockClient)(client_sqs_1.SQSClient);
        sqsClientMock.on(client_sqs_1.ReceiveMessageCommand).resolves({
            Messages: [],
        });
        const result = yield new sqs_service_1.SQSService().receiveMessageFromQueue();
        expect(result.status).toBe(404);
        expect(result.message).toBe("No message in queue to fetch for now");
    }));
    test("sqs error occures", () => __awaiter(void 0, void 0, void 0, function* () {
        const sqsClientMock = (0, aws_sdk_client_mock_1.mockClient)(client_sqs_1.SQSClient);
        sqsClientMock.on(client_sqs_1.ReceiveMessageCommand).rejects(new Error("SQS Error"));
        const result = yield new sqs_service_1.SQSService().receiveMessageFromQueue();
        expect(result.status).toBe(500);
    }));
});

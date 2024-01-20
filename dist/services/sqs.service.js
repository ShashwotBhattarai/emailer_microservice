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
exports.SQSService = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const dotenv_1 = __importDefault(require("dotenv"));
const createSQSClient_service_1 = require("./createSQSClient.service");
const logger_config_1 = __importDefault(require("../configs/logger.config"));
dotenv_1.default.config();
class SQSService {
    receiveMessageFromQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createSQSClientResponse = yield (0, createSQSClient_service_1.createSQSClient)();
                const client = createSQSClientResponse.data;
                const sqsQueueUrl = process.env.SQS_QUEUE_URL;
                const { Messages } = yield client.send(new client_sqs_1.ReceiveMessageCommand({
                    AttributeNames: [],
                    MaxNumberOfMessages: 10,
                    MessageAttributeNames: ["All"],
                    QueueUrl: sqsQueueUrl,
                    WaitTimeSeconds: 20,
                    VisibilityTimeout: 20,
                }));
                if (!Messages || Messages.length === 0) {
                    return { status: 404, message: "No message in queue to fetch for now", data: null };
                }
                else if (Messages.length === 1) {
                    yield client.send(new client_sqs_1.DeleteMessageCommand({
                        QueueUrl: sqsQueueUrl,
                        ReceiptHandle: Messages[0].ReceiptHandle,
                    }));
                }
                else {
                    yield client.send(new client_sqs_1.DeleteMessageBatchCommand({
                        QueueUrl: sqsQueueUrl,
                        Entries: Messages.map((message) => ({
                            Id: message.MessageId,
                            ReceiptHandle: message.ReceiptHandle,
                        })),
                    }));
                }
                logger_config_1.default.info("Messages present in sqs queue");
                return { status: 200, message: "messages present in sqs queue", data: Messages };
            }
            catch (error) {
                return { status: 500, message: "unknown error in sqs service", data: error };
            }
        });
    }
}
exports.SQSService = SQSService;

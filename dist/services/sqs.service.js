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
exports.SQS_Service = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class SQS_Service {
    receiveMessageFromQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new client_sqs_1.SQSClient({
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
                    },
                    region: process.env.AWS_REGION || "",
                });
                const sqsQueueUrl = process.env.SQS_QUEUE_URL;
                const { Messages } = yield client.send(new client_sqs_1.ReceiveMessageCommand({
                    AttributeNames: [],
                    MaxNumberOfMessages: 10,
                    MessageAttributeNames: ["All"],
                    QueueUrl: sqsQueueUrl,
                    WaitTimeSeconds: 20,
                    VisibilityTimeout: 20,
                }));
                if (!Messages) {
                    return { status: 404, message: "No message in queue to fetch for now" };
                }
                if (Messages.length === 1) {
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
                return { status: 200, message: Messages };
            }
            catch (error) {
                return { status: 500, message: error };
            }
        });
    }
}
exports.SQS_Service = SQS_Service;

import {
  ReceiveMessageCommand,
  DeleteMessageCommand,
  DeleteMessageBatchCommand,
} from "@aws-sdk/client-sqs";
import { envVars } from "../configs/envVars.config";
import sqsClient from "../configs/sqsClient.config";
import logger from "../configs/logger.config";
import { ServiceResponse } from "../models/serviceResponse.type";

export class SQSService {
  public async receiveMessageFromQueue(): Promise<ServiceResponse> {
    try {
      const sqsQueueUrl = envVars.SQS_QUEUE_URL;

      const { Messages } = await sqsClient.send(
        new ReceiveMessageCommand({
          AttributeNames: [],
          MaxNumberOfMessages: 10,
          MessageAttributeNames: ["All"],
          QueueUrl: sqsQueueUrl,
          WaitTimeSeconds: 20,
          VisibilityTimeout: 20,
        }),
      );

      if (!Messages || Messages.length === 0) {
        return {
          status: 404,
          message: "No message in queue to fetch for now",
        };
      } else if (Messages.length === 1) {
        await sqsClient.send(
          new DeleteMessageCommand({
            QueueUrl: sqsQueueUrl,
            ReceiptHandle: Messages[0].ReceiptHandle,
          }),
        );
      } else {
        await sqsClient.send(
          new DeleteMessageBatchCommand({
            QueueUrl: sqsQueueUrl,
            Entries: Messages.map((message) => ({
              Id: message.MessageId,
              ReceiptHandle: message.ReceiptHandle,
            })),
          }),
        );
      }
      logger.info("Messages present in sqs queue");

      return {
        status: 200,
        message: "messages present in sqs queue",
        data: Messages,
      };
    } catch (error) {
      return {
        status: 500,
        message: "unknown error in sqs service",
        data: error,
      };
    }
  }
}

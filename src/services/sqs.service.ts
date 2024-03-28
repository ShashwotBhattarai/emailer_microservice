import {
  ReceiveMessageCommand,
  DeleteMessageCommand,
  DeleteMessageBatchCommand,
} from "@aws-sdk/client-sqs";
import { envVars } from "../configs/envVars.config";
import SQSClientService from "./createSQSClient.service";
import logger from "../configs/logger.config";
import { ServiceResponse } from "../models/serviceResponse.type";

export class SQSService {
  public async receiveMessageFromQueue(): Promise<ServiceResponse> {
    try {
      const createSQSClientResponse =
        await new SQSClientService().createSQSClient();
      const client = createSQSClientResponse.client;

      const sqsQueueUrl = envVars.SQS_QUEUE_URL;
      if (client) {
        const { Messages } = await client.send(
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
          await client.send(
            new DeleteMessageCommand({
              QueueUrl: sqsQueueUrl,
              ReceiptHandle: Messages[0].ReceiptHandle,
            }),
          );
        } else {
          await client.send(
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
      } else {
        return {
          status: 500,
          message: "client is undefined",
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: "unknown error in sqs service",
        data: error,
      };
    }
  }
}

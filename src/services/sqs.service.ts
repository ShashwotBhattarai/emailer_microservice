import { ReceiveMessageCommand, DeleteMessageCommand, SQSClient, DeleteMessageBatchCommand } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";

dotenv.config();
export class SQS_Service {
	async receiveMessageFromQueue() {
		try {
			const client = new SQSClient({
				credentials: {
					accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
				},
				region: process.env.AWS_REGION || "",
			});
			const sqsQueueUrl = process.env.SQS_QUEUE_URL;

			const { Messages } = await client.send(
				new ReceiveMessageCommand({
					AttributeNames: [],
					MaxNumberOfMessages: 10,
					MessageAttributeNames: ["All"],
					QueueUrl: sqsQueueUrl,
					WaitTimeSeconds: 20,
					VisibilityTimeout: 20,
				})
			);

			if (!Messages || Messages.length === 0) {
				return { status: 404, message: "No message in queue to fetch for now" };
			}

			if (Messages.length === 1) {
				await client.send(
					new DeleteMessageCommand({
						QueueUrl: sqsQueueUrl,
						ReceiptHandle: Messages[0].ReceiptHandle,
					})
				);
			} else if (Messages.length > 1) {
				await client.send(
					new DeleteMessageBatchCommand({
						QueueUrl: sqsQueueUrl,
						Entries: Messages.map((message) => ({
							Id: message.MessageId,
							ReceiptHandle: message.ReceiptHandle,
						})),
					})
				);
			}

			return { status: 200, message: Messages };
		} catch (error) {
			return { status: 500, message: error };
		}
	}
}

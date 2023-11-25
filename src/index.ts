import cron from "node-cron";
import { EmailerService } from "./services/emailer.service";
import { EmailPayload } from "./validators/emailPayload.validator";
import { SQS_Service } from "./services/sqs.service";

async function listenToSQS() {
	let messages: any = [];
	const response = await new SQS_Service().receiveMessageFromQueue();

	if (response.status == 200) {
		messages = response.message;

		for (let message of messages) {
			const emailPayload: EmailPayload = {
				to: message.MessageAttributes.To.StringValue,
				subject: message.MessageAttributes.Subject.StringValue,
				text: message.Body,
			};
			const sendmailResponse = await new EmailerService().sendMail(emailPayload);

			console.log(sendmailResponse.message);
		}
	} else {
		console.log(response.message);
	}
}

cron.schedule("*/30 * * * * *", listenToSQS);

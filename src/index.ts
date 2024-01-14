import cron from "node-cron";
import { EmailerService } from "./services/emailer.service";
import { EmailPayload } from "./types/emailPayload.type";
import { SQSService } from "./services/sqs.service";

export function listenToSQS() {
	(async () => {
		console.log("Listening to SQS");
		let messages: any = [];
		const response = await new SQSService().receiveMessageFromQueue();

		if (response.status == 200) {
			messages = response.data;

			for (const message of messages) {
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
	})();
}
cron.schedule("*/30 * * * * *", listenToSQS);

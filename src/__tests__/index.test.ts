import { listenToSQS } from "../index";
import { EmailerService } from "../services/emailer.service";
import { SQS_Service } from "../services/sqs.service";

describe("listenToSQS", () => {
	it("should send eamil if there is message present ", async () => {
		const messages: any = [
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
		const sqsSpy = jest.spyOn(SQS_Service.prototype, "receiveMessageFromQueue");
		sqsSpy.mockResolvedValue({ status: 200, message: "messages found in queue", data: messages });

		const emailerSpy = jest.spyOn(EmailerService.prototype, "sendMail");
		emailerSpy.mockResolvedValue({ status: 200, message: "Email sent successfully" });

		const response = await listenToSQS();
		expect(sqsSpy).toHaveBeenCalled();
	});
	it("should conosle.log no message in queue to send if no message present ", async () => {
		const sqsSpy = jest.spyOn(SQS_Service.prototype, "receiveMessageFromQueue");
		sqsSpy.mockResolvedValue({ status: 404, message: "No message in queue to fetch for now", data: null });

		await listenToSQS();
		expect(sqsSpy).toHaveBeenCalled();
		
	});
});

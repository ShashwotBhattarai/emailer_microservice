import { listenToSQS } from "../services/listenToSQSQueue.service";
import { EmailerService } from "../services/emailer.service";
import { SQSService } from "../services/sqs.service";

describe("listenToSQS", () => {
  it("should send eamil if there is message present ", async () => {
    const messages = [
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
    const sqsSpy = jest.spyOn(SQSService.prototype, "receiveMessageFromQueue");
    sqsSpy.mockResolvedValue({
      status: 200,
      message: "messages found in queue",
      data: messages,
    });

    const emailerSpy = jest.spyOn(EmailerService.prototype, "sendMail");
    emailerSpy.mockResolvedValue({
      status: 200,
      message: "Email sent successfully",
    });

    listenToSQS();
    expect(sqsSpy).toHaveBeenCalled();
  });
  it("should conosle.log no message in queue to send if no message present ", async () => {
    const sqsSpy = jest.spyOn(SQSService.prototype, "receiveMessageFromQueue");
    sqsSpy.mockResolvedValue({
      status: 404,
      message: "No message in queue to fetch for now",
      data: null,
    });

    listenToSQS();
    expect(sqsSpy).toHaveBeenCalled();
  });
});

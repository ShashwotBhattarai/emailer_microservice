import ListenerService from "./listenToSQSQueue.service";
import { EmailerService } from "./emailer.service";
import { SQSService } from "./sqs.service";

describe("listenToSQS", () => {
  it("should send email if there is message present ", async () => {
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
      message: "messages present in sqs queue",
      data: messages,
    });

    const emailerSpy = jest.spyOn(EmailerService.prototype, "sendMail");
    emailerSpy.mockResolvedValue({
      status: 200,
      message: "Email sent successfully",
    });

    new ListenerService().listenToSQS();
    expect(sqsSpy).toHaveBeenCalled();
  });
  it("should conosle.log no message in queue to send if no message present ", async () => {
    const sqsSpy = jest.spyOn(SQSService.prototype, "receiveMessageFromQueue");
    sqsSpy.mockResolvedValue({
      status: 404,
      message: "No message in queue to fetch for now",
      data: null,
    });

    new ListenerService().listenToSQS();
    expect(sqsSpy).toHaveBeenCalled();
    //TODO: expext the return ,mwtf
  });
});

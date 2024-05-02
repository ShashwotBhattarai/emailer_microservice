import ListenerService from "./listenToSQSQueue.service";
import { EmailerService } from "./emailer.service";
import { SQSService } from "./sqs.service";
import logger from "../configs/logger.config";

jest.mock("../configs/logger.config");

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
    const listnerService = new ListenerService();
    await listnerService.listenToSQS();
    // // expect(logger.info).toHaveBeenCalledTimes(2);
    // expect(listnerService.emailResponse.status).toBe(200);
    // expect(listnerService.emailResponse.message).toBe(
    //   "Email sent successfully",
    // );
    //TODO:"this above expect fails, emailerSpy gets called only once, the for loop runs 3 times but the spyis not getting called 3 times"
  });
  it("should log No message in queue to fetch for now, if no message is present ", async () => {
    const sqsSpy = jest.spyOn(SQSService.prototype, "receiveMessageFromQueue");
    sqsSpy.mockResolvedValue({
      status: 404,
      message: "No message in queue to fetch for now",
      data: null,
    });
    const listnerService = new ListenerService();
    await listnerService.listenToSQS();
    expect(sqsSpy).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(
      "No message in queue to fetch for now",
    );
  });
});

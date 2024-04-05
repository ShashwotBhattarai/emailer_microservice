import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { mockClient } from "aws-sdk-client-mock";
import { SQSService } from "./sqs.service";

describe("Sqs service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 200 and ^messages present in sqs queue^, if messages are present in queue", async () => {
    const sqsClientMock = mockClient(SQSClient);
    const mockMessages = [
      { Body: "Message 1" },
      { Body: "Message 2" },
      { Body: "Message 3" },
    ];
    sqsClientMock.on(ReceiveMessageCommand).resolves({
      Messages: mockMessages,
    });

    const result = await new SQSService().receiveMessageFromQueue();

    expect(result.status).toBe(200);
    expect(result.message).toBe("messages present in sqs queue");
  });
  it("should return, status 200, messages present in sqs queue,if one messages in queue received", async () => {
    const sqsClientMock = mockClient(SQSClient);
    const mockMessages = [{ Body: "Message 1" }];
    sqsClientMock.on(ReceiveMessageCommand).resolves({
      Messages: mockMessages,
    });

    const result = await new SQSService().receiveMessageFromQueue();

    expect(result.status).toBe(200);
    expect(result.message).toBe("messages present in sqs queue");
  });

  it("should return status 404,and No message in queue to fetch for now, if  no messages in queue is received", async () => {
    const sqsClientMock = mockClient(SQSClient);
    sqsClientMock.on(ReceiveMessageCommand).resolves({
      Messages: [],
    });

    const result = await new SQSService().receiveMessageFromQueue();

    expect(result.status).toBe(404);
    expect(result.message).toBe("No message in queue to fetch for now");
  });

  it("should return status 500 if sqs error occurs", async () => {
    const sqsClientMock = mockClient(SQSClient);
    sqsClientMock.on(ReceiveMessageCommand).rejects(new Error("SQS Error"));

    const result = await new SQSService().receiveMessageFromQueue();

    expect(result.status).toBe(500);
  });
});

import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { mockClient } from "aws-sdk-client-mock";
import { SQSService } from "../services/sqs.service";

describe("Sqs service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("more than one messages in queue received", async () => {
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
    expect(result.data).toBe(mockMessages);
    expect(result.message).toBe("messages present in sqs queue");
  });
  test("one messages in queue received", async () => {
    const sqsClientMock = mockClient(SQSClient);
    const mockMessages = [{ Body: "Message 1" }];
    sqsClientMock.on(ReceiveMessageCommand).resolves({
      Messages: mockMessages,
    });

    const result = await new SQSService().receiveMessageFromQueue();

    expect(result.status).toBe(200);
    expect(result.message).toBe("messages present in sqs queue");
    expect(result.data).toBe(mockMessages);
  });

  test("no messages in queue received", async () => {
    const sqsClientMock = mockClient(SQSClient);
    sqsClientMock.on(ReceiveMessageCommand).resolves({
      Messages: [],
    });

    const result = await new SQSService().receiveMessageFromQueue();

    expect(result.status).toBe(404);
    expect(result.message).toBe("No message in queue to fetch for now");
  });

  test("sqs error occures", async () => {
    const sqsClientMock = mockClient(SQSClient);
    sqsClientMock.on(ReceiveMessageCommand).rejects(new Error("SQS Error"));

    const result = await new SQSService().receiveMessageFromQueue();

    expect(result.status).toBe(500);
  });
});

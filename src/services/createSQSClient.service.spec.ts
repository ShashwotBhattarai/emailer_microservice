import SQSClientService from "./createSQSClient.service";
import { SQSClient } from "@aws-sdk/client-sqs";

jest.mock("../configs/envVars.config", () => ({
  envVars: {
    AWS_ACCESS_KEY_ID: "",
    AWS_SECRET_ACCESS_KEY: "",
    AWS_REGION: "",
  },
}));

describe("createSQSClient", () => {
  it("should return an SQSClient", async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("../configs/envVars.config").envVars = {
      AWS_ACCESS_KEY_ID: "fakeKeyId",
      AWS_SECRET_ACCESS_KEY: "fakeAccessKey",
      AWS_REGION: "fakeRegion",
    };
    const response = await new SQSClientService().createSQSClient();
    expect(response.status).toEqual(200);
    expect(response.message).toEqual("SQSClient created");
    expect(response.client).toBeInstanceOf(SQSClient);
  });
  it("should throw an error if environment variables are missing", async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("../configs/envVars.config").envVars = {
      AWS_ACCESS_KEY_ID: "",
      AWS_SECRET_ACCESS_KEY: "",
      AWS_REGION: "",
    };

    await expect(new SQSClientService().createSQSClient()).rejects.toEqual(
      new Error("error in createSQSClient"),
    );
  });
});

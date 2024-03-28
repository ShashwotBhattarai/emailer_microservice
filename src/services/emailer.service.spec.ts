import nodemailer from "nodemailer";
import { EmailerService } from "./emailer.service";
import { EmailPayload } from "../models/emailPayload.type";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn(),
  }),
}));
describe("EmailerService", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockTransporter: any;

  beforeEach(() => {
    mockTransporter = nodemailer.createTransport();
    jest.clearAllMocks();
  });

  it("should send an email successfully", async () => {
    const emailPayload: EmailPayload = {
      to: "test@example.com",
      subject: "Test Subject",
      text: "Test Message",
    };
    mockTransporter.sendMail.mockResolvedValue({});

    const emailerService = new EmailerService();
    const response = await emailerService.sendMail(emailPayload);

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining(emailPayload),
    );
    expect(response).toEqual({
      status: 200,
      message: "Email sent successfully",
    });
  });
  it("should handle errors when sending an email", async () => {
    const emailPayload: EmailPayload = {
      to: "test@example.com",
      subject: "Test Subject",
      text: "Test Message",
    };
    const mockError = "Unknown error in sending email";
    mockTransporter.sendMail.mockRejectedValue(mockError);

    const emailerService = new EmailerService();
    const response = await emailerService.sendMail(emailPayload);

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining(emailPayload),
    );
    expect(response).toEqual({ status: 500, message: mockError });
  });
});

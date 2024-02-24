import nodemailer from "nodemailer";
import { EmailerService } from "../services/emailer.service"; // Adjust the import path
import { EmailPayload } from "../types/emailPayload.type"; // Adjust the import path

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
    mockTransporter.sendMail.mockResolvedValue({
      /* Mocked sendMail response */
    });

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
    const mockError = new Error("Failed to send email");
    mockTransporter.sendMail.mockRejectedValue(mockError);

    const emailerService = new EmailerService();
    const response = await emailerService.sendMail(emailPayload);

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining(emailPayload),
    );
    expect(response).toEqual({ status: 500, message: mockError });
  });
});

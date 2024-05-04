/* eslint-disable @typescript-eslint/no-explicit-any */
import { SQSService } from "./sqs.service";
import { EmailPayload } from "../models/emailPayload.type";
import logger from "../configs/logger.config";
import { EmailerService } from "./emailer.service";

export default class ListenerService {
  public emailResponse: any;

  private emailerService = new EmailerService();
  private sqsService = new SQSService();

  public listenToSQS(): void {
    (async (): Promise<void> => {
      logger.info("Listening to Emailer SQS Queue");
      let messages: any = [];

      const response = await this.sqsService.receiveMessageFromQueue();

      if (response.status === 200) {
        messages = response.data;

        for (const message of messages) {
          const emailPayload: EmailPayload = {
            to: message.MessageAttributes.To.StringValue,
            subject: message.MessageAttributes.Subject.StringValue,
            text: message.Body,
          };

          try {
            this.emailResponse =
              await this.emailerService.sendMail(emailPayload);
          } catch {
            logger.error("error in sendMail");
          }
        }
      } else {
        logger.error(response.message);
      }
    })();
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { SQSService } from "./sqs.service";
import { EmailPayload } from "../models/emailPayload.type";
import logger from "../configs/logger.config";
import { EmailerService } from "./emailer.service";
// import { ServiceResponse } from "../models/serviceResponse.type";

export default class ListenerService {
  public emailResponse: any;

  public emailerService: any;

  public sqsService: any;

  public listenToSQS(): void {
    (async (): Promise<void> => {
      logger.info("Listening to Emailer SQS Queue");
      let messages: any = [];

      this.emailerService = new EmailerService();
      this.sqsService = new SQSService();
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
            // logger.info("emailResponse", this.emailResponse.message);
          } catch (error) {
            logger.error(error);
          }
        }
      } else {
        logger.error(response.message);
      }
    })();
  }
}

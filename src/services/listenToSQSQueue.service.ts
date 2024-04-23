import { SQSService } from "./sqs.service";
import { EmailPayload } from "../models/emailPayload.type";
import logger from "../configs/logger.config";
import { EmailerService } from "./emailer.service";
import { ServiceResponse } from "../models/serviceResponse.type";

export default class ListenerService {
  public emailResponse: ServiceResponse = {
    status: 500,
    message: "Unknown error in sending email",
  };

  public emailerService = new EmailerService();

  public sqsService = new SQSService();
  public listenToSQS(): void {
    (async (): Promise<void> => {
      logger.info("Listening to Emailer SQS Queue");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            logger.info(this.emailResponse.message);
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

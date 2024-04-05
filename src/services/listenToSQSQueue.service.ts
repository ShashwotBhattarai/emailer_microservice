import { SQSService } from "./sqs.service";
import { EmailPayload } from "../models/emailPayload.type";
import logger from "../configs/logger.config";
import { EmailerService } from "./emailer.service";

export default class ListenerService {
  public listenToSQS(): void {
    (async (): Promise<void> => {
      logger.info("Listening to Emailer SQS Queue");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let messages: any = [];
      // let numberOfTimesSendEmailIsCalled = 0;
      const response = await new SQSService().receiveMessageFromQueue();

      if (response.status === 200) {
        messages = response.data;

        for (const message of messages) {
          const emailPayload: EmailPayload = {
            to: message.MessageAttributes.To.StringValue,
            subject: message.MessageAttributes.Subject.StringValue,
            text: message.Body,
          };

          try {
            const sendmailResponse = await new EmailerService().sendMail(
              emailPayload,
            );

            // numberOfTimesSendEmailIsCalled++;

            // console.log(
            //   "numberOfTimesSendEmailIsCalled",
            //   numberOfTimesSendEmailIsCalled,
            // );

            logger.warn(sendmailResponse.message);
          } catch (error) {
            logger.error(error);
          }
        }
      } else {
        logger.info(response.message);
      }
    })();
  }
}

import { SQSService } from "./sqs.service";
import { EmailPayload } from "../types/emailPayload.type";
import logger from "../configs/logger.config";
import { EmailerService } from "./emailer.service";

export function listenToSQS() {
  (async () => {
    logger.info("Listening to Emailer SQS Queue");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let messages: any = [];
    const response = await new SQSService().receiveMessageFromQueue();

    if (response.status == 200) {
      messages = response.data;

      for (const message of messages) {
        const emailPayload: EmailPayload = {
          to: message.MessageAttributes.To.StringValue,
          subject: message.MessageAttributes.Subject.StringValue,
          text: message.Body,
        };
        const sendmailResponse = await new EmailerService().sendMail(
          emailPayload,
        );
        logger.info(sendmailResponse.message);
      }
    } else {
      logger.info(response.message);
    }
  })();
}

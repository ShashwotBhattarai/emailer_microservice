import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { EmailerService } from "./services/emailer.service";
import validateEmailPayloadMiddleware, {
  EmailPayload,
} from "./validators/emailPayload.validator";
const app = express();
app.use(cors());
const port = 4000;

app.use(bodyParser.json());

app.post("/emailer", validateEmailPayloadMiddleware, async (req, res) => {
  const emailPayload: EmailPayload = req.body;

  const sendmailResponse = await new EmailerService().sendMail(req.body);

  res.send(sendmailResponse);
});

app.listen(port, () => {
  console.log(`Emailer Microservice Running at port ${port}`);
});

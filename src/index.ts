import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { EmailerService } from "./services/emailer.service";
const app = express();
app.use(cors());
const port = 4000;

app.use(bodyParser.json());

app.post("/emailer", async (req, res) => {


 const emailPayload= {
    to: "babudallay@gmail.com,acstockthankot@gmail.com",
    subject: "Welcome to NodeJS App",
    text: "This is an email using nodemail in nodejs, chalyo re chalyo",
  }

  
  const sendmailResponse = await new EmailerService().sendMail();

  res.send(sendmailResponse);
});

app.listen(port, () => {
  console.log(`Emailer Microservice Running at port ${port}`);
});

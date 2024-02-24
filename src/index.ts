import express, { Request, Response } from "express";
import cron from "node-cron";
import logger from "./configs/logger.config";
import cors from "cors";
import bodyParser from "body-parser";
import { listenToSQS } from "./services/listenToSQSQueue.service";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";

const app = express();
app.disable("x-powered-by");
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/health", (req: Request, res: Response) => {
  logger.info("Emailer microservice is alive");
  res.status(200).json({ message: "Emailer microservice is alive" });
});

app.listen(port, () => {
  logger.info(`Emailer Microservice Running at port ${port}`);
  logger.info(`API documentation:http://localhost:${port}/doc`);
});

cron.schedule("*/30 * * * * *", listenToSQS);

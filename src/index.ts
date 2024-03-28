import { Request, Response } from "express";
import cron from "node-cron";
import logger from "./configs/logger.config";
import ListenerService from "./services/listenToSQSQueue.service";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";
import app from "./configs/express.config";
import { envVars } from "./configs/envVars.config";
const port = envVars.PORT;

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/health", (req: Request, res: Response) => {
  logger.info("Emailer microservice is alive");
  res.status(200).json({ message: "Emailer microservice is alive" });
});

app.listen(port, () => {
  logger.info(`Emailer Microservice Running at port ${port}`);
  logger.info(`API documentation:http://localhost:${port}/doc`);
});

const listenToSQS = new ListenerService().listenToSQS;

cron.schedule("*/30 * * * * *", listenToSQS);

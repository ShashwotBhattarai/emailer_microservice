import cron from "node-cron";
import logger from "./configs/logger.config";
import ListenerService from "./services/listenToSQSQueue.service";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";
import app from "./configs/express.config";
import { envVars } from "./configs/envVars.config";
const port = envVars.PORT;
import rootRoute from "./routes/root.route";

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/emailer", rootRoute);

app.listen(port, () => {
  logger.info(`Emailer Microservice Running at port ${port}`);
  logger.info(`API documentation:http://localhost:${port}/doc`);
});

const listenerService = new ListenerService();

const listenToSQS = listenerService.listenToSQS;

cron.schedule("*/30 * * * * *", listenToSQS);

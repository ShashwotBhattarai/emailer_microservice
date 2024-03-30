import * as dotenv from "dotenv";
dotenv.config();

export const envVars = {
  EMAILER: process.env.EMAILER,
  PASSWORD: process.env.PASSWORD,
  SERVICE: process.env.SERVICE,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  SQS_QUEUE_URL: process.env.SQS_QUEUE_URL,
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  ACCESS_CONTROL_ALLOW_ORIGIN_URL: process.env.ACCESS_CONTROL_ALLOW_ORIGIN_URL,
};

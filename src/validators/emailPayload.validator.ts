import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
}

const emailPayloadSchema = Joi.object({
  to: Joi.string().email({ multiple: true }).required(),
  subject: Joi.string().required(),
  text: Joi.string().required(),
});

const validateEmailPayloadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailPayload: EmailPayload = req.body;
  const { error, value } = emailPayloadSchema.validate(emailPayload);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default validateEmailPayloadMiddleware;

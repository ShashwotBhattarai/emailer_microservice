"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const emailPayloadSchema = joi_1.default.object({
    to: joi_1.default.string().email({ multiple: true }).required(),
    subject: joi_1.default.string().required(),
    text: joi_1.default.string().required(),
});
const validateEmailPayloadMiddleware = (req, res, next) => {
    const emailPayload = req.body;
    const { error, value } = emailPayloadSchema.validate(emailPayload);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    else {
        next();
    }
};
exports.default = validateEmailPayloadMiddleware;

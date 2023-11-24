"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const emailer_service_1 = require("./services/emailer.service");
const emailPayload_validator_1 = __importDefault(require("./validators/emailPayload.validator"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 4000;
app.use(body_parser_1.default.json());
app.post("/emailer", emailPayload_validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailPayload = req.body;
    const sendmailResponse = yield new emailer_service_1.EmailerService().sendMail(req.body);
    res.send(sendmailResponse);
}));
app.listen(port, () => {
    console.log(`Emailer Microservice Running at port ${port}`);
});

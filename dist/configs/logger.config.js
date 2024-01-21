"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const env = process.env.ENV;
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const formatParams = (info) => {
    const { timestamp, level, message } = info, args = __rest(info, ["timestamp", "level", "message"]);
    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} ${level}:${message} ${Object.keys(args).length ? JSON.stringify(args) : ""}`;
};
const Format = winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.align(), winston_1.format.printf(formatParams));
const transportArray = env === "production"
    ? [new winston_1.transports.File({ filename: "emailerMicroserviceLogs.log", level: "info" })]
    : [new winston_1.transports.Console()];
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: Format,
    transports: transportArray,
});
exports.default = logger;

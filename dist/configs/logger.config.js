"use strict";
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
const env = process.env.ENV;
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const formatParams = (info) => {
    const { timestamp, level, message } = info, args = __rest(info, ["timestamp", "level", "message"]);
    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} ${level}:${message} ${Object.keys(args).length ? JSON.stringify(args) : ""}`;
};
const Format = winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.align(), winston_1.format.printf(formatParams));
const transportArray = env === "production"
    ? [new winston_1.transports.File({ filename: "authMicroserviceLogs.log", level: "info" })]
    : [new winston_1.transports.Console()];
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: Format,
    transports: transportArray,
});
exports.default = logger;

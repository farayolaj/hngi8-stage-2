"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailPassword = exports.mailUser = exports.receiveAddress = exports.senderName = exports.port = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = parseInt(process.env.PORT || '5000');
exports.senderName = process.env.SENDER_NAME || '';
exports.receiveAddress = process.env.RECEIVE_ADDRESS || '';
exports.mailUser = process.env.MAIL_USER || '';
exports.mailPassword = process.env.MAIL_PASSWORD || '';

import dotenv from 'dotenv';

dotenv.config();

export const port = parseInt(process.env.PORT || '5000');
export const senderName = process.env.SENDER_NAME || '';
export const receiveAddress = process.env.RECEIVE_ADDRESS || '';
export const mailUser = process.env.MAIL_USER || '';
export const mailPassword = process.env.MAIL_PASSWORD || '';

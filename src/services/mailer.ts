import nodemailer from 'nodemailer';
import * as config from '../config';

export default class Mailer {
  private static instance: Mailer;
  private transport: nodemailer.Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
      },
    });

    this.transport.verify(function (error, _success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Mail server is ready to take our messages');
      }
    });
  }

  static getMailer(): Mailer {
    if (!Mailer.instance) Mailer.instance = new Mailer();
    return Mailer.instance;
  }

  async notifyMe(name: string, from: string, subject: string, message: string) {
    await this.sendMail({
      to: config.receiveAddress,
      replyTo: `${name} <${from}>`,
      subject,
      message,
    });
  }

  async sendMail({
    to,
    subject,
    replyTo,
    message,
    from,
  }: {
    to: string;
    subject: string;
    replyTo?: string;
    from?: string;
    message: string;
  }) {
    try {
      await this.transport.sendMail({
        to,
        replyTo,
        from: from || `${config.senderName} <${config.receiveAddress}>`,
        subject,
        text: message,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

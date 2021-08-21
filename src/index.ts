import cors from 'cors';
import express from 'express';
import HttpServer from 'http';
import { AddressInfo } from 'net';
import { join } from 'path';
import * as config from './config';
import Mailer from './services/mailer';

const app = express();

// Apply middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(join(process.cwd(), 'public')));

// view engine setup
app.set('views', join(process.cwd(), 'views'));
app.set('view engine', 'pug');

Mailer.getMailer();

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.render('contact-failure');
  }

  console.log(`Mail from ${name}:`);
  console.log(subject);
  console.log(message);

  const mailer = Mailer.getMailer();

  // Send mail to confirm receipt
  mailer.notifyMe(name, email, subject, message);
  mailer.sendMail({
    message: `Hello ${name}.\n\nI have received your message. I will reply within 48 hours.\nThank you\n\nJoshua`,
    subject: `Re: ${subject}`,
    to: email,
  });
  res.render('contact-success', { name });
});

const server = HttpServer.createServer(app);
server.listen(config.port, () => {
  const addressInfo = server.address() as AddressInfo;
  console.log(`Server running at ${addressInfo.address}:${addressInfo.port}`);
});

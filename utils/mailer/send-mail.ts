import path from 'node:path';
import nodemailer from 'nodemailer';
import ejs from 'ejs';

import { config } from '../../config';

const transporter = nodemailer.createTransport({
  service: config.mail.client,
  port: 465, // Port server (587 for TLS or 465 for SSL)
  secure: false, // true for 465, false for another ports
  auth: {
    user: config.mail.user,
    pass: config.mail.password,
  },
});

const fileName = path.join(__dirname, 'templates', 'validation-code.ejs');

export async function sendEmailCode(email: string, code: number) {
  const html = await ejs.renderFile(fileName, { code: code });

  if (!html) {
    console.error('Error: html is empty');
  }

  const mailOptions = {
    from: 'App backend test',
    to: email,
    subject: 'Code for login',
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email code sended for email: ', email);
    return result;
  } catch (err) {
    console.error('Email code not sended for email: ', email, err);
    return err;
  }
}

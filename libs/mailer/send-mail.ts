import nodemailer from 'nodemailer';

export async function sendEmailCode(email: string, code: number) {
  return 'ok';
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // SMTP сервер, например smtp.gmail.com для Gmail
    port: 587, // Порт сервера (587 для TLS или 465 для SSL)
    secure: false, // true для 465, false для других портов
    auth: {
      user: 'your-email@example.com', // Ваша почта
      pass: 'your-email-password', // Пароль или специальный app password
    },
  });

  // Настройки письма
  const mailOptions = {
    from: 'App backend test <test@example.com>',
    to: email,
    subject: 'Ваш код для входа в сайт',
    text: 'This message was sent from Node js server.',
    html: `Your code: <i>${code}</i>.`,
  };

  const result = await transporter.sendMail(mailOptions);

  return result;
}

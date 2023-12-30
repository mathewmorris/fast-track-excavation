import { type NextApiResponse, type NextApiRequest } from 'next';
import { createTransport } from 'nodemailer';
import { env } from 'process';

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

export default async function sendMail(req: NextApiRequest, res: NextApiResponse) {
  // Not the best way, but it will work for now.
  const body: Record<string, string> = req.body as Record<string, string>;

  let text = "";

  for (const key in req.body) {
    text += key + ": " + body[key] + " \n";
  }

  const info = await transporter.sendMail({
    from: env.EMAIL_FROM, // sender address
    to: env.EMAIL_TO, // list of receivers
    subject: env.EMAIL_SUBJECT, // Subject line
    text, // plain text body
  });

  console.dir(info);

  console.log("Message sent: %s", info.messageId);

  res.statusCode = 200;
  res.send('Message sent!');
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}


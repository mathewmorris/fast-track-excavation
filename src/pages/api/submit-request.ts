import { Http2ServerRequest } from 'http2';
import { createTransport } from 'nodemailer';
import { env } from 'process';

const transporter = createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export default async function sendMail(req) {
  console.log(req.body);
  // go over each key/value pair, append to string with \n at end
  let text = "";

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Mat 👻" <hello@mathewmorris.com>', // sender address
    to: "request@mathewmorris.com", // list of receivers
    subject: "Fast Track Excavation Quote Request", // Subject line
    text, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}


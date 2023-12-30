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

const keyMapping: Record<string, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  phone: 'Phone Number',
  bestTime: 'Best Time to contact',
  preferredCommunication: 'Preferred Method of Communication',
  contactless: 'Contactless Preference',
  platformPreference: 'Contactless Platform Preference',
  job: 'Job Description',
  when: 'When to be Done',
}

export default async function sendMail(req: NextApiRequest, res: NextApiResponse) {
  // Not the best way, but it will work for now.
  const body: Record<string, string> = req.body as Record<string, string>;

  let text = "";

  for (const key in req.body) {
    text += keyMapping[key] + ": " + body[key] + " \n";
  }

  if (env.NODE_ENV === "development") {
    console.log("Message intercepted", console.log(text));
    res.statusCode = 200;
    res.send('Message intercepted, to be percieved as successful');
  } else {
    const info = await transporter.sendMail({
      from: env.EMAIL_FROM, // sender address
      to: env.EMAIL_TO, // list of receivers
      subject: env.EMAIL_SUBJECT, // Subject line
      text, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    res.statusCode = 200;
    res.send('Message sent!');
  }
}


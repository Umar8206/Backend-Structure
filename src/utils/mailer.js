// utils/mailSender.js
import nodemailer from 'nodemailer'
import config from '../config/config.js';
const sendMail = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: config.email.smtp.host,
      auth: {
        user: config.email.smtp.auth.user,
        pass:config.email.smtp.auth.pass,
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: config.email.from,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
export default sendMail;
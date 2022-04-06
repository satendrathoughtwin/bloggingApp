import chalk from "chalk";
import nodemailer from "nodemailer";

const sendEmail = async (
  subject = "",
  // text = "",
  html = "",
  RECEIVER_EMAIL
) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: RECEIVER_EMAIL,
    subject,
    // text,
    html,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default sendEmail;

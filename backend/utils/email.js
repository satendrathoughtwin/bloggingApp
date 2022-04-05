import chalk from "chalk";
import nodemailer from "nodemailer";

const sendEmail = async (subject = "", text = "", html = "") => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(chalk.redBright(error.message));
    } else {
      console.log(chalk.greenBright("Email sent: " + info.response));
    }
  });
};

export default sendEmail;

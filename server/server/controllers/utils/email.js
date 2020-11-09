const nodemailer = require("nodemailer");
require("dotenv").config();

//  with nodemailer - still in development****
// Create a transporter
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log("process.env.EMAIL_USERNAME", process.env.EMAIL_USERNAME);
  // Define the email option
  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  console.log(mailOptions);
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { sendEmail };

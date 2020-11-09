const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  const msg = {
    from: process.env.FROM_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  console.log(msg);
  try {
    await sgMail.send(msg);
    return true;
  } catch (err) {
    console.log("email sending error ==> ", err.response.body);
    return false;
  }
};

export { sendEmail };

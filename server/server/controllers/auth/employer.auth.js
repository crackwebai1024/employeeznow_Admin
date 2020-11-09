import Employer from "../../models/employer/basic.model";
import TempEmployer from "../../models/employer/temp.model";
// import { sendEmail } from "../utils/email";
import { sendEmail } from "../utils/sendgridemail";
import errorHandler from "../../helpers/dbErrorHandler";
import randomize from "randomatic";

const sendCodetoEmail = async (req, res) => {
  const userEmail = req.body.email;

  // delete old user email and digit before save
  try {
    await TempEmployer.deleteOne({ email: userEmail });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
  }

  const sixDCode = randomize("0", 6);
  const tempUser = new TempEmployer({
    email: userEmail,
    digitCode: sixDCode,
  });
  //   save user's email and six digit to temporary database
  try {
    await tempUser.save();
  } catch (err) {
    res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }

  const emailData = {
    email: userEmail,
    subject: "Verification Email Address",
    message: ` ${sixDCode} This is for verification of your email. Please use this six digit code for your email verification\n`,
  };
  // send six digit code to user's email address
  try {
    let sendResult = await sendEmail(emailData);
    if (sendResult) {
      return res.status(200).json({
        status: "success",
        message: "digit code sent to email",
      });
    } else {
      return res.status(500).json({ error: "server error" });
    }
  } catch (error) {
    return res.status(500).json({
      error: "There was an error sending to the email. Try again later",
    });
  }
};

const isEmailVerified = async (req, res, next) => {
  let user = {};
  // find user with email
  try {
    user = await TempEmployer.findOne({ email: req.body.email });
    if (user.digitCode === req.body.sixDCode) {
      await next();
    } else {
      res.status(403).json({
        error: "six digit code is invalid, please input another code",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export default { sendCodetoEmail, isEmailVerified };

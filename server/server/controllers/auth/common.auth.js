import crypto from "crypto";
import Employee from "../../models/employee/basic.model";
import Employer from "../../models/employer/basic.model";
import { sendEmail } from "../utils/sendgridemail";
import CRUD from "../utils/general";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../../../config/config";
import errorHandler from "../../helpers/dbErrorHandler";

// create token for signin user
const createToken = (id) => {
  return jwt.sign({ _id: id }, config.jwtSecret);
};

const create = async (req, res, next) => {
  if (req.body.role === "employee") {
    await CRUD.create(Employee, req, res, next);
  } else {
    await CRUD.create(Employer, req, res, next);
  }
};

// check the user signin
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// check the user has auth to access one's data
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.auth && (req.body.id === req.auth._id || req.query.id === req.auth._id);

  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

// user signin with email and password
const signIn = async (req, res) => {
  let user = {};
  let role = req.body.role;
  try {
    // check if the user data is in the database
    if (role === "employee") {
      user = await Employee.findOne({ email: req.body.email });
    }

    if (role === "employer") {
      user = await Employer.findOne({ email: req.body.email });
    }

    if (!user) {
      return res.status("404").json({ error: `${role} not found` });
    }

    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .json({ error: "Email and password don't match." });
    }

    const token = createToken(user._id);
    res.cookie("t", token, { expire: new Date() + 3600000 });

    return res.status(200).json({
      token,
      [role]: {
        _id: user._id,
        email: user.email,
        slug: user.slug,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

//** Forgot Password **/
const forgotPassword = async (req, res) => {
  // Get user by email
  let user;
  if (req.body.role === "employee") {
    user = await Employee.findOne({ email: req.body.email });
  }

  if (req.body.role === "employer") {
    user = await Employer.findOne({ email: req.body.email });
  }

  if (!user) {
    return res.status(404).json({
      error: "There is no user with this email address",
    });
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // Send it to user's email;
  const resetUrl = `${req.protocol}://${req.headers.origin}/resetPassword/${resetToken}`;
  const message = `Someone has requested a link to change your password. 
        You can do this through the button below: ${resetUrl}\n
        If you didn't request this, please ignore this email. `;

  // send message to the user email
  try {
    let sendResult = await sendEmail({
      email: user.email,
      subject: "Your password reset (valid for 10 min)",
      message,
    });

    if (sendResult) {
      return res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } else {
      return res.status(500).json({ error: "server error" });
    }
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      error: "There was an error sending to the email. Try again later",
    });
  }
};

/*reset password*/
const resetPassword = async (req, res) => {
  const { token, newPassword, newPasswordConfirm, role } = req.body;

  // Encrypt request token and compare with db
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  let user;
  if (role === "employee") {
    user = await Employee.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  }

  if (role === "employer") {
    user = Employer.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  }

  //  if token has not expired, and there is user, set the new password
  if (!user) {
    return res.status(400).json({
      error: "Token is invalid or time is expired.",
    });
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();

  try {
    await user.save();
    // Log the user in
    // const token = createToken(user.employeezNowId);
    // console.log("after token");
    // res.cookie("t", token, {
    //   expire: new Date() + 3600,
    // });

    return res.status(200).json({
      token,
      [role]: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "sorry! server error, please reset password again",
    });
  }
};

// check if the user email is used before
const isValidEmail = async (req, res, next) => {
  let Model;
  let role = req.body.role;

  if (role === "employee") {
    Model = Employee;
  } else {
    Model = Employer;
  }

  try {
    let user = await Model.findOne({
      email: req.body.email,
    });
    if (!user && req.body.role === "employee") {
      return res.status("200").json({
        success: "valid email",
      });
    } else if (!user) {
      await next();
    } else {
      return res.status("403").json({
        failed: "invalid email",
      });
    }
  } catch (err) {
    return res.status("500").json({
      error: "server error",
    });
  }
};

// change password(this is not the case that forget the password, but just change old one)
const changePassword = async (req, res) => {
  let Model;
  let role = req.body.role;

  if (role === "employee") {
    Model = Employee;
  } else {
    Model = Employer;
  }

  console.log("request", req.body);
  try {
    let user = await Model.findOne({ _id: req.body.id });
    console.log("user", user);
    if (user.authenticate(req.body.currentPassword)) {
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      await user.save();
      res.status(200).json({
        success: "password successfully updated",
      });
    } else {
      res.status(403).json({
        error: "current password is not correct",
      });
    }
  } catch (err) {
    res.status(403).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  forgotPassword,
  resetPassword,
  changePassword,
  signIn,
  create,
  requireSignin,
  hasAuthorization,
  isValidEmail,
};

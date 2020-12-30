import crypto from "crypto";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../../../config/config";
import errorHandler from "../../helpers/dbErrorHandler";
import HmacSHA256 from "crypto-js/hmac-sha256";

// const signature = HmacSHA256(message, secret);
// const signatureBase = signature.toString(Hex);

// create token for signin user
const createToken = (password) => {
  return jwt.sign({ password }, config.jwtSecret);
};

// check the user signin
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// check the user has auth as an admin user
const hasAuthorization = (req, res, next) => {
  let authorized = false;
  if (req.auth && process.env.ADMIN_PASSWORD === req.auth.password) {
    const signatureBase = createSignature();
    if (signatureBase === req.headers["access-key"]) {
      authorized = true;
    }
  }

  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized as admin",
    });
  }
  next();
};

// create header signature
const createSignature = () => {
  const signature = HmacSHA256(
    process.env.ADMIN_SECRET_KEY,
    process.env.ADMIN_PASSWORD
  );
  const signatureBase = signature.toString();
  return signatureBase;
};

// admin user signin with email and secretkey
const signIn = async (req, res) => {
  console.log(req.headers["access-key"]);
  console.log(req.body);
  if (
    req.body.email === process.env.ADMIN_EMAIL &&
    req.body.password === process.env.ADMIN_PASSWORD
  ) {
    const signatureBase = createSignature();
    console.log(signatureBase, req.headers["access-key"]);
    if (signatureBase === req.headers["access-key"]) {
      const token = createToken(process.env.ADMIN_PASSWORD);
      res.cookie("t", token, { expire: new Date() + 3600000 });
      return res.status(200).json({
        token,
      });
    } else {
      return res.status(403).json({
        error: "admin can not signin",
      });
    }
  } else {
    return res.status(403).json({
      error: "User can not signin",
    });
  }
};

export default {
  signIn,
  requireSignin,
  hasAuthorization,
};

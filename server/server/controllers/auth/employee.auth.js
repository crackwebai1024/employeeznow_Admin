import Employee from "../../models/employee/basic.model";
import errorHandler from "../../helpers/dbErrorHandler";

// import authy from "authy";
const _authy = require("authy")(process.env.AUTHY_API_KEY);

/**
 * check the phone number is the valid phone number
 *  - check that is already in the database
 *  - check that is valid phonenumber and sending 6 digits code success or not
 */
const isValidPhone = async (req, res) => {
  let phoneNumber = req.body.phoneNumber;
  let countryCode = req.body.countryCode;
  let codeLength = 6;
  console.log("phone verification body ==> ", req.body);
  _authy.check_approval_status("1231", function (err, res) {
    if (err) {
      console.log("error ==>", err);
    } else {
      console.log(res);
    }
  });
  try {
    let user = await Employee.findOne({ cell: countryCode + phoneNumber });
    if (!user) {
      _authy
        .phones()
        .verification_start(
          phoneNumber,
          countryCode,
          { via: "sms", locale: "en", code_length: "6" },
          function (err, resp) {
            if (err) {
              console.log(err);
              return res.status(403).json({
                failed: "please input the phone number again",
              });
            }
            return res.status(200).json({
              success:
                "valid phone number, we already sent 6 digit codes to your phonenumber",
            });
          }
        );
    } else {
      return res.status(403).json({
        failed: "please input the phone number again",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }

  // return res.status(200).json({
  //   success:
  //     "valid phone number, we already sent 6 digit codes to your phonenumber",
  // });
};

/* check six digit code is valid */
const isPhoneVerified = async (req, res, next) => {
  let sixDigitCode = req.body.sixDigitCode;
  let phoneNumber = req.body.phoneNumber;
  let countryCode = req.body.countryCode;

  _authy
    .phones()
    .verification_check(phoneNumber, countryCode, sixDigitCode, async function (
      err,
      res
    ) {
      if (err) {
        return res.status(403).json({
          error: "phone verification failed",
        });
      }
      await next();
    });

  // await next();
};

export default { isValidPhone, isPhoneVerified };

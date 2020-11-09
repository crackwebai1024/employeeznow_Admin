import express from "express";
import MailCtrl from "../../controllers/mail/mailctrl";
import authCtrl from "../../controllers/auth/common.auth";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const {
  sendEmployeeEmail,
  sendEmployerInterestEmail,
  sendEmployerNoInterestEmail,
} = MailCtrl;

// employer click employee interest button
router
  .route("/employee/interest")
  .post(requireSignin, hasAuthorization, sendEmployeeEmail);
router.route("/employer/interest").post(sendEmployerInterestEmail);
router.route("/employer/nointerest").post(sendEmployerNoInterestEmail);

export default router;

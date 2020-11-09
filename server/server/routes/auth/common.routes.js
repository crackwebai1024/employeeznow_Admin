import express from "express";
import authCommonCtrl from "../../controllers/auth/common.auth";

const router = express.Router();
const {
  requireSignin,
  hasAuthorization,
  forgotPassword,
  resetPassword,
  changePassword,
  signIn,
} = authCommonCtrl;

router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").post(resetPassword);
router.route("/signin").post(signIn);
router
  .route("/changepassword")
  .post(requireSignin, hasAuthorization, changePassword);

export default router;

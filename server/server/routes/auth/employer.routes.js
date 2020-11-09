import express from "express";
import authEmployerCtrl from "../../controllers/auth/employer.auth";
import authCommonCtrl from "../../controllers/auth/common.auth";

const router = express.Router();
const { sendCodetoEmail, isEmailVerified } = authEmployerCtrl;
const { create, signIn, isValidEmail } = authCommonCtrl;
router.route("/sendcode").post(isValidEmail, sendCodetoEmail);
router.route("/isemailverified").post(isEmailVerified, create, signIn);

export default router;

import express from "express";
import authCtrl from "../controllers/auth/auth.ctrl";

const router = express.Router();
const { signIn } = authCtrl;

router.route("/signin").post(signIn);

export default router;

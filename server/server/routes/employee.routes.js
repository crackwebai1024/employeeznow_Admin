import express from "express";
import authCtrl from "../controllers/auth/auth.ctrl";
import EmpeeReadCtrl from "../controllers/employee/getdata.ctrl";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;

// get abstract data of the employee
// router.route("/abstract").get();

// get data by pagenumber and pagecount
router
  .route("/search/result")
  .get(requireSignin, hasAuthorization, EmpeeReadCtrl.readEmployeeByPage);

export default router;

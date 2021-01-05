import express from "express";
import authCtrl from "../controllers/auth/auth.ctrl";
import EmpeeReadCtrl from "../controllers/employee/getdata.ctrl";
import EmpeeUpdateCtrl from "../controllers/employee/updatedata.ctrl";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const {
  readEmployeeByPage,
  getEmpeeAllDataById,
  getEmpeeStats,
} = EmpeeReadCtrl;

const { updateBasic, updateHist } = EmpeeUpdateCtrl;

// get abstract data of the employee
// router.route("/abstract").get();

// get data by pagenumber and pagecount
router
  .route("/search/result")
  .get(requireSignin, hasAuthorization, readEmployeeByPage);

// get an employee's all data by id
router
  .route("/getemployee/:id")
  .get(requireSignin, hasAuthorization, getEmpeeAllDataById);

// get data by statistically
router
  .route("/getemployeestats")
  .get(requireSignin, hasAuthorization, getEmpeeStats);

// update an employee's basic data by id
router.route("/basic").post(requireSignin, hasAuthorization, updateBasic);

// update or add employee's work history(experience) by id
router.route("/workhist").post(requireSignin, hasAuthorization, updateHist);

export default router;

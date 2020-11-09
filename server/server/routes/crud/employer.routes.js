import express from "express";
import EmpCtrl from "../../controllers/crud/employer/employer.crud";
import SefCtrl from "../../controllers/crud/employer/searchfilter.crud";
import authCtrl from "../../controllers/auth/common.auth";
import ComCtrl from "../../controllers/crud/common/common.crud";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const { find_ByID, updateByID } = EmpCtrl;
// update employer basic data
router.route("/update").get(requireSignin, hasAuthorization, updateByID);
// update password
router
  .route("/updatePWD")
  .post(requireSignin, hasAuthorization, ComCtrl.updatePWD);
// get basic data by id
router.route("/databyid").get(requireSignin, hasAuthorization, find_ByID);
// search filter crud
router
  .route("/searchfilter")
  .get(requireSignin, hasAuthorization, SefCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, SefCtrl.updateByID);
router
  .route("/searchfilter/delete")
  .post(requireSignin, hasAuthorization, SefCtrl.deleteByID);

export default router;

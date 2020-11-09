import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import searchResCtrl from "../../controllers/crud/employer/searchres.crud";
import getEmpCtrl from "../../controllers/search/getemployee";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
const { find_ByID } = searchResCtrl;
const { getEmployeeData } = getEmpCtrl;
router.route("/searchresult").get(requireSignin, hasAuthorization, find_ByID);
router
  .route("/getsearchemployee")
  .get(requireSignin, hasAuthorization, getEmployeeData);

export default router;

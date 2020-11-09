import express from "express";
import authCtrl from "../../controllers/auth/common.auth";
import EmpCtrl from "../../controllers/crud/employee/main.crud";
import BsCtrl from "../../controllers/crud/employee/basic.crud";
import SkillCtrl from "../../controllers/crud/employee/skill.crud";
import PrefCtrl from "../../controllers/crud/employee/preference.crud";
import ExpCtrl from "../../controllers/crud/employee/experience.crud";
import DocCtrl from "../../controllers/crud/employee/document.crud";
import ImgCtrl from "../../controllers/crud/employee/img.crud";
import PortCtrl from "../../controllers/crud/employee/portfolio.crud";
import AWSCtrl from "../../controllers/utils/aws_ope";
import ComCtrl from "../../controllers/crud/common/common.crud";

const router = express.Router();
const { requireSignin, hasAuthorization } = authCtrl;
router.route("/databyid").get(requireSignin, hasAuthorization, EmpCtrl.read);

//basic, skill, preference, experience, read, create, update(get for read, post for create and update)
router
  .route("/basic")
  .get(requireSignin, hasAuthorization, BsCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, BsCtrl.updateByID);

router
  .route("/basic/setnewpwd")
  .post(requireSignin, hasAuthorization, ComCtrl.updatePWD);

router
  .route("/skill")
  .get(requireSignin, hasAuthorization, SkillCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, SkillCtrl.updateByID);

router
  .route("/preference")
  .get(requireSignin, hasAuthorization, PrefCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, PrefCtrl.updateByID);

router
  .route("/experience")
  .get(requireSignin, hasAuthorization, ExpCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, ExpCtrl.updateByID);

// document file crud
router
  .route("/document")
  .get(requireSignin, hasAuthorization, DocCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, AWSCtrl.save, DocCtrl.updateByID);
router
  .route("/document/delete")
  .post(requireSignin, hasAuthorization, AWSCtrl.del, DocCtrl.updateByID);

// image file crud
router
  .route("/image")
  .get(requireSignin, hasAuthorization, ImgCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, AWSCtrl.save, ImgCtrl.updateByID);
router
  .route("/image/delete")
  .post(requireSignin, hasAuthorization, AWSCtrl.del, ImgCtrl.deleteByID);

// portfolio crud
router
  .route("/portfolio")
  .get(requireSignin, hasAuthorization, PortCtrl.find_ByID)
  .post(requireSignin, hasAuthorization, AWSCtrl.save, PortCtrl.updateByID);
router
  .route("/portfolio/delete")
  .post(requireSignin, hasAuthorization, AWSCtrl.del, PortCtrl.updateByID);
// router
//   .route("/portfolio/:fileid")
//   .get(requireSignin, hasAuthorization, PortCtrl.get_file_ByID);

export default router;

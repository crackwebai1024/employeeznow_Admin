// import PayPalCtrl from "../../controllers/payment/paypal";
import express from "express";
import PurchaseCtrl from "../../controllers/payment/purchase";
import authCtrl from "../../controllers/auth/common.auth";
import StripeCtrl from "../../controllers/payment/stripe";

const { requireSignin, hasAuthorization } = authCtrl;
const { stripePay } = StripeCtrl;
const router = express.Router();
const { getPurchaseRequest } = PurchaseCtrl;

// employee interest first step to check if the employee is in the interestedemployees list
router
  .route("/sendrequest")
  .post(requireSignin, hasAuthorization, getPurchaseRequest);

// if not buy the employee profile
router.route("/purchase").post(requireSignin, hasAuthorization, stripePay);

/* purchase employee by paypal 
// paypal payment request
router
  .route("/paypal/sendrequest")
  .post(requireSignin, hasAuthorization, getPaypalRequest);

// paypal payment success
router.route("/paypal/success").post(getPaypalSuccess);

// paypal payment cancel
router.route("/paypal/cancel").post(getPaypalCancel);
*/

export default router;

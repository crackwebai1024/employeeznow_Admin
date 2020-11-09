import stripe from "stripe";
import uuid from "uuid/v4";
import Employer from "../../models/employer/basic.model";
import { getPurchasedEmployee } from "../utils/getemployee";

const _stripe = stripe(process.env.STRIPE_API_SECRET_KEY);
const stripePay = async (req, res) => {
  const { product, token, id, employeeID } = req.body;
  console.log("data from frontend", token, product);
  const idempotencyKey = uuid();
  console.log("uuid generated key ==> ", idempotencyKey);
  try {
    let customer = await _stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    console.log("-------after creation stripe-----", customer);
    await _stripe.charges.create(
      {
        amount: 8 * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Buy Employee Profile",
      },
      { idempotencyKey }
    );
    console.log("-------after charge stripe-----");
    let employer = await Employer.findById(id);
    console.log("-------after find employer stripe-----");
    employer.interestedEmployees.push(employeeID);
    console.log("-------after push-----");
    await employer.save();
    console.log("-------after save-----");
    let purchased = true;
    return await getPurchasedEmployee(req, res, employeeID, purchased);
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      error: "there happens error for dealing",
    });
  }
};

export default { stripePay };

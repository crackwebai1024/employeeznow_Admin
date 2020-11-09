import Employer from "../../models/employer/basic.model";
import { getPurchasedEmployee } from "../utils/getemployee";
const getEmployeeData = async (req, res) => {
  let employerID = req.query.id;
  let id = req.query.employeeID;
  let purchased = false;
  try {
    let employer = await Employer.findById(employerID);
    console.log(employer.interestedEmployees);
    let idx = employer.interestedEmployees.indexOf(id);
    if (idx > -1) {
      purchased = true;
    }
    await getPurchasedEmployee(req, res, id, purchased);
  } catch (err) {
    return res.status(500).json({
      error: "server error",
    });
  }
};

export default { getEmployeeData };

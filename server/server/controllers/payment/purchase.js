import Employer from "../../models/employer/basic.model";
import errorHandler from "../../helpers/dbErrorHandler";
import { getPurchasedEmployee } from "../utils/getemployee";

const getPurchaseRequest = async (req, res) => {
  const employeeID = req.body.employeeID;
  const employerID = req.body.id;
  try {
    //find the employer by id from database
    let employer = await Employer.findById(employerID);
    // check if the number of employee that employer bought is more than 4
    if (employer.interestedEmployees.length < 3) {
      let idx = employer.interestedEmployees.indexOf(employeeID);
      if (idx === -1) {
        employer.interestedEmployees.push(employeeID);
        await employer.save();
      }
      //   update employer and save
      req.query = {};
      req.query.id = employeeID;
      let purchased = true;
      //   find whole employee data from employee database
      await getPurchasedEmployee(req, res, employeeID, purchased);
    } else {
      return res.status(200).json({
        islimit: true,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { getPurchaseRequest };

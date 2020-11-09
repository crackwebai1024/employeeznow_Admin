import Employee from "../../../models/employee/basic.model";
// import EmployeeDocument from "../../../models/employee/document.model";
import EmployeeExperience from "../../../models/employee/experience.model";
import EmployeePortfolio from "../../../models/employee/portfolio.model";
import EmployeePreference from "../../../models/employee/preference.model";
import EmployeeSkill from "../../../models/employee/skills.model";
import CRUD from "../../utils/general";

const { find_ByID } = CRUD;

const read = async (req, res) => {
  let id = req.query.id;
  // if (req.query.employeeID) {
  //   id = req.query.employeeID;
  // }
  let basicData = find_ByID(Employee, "_id", id, res);
  // let documentData = find_ByID(EmployeeDocument, "employee", id, res);
  let experienceData = find_ByID(EmployeeExperience, "employee", id, res);
  let portfolioData = find_ByID(EmployeePortfolio, "employee", id, res);
  let preferenceData = find_ByID(EmployeePreference, "employee", id, res);
  let skillData = find_ByID(EmployeeSkill, "employee", id, res);
  Promise.all([
    basicData,
    // documentData,
    experienceData,
    portfolioData,
    preferenceData,
    skillData,
  ])
    .then((values) => {
      console.log(values);
      return res.status(200).json({
        basic: values[0],
        // document: values[1],
        experience: values[1],
        portfolio: values[2],
        preference: values[3],
        skill: values[4],
      });
    })
    .catch((err) => {
      return res.status(403).json({
        error: err,
      });
    });
};

export default { read };

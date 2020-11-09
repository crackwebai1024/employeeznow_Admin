import Employee from "../../models/employee/basic.model";
import CRUD from "./general";
import EmployeeExperience from "../../models/employee/experience.model";
import EmployeePortfolio from "../../models/employee/portfolio.model";
import EmployeePreference from "../../models/employee/preference.model";
import EmployeeSkill from "../../models/employee/skills.model";

const { find_ByID } = CRUD;

const getPurchasedEmployee = async (req, res, id, purchased) => {
  let basicData = find_ByID(Employee, "_id", id, res);
  let experienceData = find_ByID(EmployeeExperience, "employee", id, res);
  let portfolioData = find_ByID(EmployeePortfolio, "employee", id, res);
  let preferenceData = find_ByID(EmployeePreference, "employee", id, res);
  let skillData = find_ByID(EmployeeSkill, "employee", id, res);

  Promise.all([
    basicData,
    experienceData,
    portfolioData,
    preferenceData,
    skillData,
  ])
    .then((values) => {
      console.log(values);
      let basicvalue;
      if (purchased) {
        delete values[0].hashed_password;
        delete values[0].salt;
        basicvalue = values[0];
      } else {
        basicvalue = {
          _id: values[0]["_id"],
          address: values[0].address,
          employeezNowId: values[0].employeezNowId,
          slug: values[0].slug,
        };
      }
      return res.status(200).json({
        basic: basicvalue,
        experience: values[1],
        portfolio: values[2],
        preference: values[3],
        skill: values[4],
        purchased,
      });
    })
    .catch((err) => {
      return res.status(403).json({
        error: err,
      });
    });
};

export { getPurchasedEmployee };

import Employee from "../../models/employee/basic.model";
import CRUD from "../utils/general";
import EmployeeExperience from "../../models/employee/experience.model";
import EmployeePreference from "../../models/employee/preference.model";
import EmployeeSkill from "../../models/employee/skills.model";

// update basic employee data
const updateBasic = async (req, res) => {
  const id = req.body.id;
  await CRUD.updateByID(Employee, "_id", id, req, res);
};

// update employee's work history
const updateHist = async (req, res) => {
  const id = req.body.id;
  const role = "employee";
  await CRUD.updateByID(EmployeeExperience, role, id, req, res);
};

export default { updateBasic, updateHist };

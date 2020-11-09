import EmployeeSkill from "../../../models/employee/skills.model";
import CRUD from "../../utils/general";

const find_ByID = async (req, res) => {
  let role = "employee";
  let skillByID = await CRUD.find_ByID(EmployeeSkill, role, req.query.id, res);
  return res.status(200).json({
    skill: skillByID,
  });
};

const updateByID = async (req, res) => {
  let role = "employee";
  await CRUD.updateByID(EmployeeSkill, role, req.body.id, req, res);
};

export default { find_ByID, updateByID };

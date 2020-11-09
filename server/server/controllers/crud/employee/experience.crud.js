import EmployeeExperience from "../../../models/employee/experience.model";
import CRUD from "../../utils/general";

const find_ByID = async (req, res) => {
  let role = "employee";
  let experienceByID = await CRUD.find_ByID(
    EmployeeExperience,
    role,
    req.query.id,
    res
  );
  return res.status(200).json({
    experience: experienceByID,
  });
};

const updateByID = async (req, res) => {
  let role = "employee";
  await CRUD.updateByID(EmployeeExperience, role, req.body.id, req, res);
};

export default { find_ByID, updateByID };

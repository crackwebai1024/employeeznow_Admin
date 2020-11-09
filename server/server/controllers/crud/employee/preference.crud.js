import EmployeePreference from "../../../models/employee/preference.model";
import CRUD from "../../utils/general";

const find_ByID = async (req, res) => {
  let role = "employee";
  let preferenceByID = await CRUD.find_ByID(
    EmployeePreference,
    role,
    req.query.id,
    res
  );
  return res.status(200).json({
    preference: preferenceByID,
  });
};

const updateByID = async (req, res) => {
  let role = "employee";
  await CRUD.updateByID(EmployeePreference, role, req.body.id, req, res);
};

export default { find_ByID, updateByID };

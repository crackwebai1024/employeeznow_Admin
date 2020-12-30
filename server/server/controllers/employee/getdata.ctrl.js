import Employee from "../../models/employee/basic.model";
import CRUD from "../utils/general";

const readEmployeeByPage = async (req, res) => {
  try {
    await CRUD.readByPage(Employee, req, res);
  } catch (err) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

export default { readEmployeeByPage };

import EmployeeDocument from "../../../models/employee/document.model";
import FILEOP from "../../utils/file_ope";

const find_ByID = async (req, res) => {
  await FILEOP.find_ByID(req, res, EmployeeDocument);
};

const updateByID = async (req, res) => {
  await FILEOP.updateByID(req, res, EmployeeDocument);
};

export default { find_ByID, updateByID };

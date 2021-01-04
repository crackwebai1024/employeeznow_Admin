import Employer from "../../models/employer/basic.model";
import CRUD from "../utils/general";

const readEmployerByPage = async (req, res) => {
  try {
    await CRUD.readByPage(Employer, req, res);
  } catch (err) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

export default { readEmployerByPage };

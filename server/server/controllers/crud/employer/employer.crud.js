import Employer from "../../../models/employer/basic.model";
import CRUD from "../../utils/general";

const find_ByID = async (req, res) => {
  let role = "_id";
  let employerByID = await CRUD.find_ByID(Employer, role, req.query.id, res);
  return res.status(200).json({
    employer: employerByID,
  });
};

const updateByID = async (req, res) => {
  try {
    let employer = await Employer.findOne({ _id: req.body.id });
    employer = extend(employer, req.body);
    await employer.save();
    res.status(200).json({
      success: "employer successfully updated",
    });
  } catch (err) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export default { find_ByID, updateByID };

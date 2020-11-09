import Employee from "../../../models/employee/basic.model";
import Employer from "../../../models/employer/basic.model";
import CRUD from "../../utils/general";
import extend from "lodash/extend";

const updatePWD = async (req, res) => {
  let role = req.body.role;
  let user;
  try {
    if (role === "employee") {
      user = await Employee.findOne({ _id: req.body.id });
    } else {
      user = await Employer.findOne({ _id: req.body.id });
    }
    if (!user) {
      return res.status(403).json({
        error: "There is no such user",
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .json({ error: "Email and password don't match." });
    }
    let newpass = {};
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();
    return res.status(200).json({
      success: "set new password successfully",
    });
  } catch {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export default { updatePWD };

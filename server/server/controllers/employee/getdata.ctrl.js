import Employee from "../../models/employee/basic.model";
import CRUD from "../utils/general";
import EmployeeExperience from "../../models/employee/experience.model";
import EmployeePortfolio from "../../models/employee/portfolio.model";
import EmployeePreference from "../../models/employee/preference.model";
import EmployeeSkill from "../../models/employee/skills.model";

const { find_ByID } = CRUD;
const readEmployeeByPage = async (req, res) => {
  try {
    await CRUD.readByPage(Employee, req, res);
  } catch (err) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const getEmpeeAllDataById = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const basicData = find_ByID(Employee, "_id", id, res);
  const experienceData = find_ByID(EmployeeExperience, "employee", id, res);
  const portfolioData = find_ByID(EmployeePortfolio, "employee", id, res);
  const preferenceData = find_ByID(EmployeePreference, "employee", id, res);
  const skillData = find_ByID(EmployeeSkill, "employee", id, res);

  Promise.all([
    basicData,
    experienceData,
    portfolioData,
    preferenceData,
    skillData,
  ])
    .then((values) => {
      return res.status(200).json({
        basic: values[0],
        experience: values[1],
        portfolio: values[2],
        preference: values[3],
        skill: values[4],
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({
        error: err,
      });
    });
};

const getEmpeeStats = async (req, res) => {
  try {
    const [totalCount, experienceData, addressData, employeementStatus] = [
      await Employee.count(),
      await EmployeeSkill.aggregate([
        {
          $group: {
            _id: "$primaryJob.title",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),
      await Employee.aggregate([
        {
          $group: {
            _id: "$address.city",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),
      await EmployeePreference.aggregate([
        {
          $group: {
            _id: "$employmentStatus",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),
    ];
    return res.status(200).json({
      totalCount,
      experienceByGrouping: experienceData,
      addressData,
      employeementStatus,
    });
  } catch (err) {
    console.log(err);
  }
};

export default { readEmployeeByPage, getEmpeeAllDataById, getEmpeeStats };

import EmployeeImg from "../../../models/employee/img.model";
// import FILEOP from "../../utils/file_ope";
import CRUD from "../../utils/general";

const find_ByID = async (req, res) => {
  // await FILEOP.find_ByID(req, res, EmployeeImg);
  const role = "employee";
  const type = req.query.type;
  let fileByID = await CRUD.find_ByID(EmployeeImg, role, req.query.id, res);
  return res.status(200).json({
    fname: fileByID[type].fname,
    url: fileByID[type].url,
  });
};

const updateByID = async (req, res) => {
  let role = "employee";
  let type = req.body.type;
  let bucketName = process.env.AWS_BUCKET_NAME;
  let fileName = req.body.id + req.body.type;
  req.body[type] = {};
  req.body[type].fname = req.body.fname;
  req.body[type].url = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  req.body[type].createdAt = Date.now();
  await CRUD.updateByID(EmployeeImg, role, req.body.id, req, res);
};

const deleteByID = async (req, res) => {
  let role = "employee";
  let type = req.body.type;
  req.body[type] = {};
  req.body[type].fname = "";
  req.body[type].url = "";
  req.body[type].createdAt = Date.now();
  await CRUD.updateByID(EmployeeImg, role, req.body.id, req, res);
};

export default { find_ByID, updateByID, deleteByID };

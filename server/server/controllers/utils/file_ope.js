import CRUD from "./general";
import AWSOP from "./aws_ope";

const find_ByID = async (req, res, Model) => {
  const role = "employee";
  const type = req.query.type;
  let fileByID = await CRUD.find_ByID(Model, role, req.query.id, res);
  console.log("photodata ==> ", fileByID);
  await AWSOP.read(type, req.query.id)
    .then((data) => {
      return res.status(200).json({
        fname: fileByID[type].fname,
        content: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Internal server error, can not read data from aws",
      });
    });
};

const updateByID = async (req, res, Model) => {
  let role = "employee";
  let type = req.body.type;
  let bucketName = process.env.AWS_BUCKET_NAME;
  let fileName = "";
  if (req.body.type !== "portfolio") {
    fileName = req.body.id + req.body.type;
  } else {
    fileName = req.body.id + req.body.folioID + req.body.type;
  }
  req.body[type] = {};
  console.log(req.body);
  req.body[type].fname = req.body.fname;
  req.body[type].url = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  req.body[type].createdAt = Date.now();
  console.log("fileName ==> ", req.body.fname);
  await CRUD.updateByID(Model, role, req.body.id, req, res);
};

const deleteByID = async (req, res, Model) => {
  let role = "employee";
  let type = req.body.type;
  let bucketName = process.env.AWS_BUCKET_NAME;
  let fileName = "";
  req.body[type] = {};
  console.log(req.body);
  req.body[type].fname = req.body.fname;
  req.body[type].url = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  req.body[type].createdAt = Date.now();
  console.log("fileName ==> ", req.body.fname);
  await CRUD.updateByID(Model, role, req.body.id, req, res);
};

export default { find_ByID, updateByID };

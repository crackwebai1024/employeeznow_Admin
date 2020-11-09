var AWS = require("aws-sdk");
var fs = require("fs");
require("dotenv").config();
// For dev purposes test only
AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
});
console.log("process.env.AWS_KEY_ID", process.env.AWS_KEY_ID);
var s3 = new AWS.S3({});

// const s3download = function (params) {
//   return new Promise((resolve, reject) => {
//     s3.getObject(params, function (err, data) {
//       if (err) {
//         reject(err);
//       } else {
//         console.log("Successfully dowloaded data from bucket");
//         resolve(data);
//       }
//     });
//   });
// };

const read = async (bucketName, id) => {
  const params = {
    Bucket: "mytestbucket626",
    Key: id + bucketName,
  };
  console.log(params);
  let p = new Promise(function (resolve, reject) {
    s3.getObject(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return p;
};

const save = async (req, res, next) => {
  // bucketName, fileName, fcont
  let fileName = "";
  if (req.body.type !== "portfolio") {
    fileName = req.body.id + req.body.type;
  } else {
    fileName = req.body.id + req.body.folioID + req.body.type;
  }

  let bucketName = process.env.AWS_BUCKET_NAME;
  let fcont = req.file;
  console.log(fileName, bucketName);
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  s3.putObject(
    {
      Bucket: bucketName,
      Key: fileName,
      Body: fcont.buffer,
      ACL: "public-read",
    },
    function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "there is an error in saving data to S3",
        });
      } else {
        next();
      }
    }
  );
};

const del = async (req, res, next) => {
  let bucketName = "mytestbucket626";
  let fileName = req.body.id + req.body.type;
  s3.deleteObject(
    {
      Bucket: bucketName,
      Key: fileName,
    },
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "there is an error in deleting file in S3",
        });
      }
      next();
    }
  );
};

export default { read, save, del };

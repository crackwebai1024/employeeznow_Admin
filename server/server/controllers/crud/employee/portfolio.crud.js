import EmployeePortfolio from "../../../models/employee/portfolio.model";
import CRUD from "../../utils/general";
import AWSOP from "../../utils/aws_ope";

const create = async (req, res, next) => {
  await CRUD.create(EmployeePortfolio, req, res, next);
};

const save = async (data, res) => {
  try {
    await data.save();
    res.status(200).json({
      success: "save portfolio successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: "server error to save data to db",
    });
  }
};

const find_ByID = async (req, res) => {
  let role = "employee";
  let portfolioByID = await CRUD.find_ByID(
    EmployeePortfolio,
    role,
    req.query.id,
    res
  );
  return res.status(200).json({
    portfolio: portfolioByID,
  });
};

const updateByID = async (req, res) => {
  let role = "employee";
  const { id, folioID, fname, type, note } = req.body;
  let portfolioByID = await CRUD.find_ByID(
    EmployeePortfolio,
    role,
    req.body.id,
    res
  );

  let ind = -1;
  let findRS = undefined;
  let fileName = id + folioID + type;
  let bucketName = process.env.AWS_BUCKET_NAME;
  if (portfolioByID === null) {
    let portfolio = new EmployeePortfolio({
      portfolios: [
        {
          index: folioID,
          fileName: fname,
          note: note,
          url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
        },
      ],
      employee: id,
    });
    await save(portfolio, res);
  } else {
    if (portfolioByID.portfolios !== undefined) {
      findRS = portfolioByID.portfolios.find(function (portfolio, index) {
        if (portfolio.index === folioID) {
          ind = index;
          return true;
        }
      });

      console.log(findRS, ind);
      if (findRS === undefined) {
        portfolioByID.portfolios = [
          ...portfolioByID.portfolios,
          {
            index: folioID,
            fileName: fname,
            note: note,
            url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
          },
        ];
      } else {
        portfolioByID.portfolios[ind] = {
          index: folioID,
          fileName: fname,
          note: note,
          url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
        };
      }

      if (req.body.role === "delete") {
        portfolioByID.portfolios.splice(ind, 1);
      }
      await save(portfolioByID, res);
    }
  }
};

// const get_file_ByID = async (req, res) => {
//   let type = "portfolio";
//   await AWSOP.read(type, req.query.id + req.params.fileid)
//     .then((data) => {
//       return res.status(200).json({
//         content: data,
//       });
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         error: "Internal server error, can not read data from aws",
//       });
//     });
// };

export default { create, find_ByID, updateByID };

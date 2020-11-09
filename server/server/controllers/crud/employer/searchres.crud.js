import SearchResult from "../../../models/employer/searchresult.model";
import CRUD from "../../utils/general";

const find_ByID = async (req, res) => {
  let role = "filterID";
  let searchResultByID = await CRUD.find_ByID(
    SearchResult,
    role,
    req.query.filterID,
    res
  );
  //   if (searchResultByID) {
  //     return res.status(200).json({
  //       searchresult: searchResultByID.searchresult,
  //     });
  //   } else {
  //     return res.status(200).json({
  //       searchresult: searchResultByID,
  //     });
  //   }
  return res.status(200).json({
    searchresult: searchResultByID,
  });
};

const updateByID = async (req, res) => {
  let role = "filterID";
  await CRUD.updateByID(SearchResult, role, req.body.filterID, req, res);
};

export default { find_ByID, updateByID };

import Axios from "@lib/axios";

export async function onGetEmployees(data) {
  return await Axios.get("/employee/search" + data);
}

import Axios from "@lib/axios";

export async function onGetEmployees(data) {
  return await Axios.get("/employee/search" + data);
}

export async function onGetEmployeesProfile(id) {
  return await Axios.get("/employee/getemployee/" + id);
}

export async function onGetEmployeeSta() {
  return await Axios.get("/employee/getemployeestats");
}

export async function onUpdateExperience(payload) {
  return await Axios.post("/employee/workhist", payload);
}

export async function onUpdateBasic(payload) {
  return await Axios.post("/employee/basic", payload);
}

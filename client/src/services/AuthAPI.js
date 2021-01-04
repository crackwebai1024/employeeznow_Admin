import Axios from "@lib/axios";

export async function onLoginRequest(data) {
  return await Axios.post("/auth/signin", data);
}

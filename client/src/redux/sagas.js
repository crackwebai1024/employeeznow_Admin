import { all } from "redux-saga/effects";

import authSagas from "./auth/sagas";
import employeesSagas from "./employees/sagas";

export default function* root() {
  yield all([...authSagas, ...employeesSagas]);
}

import { call, put, takeEvery } from "redux-saga/effects";
import * as EmployeeAPI from "@services/EmployeeAPI";
import { actions as types } from "./index";

function* onGetEmployees({ payload }) {
  try {
    let queryString = `/result?page=${payload.page}&count=${payload.count}`;
    const res = yield call(EmployeeAPI.onGetEmployees, queryString);
    if (res && res.data) {
      yield put(types.setEmployees(res.data));
    }
  } catch {}
}

const employeesSagas = [takeEvery(types.getEmployees, onGetEmployees)];

export default employeesSagas;

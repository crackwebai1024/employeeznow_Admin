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

function* onGetEmployeesProfile({ payload }) {
  try {
    const res = yield call(EmployeeAPI.onGetEmployeesProfile, payload);
    if (res && res.data) {
      yield put(types.setProfile(res.data));
    }
  } catch {}
}

function* onGetEmployeeSta() {
  try {
    const res = yield call(EmployeeAPI.onGetEmployeeSta);
    if (res && res.data) {
      yield put(types.getEmployeeStaSuccess(res.data));
    }
  } catch {}
}

function* onUpdateExperience({ payload }) {
  try {
    const res = yield call(EmployeeAPI.onUpdateExperience, payload);
    if (res && res.data) {
      yield put(types.updateJobSuccess(res.data));
    }
  } catch {}
}

function* onUpdateBasic({ payload }) {
  try {
    const res = yield call(EmployeeAPI.onUpdateBasic, payload);
    if (res && res.data) {
      yield put(types.updateBasicSuccess(res.data));
    }
  } catch {}
}

const employeesSagas = [
  takeEvery(types.getEmployees, onGetEmployees),
  takeEvery(types.getEmployeeProfile, onGetEmployeesProfile),
  takeEvery(types.getEmployeeSta, onGetEmployeeSta),
  takeEvery(types.updateJobExperience, onUpdateExperience),
  takeEvery(types.updateBasic, onUpdateBasic),
];

export default employeesSagas;

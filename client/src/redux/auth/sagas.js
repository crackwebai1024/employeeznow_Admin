import { call, put, takeEvery } from "redux-saga/effects";
import * as AuthAPI from "@services/AuthAPI";
import { setToken, removeToken } from "@helpers/auth-helpers";
import { actions as types } from "./index";

function* onLoginRequest({ payload }) {
  try {
    const res = yield call(AuthAPI.onLoginRequest, payload);
    if (res && res.data) {
      setToken(res.data.token);
      yield put(types.loginSuccess());
    }
  } catch {}
}

function* onLogOut() {
  yield removeToken();
  window.location.pathname = "/login";
}

const authSagas = [
  takeEvery(types.loginRequest, onLoginRequest),
  takeEvery(types.logOut, onLogOut),
];

export default authSagas;

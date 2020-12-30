import { call, put, takeEvery } from "redux-saga/effects";
import * as AuthAPI from "@services/AuthAPI";
import { setToken } from "@helpers/auth-helpers";
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

const authSagas = [takeEvery(types.loginRequest, onLoginRequest)];

export default authSagas;

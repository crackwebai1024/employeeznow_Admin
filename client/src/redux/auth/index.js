import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handlers";

export const actions = createActions({
  LOGIN_REQUEST: undefined,
  LOGIN_SUCCESS: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.loginRequest, handlers.loginRequest],
    [actions.loginSuccess, handlers.loginSuccess],
  ]),
  initialState
);

export default reducer;

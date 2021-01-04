import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handlers";

export const actions = createActions({
  LOGIN_REQUEST: undefined,
  LOGIN_SUCCESS: undefined,

  LOG_OUT: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.loginRequest, handlers.loginRequest],
    [actions.loginSuccess, handlers.loginSuccess],

    [actions.logOut, handlers.logOut],
  ]),
  initialState
);

export default reducer;

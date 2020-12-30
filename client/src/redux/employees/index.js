import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handler";

export const actions = createActions({
  GET_EMPLOYEES: undefined,
  SET_EMPLOYEES: undefined,

  SET_COUNT: undefined,
  SET_PAGE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getEmployees, handlers.getEmployees],
    [actions.setEmployees, handlers.setEmployees],

    [actions.setCount, handlers.setCount],
    [actions.setPage, handlers.setPage],
  ]),
  initialState
);

export default reducer;

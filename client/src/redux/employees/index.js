import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handler";

export const actions = createActions({
  GET_EMPLOYEES: undefined,
  SET_EMPLOYEES: undefined,

  SET_COUNT: undefined,
  SET_PAGE: undefined,

  GET_EMPLOYEE_PROFILE: undefined,
  SET_PROFILE: undefined,

  GET_EMPLOYEE_STA: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getEmployees, handlers.getEmployees],
    [actions.setEmployees, handlers.setEmployees],

    [actions.setCount, handlers.setCount],
    [actions.setPage, handlers.setPage],

    [actions.getEmployeeProfile, handlers.getEmployeeProfile],
    [actions.setProfile, handlers.setProfile],

    [actions.getEmployeeSta, handlers.getEmployeeSta],
    [actions.getEmployeeStaSuccess, handlers.getEmployeeStaSuccess],
  ]),
  initialState
);

export default reducer;

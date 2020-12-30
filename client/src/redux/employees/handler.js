const initialState = {
  employees: {
    result: [],
    totalCount: 0,
  },
  page: 0,
  count: 5,
};

export const getEmployees = (state) => ({
  ...state,
});

export const setEmployees = (state, { payload }) => ({
  ...state,
  employees: payload,
});

export const setCount = (state, { payload }) => ({
  ...state,
  count: payload,
});

export const setPage = (state, { payload }) => ({
  ...state,
  page: payload,
});

export default initialState;

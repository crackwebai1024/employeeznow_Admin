const initialState = {
  employees: {
    result: [],
    totalCount: 0,
  },
  employeeStatis: null,
  page: 0,
  count: 5,
  profile: {},
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

export const getEmployeeProfile = (state) => ({
  ...state,
});

export const setProfile = (state, { payload }) => ({
  ...state,
  profile: payload,
});

export const getEmployeeSta = (state) => ({
  ...state,
});

export const getEmployeeStaSuccess = (state, { payload }) => ({
  ...state,
  employeeStatis: payload,
});

export const updateJobExperience = (state) => ({
  ...state,
});

export const updateJobSuccess = (state, { payload }) => ({
  ...state,
  profile: { ...state.profile, experience: payload },
});

export const updateBasic = (state) => ({
  ...state,
});

export const updateBasicSuccess = (state, { payload }) => ({
  ...state,
  profile: { ...state.profile, basic: payload },
});

export default initialState;

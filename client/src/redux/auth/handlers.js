const initialState = {
  isAuthenticated: false,
};

export const loginRequest = (state) => ({
  ...state,
});

export const loginSuccess = (state) => ({
  ...state,
  isAuthenticated: true,
});

export const logOut = (state) => ({
  ...state,
});

export default initialState;

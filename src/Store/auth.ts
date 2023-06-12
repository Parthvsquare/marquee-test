export const authInitialState = {
  loggedIn: false,
};

export const authAction = {
  SET_USER_LOGIN: (state: any, payload: boolean) => payload,
  SET_USER_LOGOUT: (state: any, payload: boolean) => payload,
};

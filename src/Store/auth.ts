export const authInitialState = {
  loggedIn: false,
  userName: "Parth V",
};

export const authAction = {
  SET_USER_AUTH: (state: any, payload: boolean) => ({
    ...state,
    loggedIn: payload,
  }),
  SET_USER_NAME: (state: any, payload: string) => ({
    ...state,
    userName: payload,
  }),
};

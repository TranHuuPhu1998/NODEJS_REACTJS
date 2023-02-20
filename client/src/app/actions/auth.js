import * as types from "../constants/ActionTypes";

export const signUp = (data) => {
  return {
    type: types.SIGN_UP,
    payload: {
      data,
    },
  };
};

export const signUpSuccess = (data) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: {
    data,
  },
});

export const signUpFailed = (error) => ({
  type: types.SIGN_UP_FAILED,
  payload: {
    error,
  },
});

export const logout = (data) => {
  return {
    type: types.LOGOUT,
    payload: {
      token: data,
    },
  };
};

export const logoutSuccess = (data) => ({
  type: types.LOGOUT_SUCCESS,
  payload: {
    data,
  },
});

export const logoutFailed = (error) => ({
  type: types.LOGIN_FAILED,
  payload: {
    error,
  },
});

export const login = ({ account, password }) => ({
  type: types.LOGIN,
  payload: {
    account,
    password,
  },
});

export const loginSuccess = (data) => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    data,
  },
});

export const loginFailed = (error) => {
  return {
    type: types.LOGIN_FAILED,
    payload: {
      error,
    },
  };
};
export const sendMail = (email) => ({
  type: types.SEND_MAIL,
  payload: {
    email,
  },
});

export const sendMailSuccess = (data) => ({
  type: types.SEND_MAIL_SUCCESS,
  payload: {
    data,
  },
});

export const sendMailFailed = (error) => ({
  type: types.SEND_MAIL_FAILED,
  payload: {
    error,
  },
});

export const resetPassword = (token, password) => ({
  type: types.RESET_PASSWORD,
  payload: {
    password,
    token,
  },
});

export const resetPasswordSuccess = (data) => ({
  type: types.RESET_PASSWORD_SUCCESS,
  payload: {
    data,
  },
});

export const resetPasswordFailed = (data) => ({
  type: types.RESET_PASSWORD_FAILED,
  payload: {
    data,
  },
});

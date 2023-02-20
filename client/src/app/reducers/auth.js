import * as types from "../constants/ActionTypes";

import { toastError, toastSuccess } from "../common/helpers/toastHelper";

const initialState = {
  user: {},
  access_token: "",
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP: {
      return {
        ...state,
      };
    }
    case types.SIGN_UP_SUCCESS: {
      return {
        ...state,
      };
    }
    case types.SIGN_UP_FAILED: {
      return {
        ...state,
      };
    }
    case types.LOGIN: {
      return {
        ...state,
      };
    }
    case types.LOGIN_SUCCESS: {
      const { data } = action.payload;
      toastSuccess(data.msg);
      return {
        ...state,
        user: data.user,
        access_token: data.access_token,
      };
    }
    case types.LOGIN_FAILED: {
      toastError("Login Failed");
      return {
        ...state,
      };
    }
    case types.SEND_MAIL: {
      return {
        ...state,
      };
    }
    case types.SEND_MAIL_SUCCESS: {
      return {
        ...state,
      };
    }
    case types.SEND_MAIL_FAILED: {
      return {
        ...state,
      };
    }
    case types.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
      };
    }
    case types.RESET_PASSWORD_FAILED: {
      return {
        ...state,
      };
    }
    case types.LOGOUT: {
      toastSuccess("Logout Success");
      localStorage.removeItem("TOKEN");
      return {
        ...state,
      };
    }
    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
      };
    }
    case types.LOGOUT_FAILED: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducers;

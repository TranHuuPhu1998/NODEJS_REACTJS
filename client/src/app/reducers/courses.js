import * as types from "../constants/ActionTypes";
import { toastError, toastSuccess } from "../common/helpers/toastHelper";

const initialState = [];

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSE_SUCCESS: {
      const courses = action.payload.data.rows;
      return [...courses];
    }
    case types.CREATE_COURSE_SUCCESS: {
      toastSuccess("Create Courses Success");
      const course = action.payload.data.rows;
      return [course, ...state];
    }
    case types.CREATE_COURSE_ERROR: {
      toastError("Create Courses Error");
      return [...state];
    }
    case types.DELETE_COURSE_SUCCESS: {
      toastSuccess("Delete Course Success");
      const id = action.payload.id;
      const _index = state.findIndex((item) => item._id === id);
      state.splice(_index, 1);
      return [...state];
    }
    default:
      return state;
  }
};

export default reducers;

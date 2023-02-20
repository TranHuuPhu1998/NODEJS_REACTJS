import * as types from "../constants/ActionTypes";
import { toastError, toastSuccess } from "../common/helpers/toastHelper";

const initialState = {
  data: [],
  totalDocs: 0,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTIONS_SUCCESS: {
      const { docs, totalDocs } = action.payload.data.rows;
      return {
        data: docs,
        totalDocs: totalDocs,
      };
    }
    case types.GET_QUESTIONS_ERROR: {
      toastError("Get question error");
      return [...state];
    }
    case types.CREATE_QUESTION_SUCCESS: {
      toastSuccess("Create Questions Success");
      const question = action.payload.data.rows;
      return {
        data: [question, ...state.data],
        totalDocs: state.totalDocs + 1,
      };
    }
    case types.CREATE_QUESTION_ERROR: {
      toastError("Create Questions Error");
      return { ...state };
    }
    case types.UPDATE_QUESTION_SUCCESS: {
      toastSuccess("Update Questions Success");
      const data = action.payload.data.rows;

      const _index = state.data.findIndex((ele) => ele._id === data._id);
      state.data[_index] = data;
      return {
        data: [...state.data],
        totalDocs: state.totalDocs,
      };
    }
    case types.DELETE_QUESTION_SUCCESS: {
      const id = action.payload.id;
      const _index = state.data.findIndex((ele) => ele._id === id);
      state.data.splice(_index, 1);
      return {
        data: [...state.data],
        totalDocs: state.totalDocs - 1,
      };
    }
    case types.GET_QUESTIONS_CATEGORY_SUCCESS: {
      const questions = action.payload.data.rows;
      return {
        data: questions,
        totalDocs: questions.length,
      };
    }
    case types.GET_QUESTIONS_COURSE_SUCCESS: {
      const questions = action.payload.data.rows;
      return {
        data: questions,
        totalDocs: questions.length,
      };
    }
    default:
      return state;
  }
};

export default reducers;

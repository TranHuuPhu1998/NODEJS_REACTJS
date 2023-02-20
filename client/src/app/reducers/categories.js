import * as types from "../constants/ActionTypes";
import { toastError, toastSuccess } from "../common/helpers/toastHelper";

const initialState = {
  data: [],
  totalDocs: 0,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY_SUCCESS: {
      const { docs, totalDocs } = action.payload.data.rows;
      return {
        data: docs,
        totalDocs: totalDocs,
      };
    }
    case types.GET_CATEGORY_ERROR: {
      toastError("Get Category Error");
      return [...state];
    }
    case types.CREATE_CATEGORY_SUCCESS: {
      toastSuccess("Create Category Success");
      const category = action.payload.data.rows;
      return {
        data: [category, ...state.data],
        totalDocs: state.totalDocs + 1,
      };
    }
    case types.CREATE_CATEGORY_ERROR: {
      toastError("Create Category Error");
      return [...state];
    }
    case types.UPDATE_CATEGORY_SUCCESS: {
      toastSuccess("Update Category Success");
      const data = action.payload.data.rows;

      const _index = state.data.findIndex((ele) => ele._id === data._id);
      state.data[_index] = data;
      return {
        data: [...state.data],
        totalDocs: state.totalDocs,
      };
    }
    case types.DELETE_CATEGORY_SUCCESS: {
      toastSuccess("Delete Category Success");
      const id = action.payload.id;
      const _index = state.data.findIndex((ele) => ele._id === id);
      state.data.splice(_index, 1);
      return {
        data: [...state.data],
        totalDocs: state.totalDocs - 1,
      };
    }
    case types.DELETE_CATEGORY_ERROR: {
      toastError("Delete Category Error");
      return [...state];
    }
    default:
      return state;
  }
};

export default reducers;

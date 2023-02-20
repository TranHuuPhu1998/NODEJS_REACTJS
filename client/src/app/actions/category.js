import * as types from '../constants/ActionTypes';

// GET A CATEGORY
export const getCategory = (pageInfo) => {
  return {
    type: types.ACTION_GET_CATEGORIES,
    payload : {
      pageInfo
    }
  };
};

export const getCategoriesSuccess = (data) => {
  return {
    type: types.GET_CATEGORY_SUCCESS,
    payload: {
      data
    }
  };
};

export const getCategoriesError = (data) => {
  return {
    type: types.GET_CATEGORY_ERROR,
    payload: {
      data
    }
  };
};

// CREATE A CATEGORY
export const createCategory = (data) => {
  return {
    type: types.ACTION_CREATE_CATEGORY,
    payload: {
      data
    }
  };
};

export const createCategorySuccess = (data) => {
  return {
    type: types.CREATE_CATEGORY_SUCCESS,
    payload: {
      data
    }
  };
};

export const createCategoryError = () => {
  return {
    type: types.CREATE_CATEGORY_ERROR
  };
};

// UPDATE A CATEGORY
export const updateCategory = (data, id) => {
  return {
    type: types.ACTION_UPDATE_CATEGORY,
    payload: {
      data,
      id
    }
  };
};

export const updateCategorySuccess = (data) => {
  return {
    type: types.UPDATE_CATEGORY_SUCCESS,
    payload: {
      data
    }
  };
};

export const updateCategoryError = () => {
  return {
    type: types.UPDATE_CATEGORY_ERROR
  };
};

// DELETE A CATEGORY

export const deleteCategory = (id) => {
  return {
    type: types.ACTION_DELETE_CATEGORY,
    payload: {
      id
    }
  };
};

export const deleteCategorySuccess = (id) => {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
    payload: {
      id
    }
  };
};

export const deleteCategoryError = () => {
  return {
    type: types.DELETE_CATEGORY_SUCCESS
  };
};

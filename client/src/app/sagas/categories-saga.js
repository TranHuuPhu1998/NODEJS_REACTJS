import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../apis/categories-service";
import {
  getCategoriesSuccess,
  getCategoriesError,
  createCategorySuccess,
  createCategoryError,
  updateCategorySuccess,
  updateCategoryError,
  deleteCategorySuccess,
  deleteCategoryError,
} from "../actions/category";
import { hideLoading, showLoading } from "../actions/ui";
import { call, takeLatest, put } from "redux-saga/effects";
import * as categoryType from "../constants/ActionTypes";

function* processGetCategories({ payload }) {
  const data = payload;
  yield put(showLoading());

  try {
    const resp = yield call(getCategories, data);
    yield put(getCategoriesSuccess(resp.data));
  } catch (error) {
    yield put(getCategoriesError(error));
  } finally {
    yield put(hideLoading());
  }
}

function* processCreateCategory({ payload }) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(createCategory, { name: data });
    yield put(createCategorySuccess(resp.data));
  } catch (error) {
    yield put(createCategoryError());
  } finally {
    yield put(hideLoading());
  }
}

function* processUpdateCategory({ payload }) {
  const { data, id } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(updateCategory, { data, id });
    yield put(updateCategorySuccess(resp.data));
  } catch (error) {
    yield put(updateCategoryError());
  } finally {
    yield put(hideLoading());
  }
}

function* processDeleteCategory({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  try {
    yield call(deleteCategory, id);
    yield put(deleteCategorySuccess(id));
  } catch (error) {
    yield put(deleteCategoryError());
  } finally {
    yield put(hideLoading());
  }
}

function* categorySaga() {
  yield takeLatest(categoryType.ACTION_GET_CATEGORIES, processGetCategories);
  yield takeLatest(categoryType.ACTION_CREATE_CATEGORY, processCreateCategory);
  yield takeLatest(categoryType.ACTION_UPDATE_CATEGORY, processUpdateCategory);
  yield takeLatest(categoryType.ACTION_DELETE_CATEGORY, processDeleteCategory);
}

export default categorySaga;

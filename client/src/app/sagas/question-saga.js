import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsCategory,
  getQuestionsCourse,
} from "../apis/questions-service";
import {
  getQuestionsSuccess,
  getQuestionsError,
  createQuestionSuccess,
  createQuestionError,
  updateQuestionSuccess,
  updateQuestionError,
  deleteQuestionSuccess,
  deleteQuestionError,
  getQuestionByCategorySuccess,
  getQuestionByCategoryError,
  getQuestionByCourseSuccess,
  getQuestionByCourseError,
} from "../actions/question";
import { hideLoading, showLoading } from "../actions/ui";
import { call, takeLatest, put, delay } from "redux-saga/effects";
import * as questionType from "../constants/ActionTypes";

function* processGetQuestion({ payload }) {
  const data = payload;
  yield put(showLoading());

  try {
    const resp = yield call(getQuestions, data);
    yield put(getQuestionsSuccess(resp.data));
  } catch (err) {
    yield put(getQuestionsError());
  } finally {
    yield put(hideLoading());
  }
}

function* processGetQuestionCategory({ payload }) {
  const { categoryId } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(getQuestionsCategory, categoryId);
    yield put(getQuestionByCategorySuccess(resp.data));
  } catch (error) {
    yield put(getQuestionByCategoryError());
  } finally {
    yield put(hideLoading());
  }
}

function* processGetQuestionCourse({ payload }) {
  const { courseId } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(getQuestionsCourse, courseId);
    yield put(getQuestionByCourseSuccess(resp.data));
  } catch (error) {
    yield put(getQuestionByCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processCreateQuestion({ payload }) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(createQuestion, data);
    yield put(createQuestionSuccess(resp.data));
  } catch (error) {
    yield put(createQuestionError());
  } finally {
    yield put(hideLoading());
  }
}

function* processUpdateQuestion({ payload }) {
  const { data, id } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(updateQuestion, { data, id });
    yield put(updateQuestionSuccess(resp.data));
  } catch (error) {
    yield put(updateQuestionError());
  } finally {
    yield put(hideLoading());
  }
}

function* processDeleteQuestion({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  try {
    yield call(deleteQuestion, id);
    yield put(deleteQuestionSuccess(id));
  } catch (error) {
    yield put(deleteQuestionError());
  } finally {
    yield put(hideLoading());
  }
}

function* authSaga() {
  yield takeLatest(questionType.ACTION_GET_QUESTIONS, processGetQuestion);
  yield takeLatest(questionType.ACTION_CREATE_QUESTION, processCreateQuestion);
  yield takeLatest(questionType.ACTION_UPDATE_QUESTION, processUpdateQuestion);
  yield takeLatest(questionType.ACTION_DELETE_QUESTION, processDeleteQuestion);
  yield takeLatest(
    questionType.ACTION_GET_QUESTIONS_CATEGORY,
    processGetQuestionCategory
  );
  yield takeLatest(
    questionType.ACTION_GET_QUESTIONS_COURSE,
    processGetQuestionCourse
  );
}

export default authSaga;

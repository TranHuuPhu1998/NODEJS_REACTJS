import * as types from "../constants/ActionTypes";

// Get List Questions
export const getQuestions = (pageInfo) => {
  return {
    type: types.ACTION_GET_QUESTIONS,
    payload: {
      pageInfo,
    },
  };
};

export const getQuestionsSuccess = (data) => {
  return {
    type: types.GET_QUESTIONS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getQuestionsError = () => {
  return {
    type: types.GET_QUESTIONS_ERROR,
  };
};
// Get list question

export const getQuestionByCategory = ({ categoryId }) => {
  return {
    type: types.ACTION_GET_QUESTIONS_CATEGORY,
    payload: {
      categoryId,
    },
  };
};

export const getQuestionByCategorySuccess = (data) => {
  return {
    type: types.GET_QUESTIONS_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getQuestionByCategoryError = () => {
  return {
    type: types.GET_QUESTIONS_CATEGORY_ERROR,
  };
};

// Get question by source

export const getQuestionByCourse = ({ courseId }) => {
  return {
    type: types.ACTION_GET_QUESTIONS_COURSE,
    payload: {
      courseId,
    },
  };
};

export const getQuestionByCourseSuccess = (data) => {
  return {
    type: types.GET_QUESTIONS_COURSE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getQuestionByCourseError = () => {
  return {
    type: types.GET_QUESTIONS_COURSE_ERROR,
  };
};

// Create A Question
export const createQuestion = (data) => {
  return {
    type: types.ACTION_CREATE_QUESTION,
    payload: {
      data,
    },
  };
};

export const createQuestionSuccess = (data) => {
  return {
    type: types.CREATE_QUESTION_SUCCESS,
    payload: {
      data,
    },
  };
};

export const createQuestionError = (data) => {
  return {
    type: types.CREATE_QUESTION_ERROR,
    payload: {
      data,
    },
  };
};

// Update A Question
export const updateQuestion = (data, id) => {
  return {
    type: types.ACTION_UPDATE_QUESTION,
    payload: {
      data,
      id,
    },
  };
};

export const updateQuestionSuccess = (data) => {
  return {
    type: types.UPDATE_QUESTION_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateQuestionError = () => {
  return {
    type: types.UPDATE_QUESTION_ERROR,
  };
};

// Delete A Question
export const deleteQuestion = (id) => {
  return {
    type: types.ACTION_DELETE_QUESTION,
    payload: {
      id,
    },
  };
};

export const deleteQuestionSuccess = (id) => {
  return {
    type: types.DELETE_QUESTION_SUCCESS,
    payload: {
      id,
    },
  };
};

export const deleteQuestionError = () => {
  return {
    type: types.DELETE_QUESTION_ERROR,
  };
};

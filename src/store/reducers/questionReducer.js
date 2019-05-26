import * as actions from '../actions/actionTypes';

const initialState = {
  creatingQuestion: false,
  questions: [],
  error: null,
};

const creatingQuestionStart = state => ({
  ...state,
  creatingQuestion: true,
  error: null,
});

const creatingQuestionSucceeded = (state, action) => ({
  ...state,
  questions: [action.question, ...state.questions],
  creatingQuestion: false
});

const creatingQuestionFailed = (state, action) => ({
  ...state,
  creatingQuestion: false,
  error: action.error
});

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_QUESTION_START: return creatingQuestionStart(state);
    case actions.CREATE_QUESTION_SUCCEEDED: return creatingQuestionSucceeded(state, action);
    case actions.CREATE_QUESTION_FAILED: return creatingQuestionFailed(state, action);
    default:
      return state;
  }
};

export default questionReducer;

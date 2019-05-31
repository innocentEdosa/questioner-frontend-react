import * as actions from '../actions/actionTypes';

const initialState = {
  creatingQuestion: false,
  questions: [],
  error: null,
  gettingQuestions: false,
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

// get questions reducer

const getQuestionsStart = state => ({
  ...state,
  error: null,
  gettingQuestions: true,
  questions: []
});

const getQuestionsSucceeded = (state, action) => ({
  ...state,
  gettingQuestions: false,
  questions: action.questions,
});

const getQuestionsFailed = state => ({
  ...state,
  gettingQuestions: false,
  questions: []
});

const voteQuestionSucceeded = (state, action) => {
  const newState = { ...state };
  const newQuestions = state.questions.map((question) => {
    if (action.question[0].id === question.id) {
      question.upvotes = action.question[0].upvotes;
      question.downvotes = action.question[0].downvotes;
    }
    return question;
  });
  newState.questions = newQuestions;
  return {
    ...newState
  };
};

const upVoteQuestionFailed = state => ({
  ...state
});
const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_QUESTION_START: return creatingQuestionStart(state);
    case actions.CREATE_QUESTION_SUCCEEDED: return creatingQuestionSucceeded(state, action);
    case actions.CREATE_QUESTION_FAILED: return creatingQuestionFailed(state, action);
    case actions.FETCH_MEETUP_QUESTIONS_START: return getQuestionsStart(state);
    case actions.FETCH_MEETUP_QUESTIONS_SUCCEEDED: return getQuestionsSucceeded(state, action);
    case actions.FETCH_MEETUP_QUESTIONS_FAILED: return getQuestionsFailed(state);
    case actions.UPVOTE_QUESTION_SUCCEEDED: return voteQuestionSucceeded(state, action);
    case actions.UPVOTE_QUESTION_FAILED: return upVoteQuestionFailed(state);
    default:
      return state;
  }
};

export default questionReducer;

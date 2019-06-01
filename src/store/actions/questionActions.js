import * as actions from './actionTypes';
import {
  postQuestion,
  fetchQuestions,
  upVote, downVote
} from '../api/index';

export const creatingQuestionStart = () => ({
  type: actions.CREATE_QUESTION_START
});

export const creatingQuestionSucceeded = question => ({
  type: actions.CREATE_QUESTION_SUCCEEDED,
  question
});

export const creatingQuestionFailed = error => ({
  type: actions.CREATE_QUESTION_FAILED,
  error
});

export const createQuestion = (question, meetupId) => async (dispatch) => {
  dispatch(creatingQuestionStart());
  const data = {
    title: 'no title',
    body: question,
    meetup: meetupId
  };
  try {
    const response = await postQuestion(data);
    if (response) {
      dispatch(creatingQuestionSucceeded(response.data.data[0]));
    }
  } catch (err) {
    const error = err.response;
    dispatch(creatingQuestionFailed(error));
  }
};

// get questions actions

export const getQuestionsStart = () => ({
  type: actions.FETCH_MEETUP_QUESTIONS_START
});

export const getQuestionsSucceeded = questions => ({
  type: actions.FETCH_MEETUP_QUESTIONS_SUCCEEDED,
  questions
});

export const getQuestionsFailed = () => ({
  type: actions.FETCH_MEETUP_QUESTIONS_FAILED
});
export const getQuestions = id => async (dispatch) => {
  dispatch(getQuestionsStart());
  try {
    const response = await fetchQuestions(id);
    if (response) {
      const questions = response.data.data;
      dispatch(getQuestionsSucceeded(questions.reverse()));
    }
  } catch (error) {
    dispatch(getQuestionsFailed());
  }
};

export const voteQuestionSucceeded = question => ({
  type: actions.UPVOTE_QUESTION_SUCCEEDED,
  question
});

export const voteQuestionFailed = () => ({
  type: actions.UPVOTE_QUESTION_FAILED
});

export const upVoteQuestion = id => async (dispatch) => {
  try {
    const response = await upVote(id);
    if (response) {
      const question = response.data.data;
      dispatch(voteQuestionSucceeded(question));
    }
  } catch (error) {
    dispatch(voteQuestionFailed());
  }
};

export const downVoteQuestion = id => async (dispatch) => {
  try {
    const response = await downVote(id);
    if (response) {
      const question = response.data.data;
      dispatch(voteQuestionSucceeded(question));
    }
  } catch (error) {
    dispatch(voteQuestionFailed());
  }
};

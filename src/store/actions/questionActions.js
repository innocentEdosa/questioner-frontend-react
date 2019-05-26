import * as actions from './actionTypes';
import { postQuestion } from '../api/index';

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
      dispatch(creatingQuestionSucceeded(response.data.data));
    }
  } catch (err) {
    const error = err.response;
    dispatch(creatingQuestionFailed(error));
  }
};

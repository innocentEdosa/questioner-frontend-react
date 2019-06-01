import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../src/store/actions/questionActions';
import * as types from '../src/store/actions/actionTypes';
import questionReducer from '../src/store/reducers/questionReducer';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);

describe('Questions actions', () => {
  it('should create an action of type CREATE_QUESTION_START', () => {
    const expectedAction = {
      type: types.CREATE_QUESTION_START
    };
    expect(actions.creatingQuestionStart()).toEqual(expectedAction);
  });

  it('should create an action of type CREATE_QUESTION_SUCCEEDED', () => {
    const expectedAction = {
      type: types.CREATE_QUESTION_SUCCEEDED,
      question: 'some-question',
    };
    expect(actions.creatingQuestionSucceeded('some-question')).toEqual(expectedAction);
  });


  it('should create an action of type CREATE_QUESTION_FAILED', () => {
    const expectedAction = {
      type: types.CREATE_QUESTION_FAILED,
      error: 'some-error',
    };
    expect(actions.creatingQuestionFailed('some-error')).toEqual(expectedAction);
  });

  it('should start getting Questions', () => {
    const expectedAction = {
      type: types.FETCH_MEETUP_QUESTIONS_START,
    };
    expect(actions.getQuestionsStart()).toEqual(expectedAction);
  });

  it(' gets Questions', () => {
    const expectedAction = {
      type: types.FETCH_MEETUP_QUESTIONS_SUCCEEDED,
      questions: actions.questions
    };
    expect(actions.getQuestionsSucceeded()).toEqual(expectedAction);
  });

  it(' gets Questions failed', () => {
    const expectedAction = {
      type: types.FETCH_MEETUP_QUESTIONS_FAILED,
      questions: actions.questions
    };
    expect(actions.getQuestionsFailed()).toEqual(expectedAction);
  });

  it('should create a question', () => {
    mock.onPost('/questions').reply(201, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'CREATE_QUESTION_START',
      'CREATE_QUESTION_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.createQuestion())
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should fail tocreate a question', () => {
    mock.onPost('/questions').reply(500);

    const expectedActions = [
      'CREATE_QUESTION_START',
      'CREATE_QUESTION_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.createQuestion())
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should get question', () => {
    mock.onGet('/questions/meetups/23').reply(201, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'FETCH_MEETUP_QUESTIONS_START',
      'FETCH_MEETUP_QUESTIONS_SUCCEEDED'
    ];
    const store = mockStore({});
    store.dispatch(actions.getQuestions(23))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should FAIL on getting question', () => {
    mock.onGet('/questions/meetups/23').reply(500);

    const expectedActions = [
      'FETCH_MEETUP_QUESTIONS_START',
      'FETCH_MEETUP_QUESTIONS_FAILED'
    ];
    const store = mockStore({});
    store.dispatch(actions.getQuestions(23))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it(' vote Questions failed', () => {
    const expectedAction = {
      type: types.UPVOTE_QUESTION_FAILED,
    };
    expect(actions.voteQuestionFailed()).toEqual(expectedAction);
  });


  it(' vote Questions succeeded', () => {
    const expectedAction = {
      type: types.UPVOTE_QUESTION_SUCCEEDED,
      question: 'some-question'
    };
    expect(actions.voteQuestionSucceeded('some-question')).toEqual(expectedAction);
  });

  it('should upvote a question', () => {
    mock.onPatch('/questions/3/upvote').reply(200, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'UPVOTE_QUESTION_SUCCEEDED'
    ];

    const store = mockStore({});
    store.dispatch(actions.upVoteQuestion(3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should fail to upvote a question', () => {
    mock.onPatch('/questions/3/upvote').reply(500);

    const expectedActions = [
      'UPVOTE_QUESTION_FAILED'
    ];

    const store = mockStore({});
    store.dispatch(actions.upVoteQuestion(3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });


  it('should downvote a question', () => {
    mock.onPatch('/questions/3/upvote').reply(200, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'UPVOTE_QUESTION_SUCCEEDED'
    ];

    const store = mockStore({});
    store.dispatch(actions.downVoteQuestion(3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should fail to downvote a question', () => {
    mock.onPatch('/questions/3/upvote').reply(500);

    const expectedActions = [
      'UPVOTE_QUESTION_FAILED'
    ];

    const store = mockStore({});
    store.dispatch(actions.downVoteQuestion(3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

// ANCHOR  reducer test sample
describe('questions reducer', () => {
  const initialState = {
    creatingQuestion: false,
    questions: [],
    error: null,
    gettingQuestions: false
  };

  it('should return the initial state', () => {
    expect(questionReducer(undefined, {})).toEqual({
      ...initialState
    });
  });

  it('creating question start', () => {
    expect(questionReducer(initialState, actions.creatingQuestionStart())).toEqual({
      ...initialState,
      creatingQuestion: true,
      error: null,
    });
  });

  it('creating question succeeded', () => {
    const question = [{}, {}];
    expect(questionReducer(initialState, actions.creatingQuestionSucceeded(question))).toEqual({
      ...initialState,
      questions: [[{}, {}]],
      creatingQuestion: false
    });
  });

  it('creating question failed', () => {
    const error = {};
    expect(questionReducer(initialState, actions.creatingQuestionFailed(error))).toEqual({
      ...initialState,
      creatingQuestion: false,
      error: {}
    });
  });

  it('get questions start', () => {
    expect(questionReducer(initialState, actions.getQuestionsStart())).toEqual({
      ...initialState,
      error: null,
      gettingQuestions: true,
      questions: []
    });
  });

  it('get questions succeeded', () => {
    expect(questionReducer(initialState, actions.getQuestionsSucceeded())).toEqual({
      ...initialState,
      error: null,
      gettingQuestions: false,
      questions: actions.questions,
    });
  });


  it('get questions failed', () => {
    expect(questionReducer(initialState, actions.getQuestionsFailed())).toEqual({
      ...initialState,
      gettingQuestions: false,
      questions: []
    });
  });

  it('vote questions succeeded', () => {
    expect(questionReducer(initialState, actions.voteQuestionSucceeded())).toEqual({
      ...initialState,
      gettingQuestions: false,
      questions: []
    });
  });

  it('vote questions failed', () => {
    expect(questionReducer(initialState, actions.voteQuestionFailed())).toEqual({
      ...initialState
    });
  });
});

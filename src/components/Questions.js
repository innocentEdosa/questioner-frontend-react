import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import UpVote from './Upvote';
import DownVote from './DownVote';
import CommentBtn from './CommentBtn';
import CommentForm from './CommentForm';
import { dateFormatter2 } from '../helper/formatMeetup';
import { fetchComment } from '../store/api/index';
import CommentList from './CommentList';

const Questions = ({
  question, upVote, upVoting, downVote
}) => {
  const initialState = {
    openComments: true,
    gettingComments: false,
    comments: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'toggleOpenComment':
        return { ...state, openComments: !state.openComments };
      case 'gettingComments':
        return { ...state, gettingComments: true };
      case 'gettingCommentSucceeded':
        return { ...state, gettingComments: false, comments: action.comments };
      case 'gettingCommentFailed':
        return { ...state, gettingComments: false };
      default:
        return state;
    }
  };


  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchQuestionComment = async (id) => {
    try {
      const response = await fetchComment(id);
      if (response) {
        const comments = response.data.data;
        dispatch({ type: 'gettingCommentSucceeded', comments });
      }
    } catch (error) {
      dispatch({ type: 'gettingCommentFailed' });
    }
  };

  const openCommentHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: 'toggleOpenComment' });
    if (state.openComments === true) {
      dispatch({ type: 'gettingComments' });
      fetchQuestionComment(question.id);
    }
  };

  return (
    <div>
      <div className="my-5 card">
        <div className="questionUserDetails">
          <div className="questionUserImage m-3">
            <img
              style={{ width: '100%', height: '100%' }}
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              className="rounded mx-auto"
              alt="some"
            />
          </div>
          <span className="questionUserName d-inline-block mt-4">
            {question.username ? question.username : 'you'}
          </span>
          <p className="text-muted">
            {question.createdOn ? dateFormatter2(question.createdOn) : null}
            {' '}
          </p>
        </div>
        <div className="card-body mt-n2">
          {question.body ? question.body : null}
        </div>
        <div>
          <span className="float-right d-inline-block mb-2 mt-n2 mx-4">
            <div
              className="float-right btn-grou mr-2"
              role="group"
              aria-label="First group"
            >
              <UpVote upVoting={upVoting} upVote={upVote} question={question} />
              <DownVote downVote={downVote} question={question} />
              <CommentBtn
                onclick={openCommentHandler}
                question={question}
              />
            </div>
          </span>
        </div>
      </div>
      <CommentForm gettingComments={state.gettingComments} openComment={state.openComments} />
      <div hidden={state.openComments}>
        {(state.gettingComments) ? <div className="spinner-border mt-3 ml-5 text-dark" role="status" /> : null }
        {(state.gettingComments) ? null : (state.comments.length === 0) ? <p className="text-muted mt-3 ml-5"> Be the first to comment </p> : <CommentList comments={state.comments} /> }
        {' '}
      </div>
    </div>
  );
};

Questions.propTypes = {
  question: PropTypes.shape({}).isRequired,
  upVoting: PropTypes.bool.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired
};

export default Questions;

import React from 'react';
import PropTypes from 'prop-types';
import UpVote from './Upvote';
import DownVote from './DownVote';
import CommentBtn from './CommentBtn';

const Questions = ({
  question, upVote, upVoting, downVote
}) => (
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
        {question.createdAt ? question.createdAt : null}
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
          <CommentBtn question={question} />
        </div>
      </span>
    </div>
  </div>
);

Questions.propTypes = {
  question: PropTypes.shape({}).isRequired,
  upVoting: PropTypes.bool.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired
};
export default Questions;

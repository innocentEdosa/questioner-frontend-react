import React from 'react';
import PropTypes from 'prop-types';


const Comment = ({ comment }) => (
  <div className="mx-auto" style={{ width: '90%' }}>
    <div className="my-5 card">
      <div className="questionUserDetails">
        <div className="questionUserImage m-3">
          <img
            style={{ width: '100%', height: '100%' }}
            src={(comment.username) ? `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
              comment.username}` : null}
            className="rounded mx-auto"
            alt="some"
          />
        </div>
        <span className="questionUserName d-inline-block mt-4">
          {comment.username ? comment.username : 'you'}
        </span>
        {/* <p className="text-muted">
          {question.createdOn ? dateFormatter2(question.createdOn) : null}
          {' '}
        </p> */}
      </div>
      <div className="card-body mt-n2">
        {comment.comment ? comment.comment : null}
      </div>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({}).isRequired
};

export default Comment;

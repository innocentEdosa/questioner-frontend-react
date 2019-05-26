import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Questions = ({ question }) => (
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
        {(question.username) ? question.username : 'you'}
      </span>
      <p className="text-muted">{(question.createdAt) ? question.createdAt : null} </p>
    </div>
    <div className="card-body mt-n2">
      {(question.body) ? question.body : null}
    </div>
    <div>
      <span className="float-right d-inline-block mb-2 mt-n2 mx-4">
        <div
          className="float-right btn-grou mr-2"
          role="group"
          aria-label="First group"
        >
          <button type="button" className="btn mx-1">
            <span className="mx-1 ">{(question.upvotes) ? question.upvotes : null}</span>
            <FontAwesomeIcon icon="thumbs-up" />
            {' '}
          </button>
          <button type="button" className="btn mx-1">
            <span className="mx-1 ">{(question.downvotes) ? question.downvotes : null}</span>
            {' '}
            <FontAwesomeIcon icon="thumbs-down" />
            {' '}
          </button>
          <button type="button" className="btn mx-1">
            <span className="mx-1 ">{(question.comment) ? question.comment : 10}</span>
            {' '}
            <FontAwesomeIcon icon="comment-alt" />
            {' '}
          </button>
        </div>
      </span>
    </div>
  </div>
);

export default Questions;

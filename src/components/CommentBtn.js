import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentBtn = ({ question, onclick }) => (
  <button onClick={onclick} type="button" className="btn mx-1">
    <span className="mx-1 ">{question.comment ? question.comment : 10}</span>
    {' '}
    <FontAwesomeIcon icon="comment-alt" />
    {' '}
  </button>
);

CommentBtn.propTypes = {
  question: PropTypes.shape({}).isRequired,
  onclick: PropTypes.func.isRequired
};

export default CommentBtn;

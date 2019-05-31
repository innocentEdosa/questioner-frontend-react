import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpVote = ({ question, upVote }) => {
  const onClickHandler = (e) => {
    e.preventDefault();
    upVote(question.id);
  };
  return (
    <button onClick={onClickHandler} type="button" className="btn mx-1">
      <span className="mx-1 ">
        {question.upvotes ? question.upvotes : null}
      </span>
      <FontAwesomeIcon icon="thumbs-up" />
      {' '}
    </button>
  );
};

UpVote.propTypes = {
  question: PropTypes.shape({}).isRequired,
  upVote: PropTypes.func.isRequired
};

export default UpVote;

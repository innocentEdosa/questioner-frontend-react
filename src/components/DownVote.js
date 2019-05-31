import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DownVote = ({ question, downVote }) => {
  const onClickHandler = (e) => {
    e.preventDefault();
    return downVote(question.id);
  };
  return (
    <button onClick={onClickHandler} type="button" className="btn mx-1">
      <span className="mx-1 ">
        {question.downvotes ? question.downvotes : null}
      </span>
      <FontAwesomeIcon icon="thumbs-down" />
      {' '}
    </button>
  );
};

DownVote.propTypes = {
  question: PropTypes.shape({}).isRequired,
  downVote: PropTypes.func.isRequired
};

export default DownVote;

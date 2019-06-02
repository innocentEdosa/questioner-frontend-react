import React, { useState } from 'react';
import PropTypes from 'prop-types';
import questionFormValidator from '../helper/authFormValidator';

const commentForm = ({
  openComment,
  creatingComment,
  createComment
}) => {
  const [formInput, setFormInput] = useState({
    comment: '',
    formError: {}
  });

  const onChangeHandler = ({ target }) => {
    const newFormInput = { ...formInput };
    newFormInput[target.name] = target.value;
    setFormInput(newFormInput);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const check = questionFormValidator('comment', formInput);
    const newFormInput = { ...formInput };
    newFormInput.formError = {
      ...check
    };
    setFormInput(newFormInput);
    if (Object.keys(formInput.formError).length === 0) {
      return createComment(formInput.comment);
    }
  };


  return (
    <div hidden={openComment || false} style={{ width: '90%' }} className="mt-5 mx-auto card questionCard">
      <form className="questionForm" onSubmit={submitHandler}>
        <div className="form-group px-2">
          <textarea
            name="comment"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
            value={formInput.comment}
            onChange={onChangeHandler}
          />
          {formInput.formError.comment ? (
            <p
              className="mt-n2 text-danger font-weight-lighter"
            >
              {formInput.formError.comment}
            </p>
          ) : null}
          <button
            type="submit"
            className="btn pb-1 questionBtn ml-2 my-3"
          >
            {creatingComment ? 'Posting comment...' : 'Post comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

commentForm.propTypes = {
  openComment: PropTypes.func.isRequired,
  creatingComment: PropTypes.bool.isRequired,
  createComment: PropTypes.func.isRequired
};

export default commentForm;

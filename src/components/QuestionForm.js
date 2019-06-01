import React, { useState } from 'react';
import PropTypes from 'prop-types';
import questionFormValidator from '../helper/authFormValidator';

const questionForm = ({
  shouldOpen,
  openForm,
  createQuestion,
  creatingQuestion
}) => {
  const [formInput, setFormInput] = useState({
    question: '',
    formError: {}
  });

  const onChangeHandler = ({ target }) => {
    const newFormInput = { ...formInput };
    newFormInput[target.name] = target.value;
    setFormInput(newFormInput);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const check = questionFormValidator('question', formInput);
    const newFormInput = { ...formInput };
    newFormInput.formError = {
      ...check
    };
    setFormInput(newFormInput);
    if (Object.keys(formInput.formError).length === 0) {
      return createQuestion(formInput.question);
    }
  };

  return (
    <div className="mt-5 card questionCard">
      <div onClick={openForm} className="card-body">
        Ask a question...
      </div>
      <form className="questionForm" onSubmit={submitHandler}>
        <div className="form-group px-2">
          <textarea
            name="question"
            hidden={shouldOpen}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="6"
            value={formInput.question}
            onChange={onChangeHandler}
          />
          {formInput.formError.question ? (
            <p
              hidden={shouldOpen}
              className="mt-n2 text-danger font-weight-lighter"
            >
              {formInput.formError.question}
            </p>
          ) : null}
          <button
            hidden={shouldOpen}
            type="submit"
            className="btn py-2 questionBtn ml-2 my-3"
          >
            {creatingQuestion ? 'Posting question...' : 'Post question'}
          </button>
        </div>
      </form>
    </div>
  );
};

questionForm.propTypes = {
  shouldOpen: PropTypes.bool.isRequired,
  openForm: PropTypes.func.isRequired,
  createQuestion: PropTypes.func.isRequired,
  creatingQuestion: PropTypes.bool.isRequired
};

export default questionForm;

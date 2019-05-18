import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authFormValidator from '../helper/authFormValidator';
import CreateMeetupModal from '../components/CreateMeetupModal';
import { closeMeetupModal, createMeetup } from '../store/actions/adminActions';

const Admin = ({ openModal, closeModal, createMeetups, creatingMeetup, serverError }) => {
  const [formInput, setFormInput] = useState({
    title: 'this is a very wonderful meetup',
    location: 'No 14 olohun osunde street eyean benin',
    description: 'this is the descritpio of a very long meetup which i am cjurrent creating',
    image: '',
    date: '',
    file: '',
    formError: {}
  });
  const inputChangeHandler = ({ target }) => {
    const changedInput = { ...formInput };
    if (target.name === 'image') {
      changedInput[target.name] = target.value;
      changedInput.file = target.files;
    } else {
      changedInput[target.name] = target.value;
    }
    setFormInput({
      ...changedInput
    });
  };

  const onBlurHandler = ({ target }) => {
    const check = authFormValidator(target.name, formInput);
    const changedFormInput = { ...formInput };
    changedFormInput.formError = {
      ...check
    };
    setFormInput(changedFormInput);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(formInput.formError).length === 0) {
      createMeetups(formInput);
    }
  };

  return (
    <div>
      <p>this is not an easy task</p>
      <CreateMeetupModal
        serverError={serverError}
        creatingMeetup={creatingMeetup}
        submit={submitHandler}
        values={formInput}
        onChange={inputChangeHandler}
        closeModal={closeModal}
        openModal={openModal}
        onBlur={onBlurHandler}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  openModal: state.admin.isCreateMeetupModal,
  creatingMeetup: state.admin.creatingMeetup,
  serverError: state.admin.error
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeMeetupModal()),
  createMeetups: formInput => dispatch(createMeetup(formInput))
});

Admin.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Admin);

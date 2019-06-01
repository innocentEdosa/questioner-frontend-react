import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authFormValidator from '../helper/authFormValidator';
import CreateMeetupModal from '../components/CreateMeetupModal';
import {
  closeMeetupModal,
  createMeetup,
  getAdminMeetups,
  openMeetupModal
} from '../store/actions/adminActions';
import AdminHeroSection from '../components/AdminHeroSection';
import AdminMeetupRecordList from '../components/AdminMeetupRecordList';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

const Admin = ({
  openModal,
  closeModal,
  createMeetups,
  creatingMeetup,
  serverError,
  gettingMeetups,
  onGetAdminMeetups,
  user,
  meetups,
  onCreateMeetup
}) => {
  useEffect(() => {
    onGetAdminMeetups(user.id);
  }, []);

  const [formInput, setFormInput] = useState({
    title: '',
    location: '',
    description: '',
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
      <AdminHeroSection
        paddingTop="3rem"
        onclick={onCreateMeetup}
        lead="/Auth"
      />
      <div className="container">
        <div className="heading-primary">Records</div>
      </div>
      {gettingMeetups ? (
        <Loader />
      ) : (
        <AdminMeetupRecordList adminMeetups={meetups} />
      )}
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
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  openModal: state.admin.isCreateMeetupModal,
  creatingMeetup: state.admin.creatingMeetup,
  serverError: state.admin.error,
  gettingMeetups: state.admin.gettingMeetups,
  user: state.auth.user,
  meetups: state.admin.meetups
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeMeetupModal()),
  createMeetups: formInput => dispatch(createMeetup(formInput)),
  onGetAdminMeetups: adminId => dispatch(getAdminMeetups(adminId)),
  onCreateMeetup: () => dispatch(openMeetupModal())
});

Admin.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  createMeetups: PropTypes.func.isRequired,
  creatingMeetup: PropTypes.bool.isRequired,
  serverError: PropTypes.shape({}).isRequired,
  gettingMeetups: PropTypes.bool.isRequired,
  onGetAdminMeetups: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  meetups: PropTypes.shape([]).isRequired,
  onCreateMeetup: PropTypes.func.isRequired
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Admin);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateMeetupModal from '../components/CreateMeetupModal';
import { closeMeetupModal } from '../store/actions/adminActions';


const Admin = ({ openModal, closeModal }) => (
  <CreateMeetupModal closeModal={closeModal} openModal={openModal} />
);

const mapStateToProps = state => ({
  openModal: state.admin.isCreateMeetupModal,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeMeetupModal()),
});

Admin.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

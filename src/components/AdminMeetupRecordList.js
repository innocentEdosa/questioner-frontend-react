import React from 'react';
import PropTypes from 'prop-types';
import AdminMeetupRecord from './AdminMeetupRecord';

const AdminMeetupRecordList = ({ adminMeetups }) => {
  const AdminMeetupRecords = adminMeetups.map(adminMeetup => (
    <AdminMeetupRecord meetup={adminMeetup} />
  ));
  return <div className="container">{AdminMeetupRecords}</div>;
};

AdminMeetupRecordList.propTypes = {
  adminMeetups: PropTypes.shape([]).isRequired
};

export default AdminMeetupRecordList;

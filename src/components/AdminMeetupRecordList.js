import React from 'react';
import PropTypes from 'prop-types';
import AdminMeetupRecord from './AdminMeetupRecord';

const AdminMeetupRecordList = ({ adminMeetups, deleteMeetup }) => {
  const AdminMeetupRecords = adminMeetups.map(adminMeetup => (
    <AdminMeetupRecord deleteMeetup={deleteMeetup} meetup={adminMeetup} />
  ));
  return <div className="container">{AdminMeetupRecords}</div>;
};

AdminMeetupRecordList.propTypes = {
  adminMeetups: PropTypes.shape([]).isRequired
};

export default AdminMeetupRecordList;

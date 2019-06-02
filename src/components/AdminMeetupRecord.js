import React from 'react';
import PropTypes from 'prop-types';
import { truncate, dateFormatter2 } from '../helper/formatMeetup';

const AdminMeetupRecord = ({ meetup, deleteMeetup, }) => (
  <div>
    <div className="card adminCard mb-4">
      <div className="row  no-gutters">
        <div className="col-md-2">
          <div className="adminImageWrapper">
            <img
              style={{ height: '100%', padding: '1.5rem' }}
              src={
                meetup.images
                  ? meetup.images
                  : 'https://res.cloudinary.com/dqw7jnfgo/image/upload/v1559054141/BACK.png'
              }
              className="w-100 card-img"
              alt="..."
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{meetup.topic ? meetup.topic : null}</h5>
            <p className="card-text">
              {meetup.description ? truncate(meetup.description, 80) : null}
            </p>
            <p className="card-text">
              <small className="text-muted">
                {meetup.createdOn
                  ? `Last updated: ${dateFormatter2(meetup.createdOn)}`
                  : null}
              </small>
            </p>
          </div>
        </div>
        <div className="col-md-2 mb-2">
          <div className="adminBtn">
            <button type="button" className="btn adminEditBtn   btn-block ">
              edit
            </button>
            <button onClick={() => deleteMeetup(meetup)} type="button" className="btn adminDeleteBtn  btn-block">
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

AdminMeetupRecord.propTypes = {
  meetup: PropTypes.shape({}).isRequired,
  deleteMeetup: PropTypes.func.isRequired
};

export default AdminMeetupRecord;

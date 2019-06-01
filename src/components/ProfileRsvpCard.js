import React from 'react';
import PropTypes from 'prop-types';
import { truncate, dateFormatter2 } from '../helper/formatMeetup';


const ProfileRsvpCard = ({ meetup }) => (
  <div>
    <div className="card adminCard mb-4">
      <div className="row  no-gutters">
        <div className="col-md-3">
          <div style={{ height: '100%', width: '100%', borderRadius: '0px' }}>
            <img
              style={{ height: '100%', padding: '1rem' }}
              src={
                meetup.images
                  ? meetup.images
                  : 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              }
              className="w-100 card-img"
              alt="..."
            />
          </div>
        </div>
        <div className="col-md-9">
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
      </div>
    </div>
  </div>
);

ProfileRsvpCard.propTypes = {
  meetup: PropTypes.shape({}).isRequired
};

export default ProfileRsvpCard;

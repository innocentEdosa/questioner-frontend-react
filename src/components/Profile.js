import React from 'react';
import PropTypes from 'prop-types';
import ProfileUserCard from './ProfileUserCard';
import ProfileRsvpCardList from './ProfileRsvpCardList';
import Footer from './Footer';
import Loader from './Loader';

const Profile = ({ user, gettingUserRsvp, userRsvp }) => (
  <span>
    <div className="container profile">
      <div className="row my-5">
        <div
          className="sticky-top col-lg-5 text-center"
        >
          <div>
            <ProfileUserCard user={user} />
          </div>
        </div>
        <div className="col-lg-7 mt-5">
          <h1 className="heading-primary">YOUR RSVP</h1>
          <div className="my-4" />
          {(gettingUserRsvp) ? <Loader /> : <ProfileRsvpCardList userRsvp={userRsvp} />}
        </div>
      </div>
    </div>
    <Footer />
  </span>
);

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
  gettingUserRsvp: PropTypes.bool.isRequired,
  userRsvp: PropTypes.shape([]).isRequired
};

export default Profile;

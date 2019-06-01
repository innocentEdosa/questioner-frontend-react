import React from 'react';
import { dateFormatter2 } from '../helper/formatMeetup';

const ProfileUserCard = ({ user }) => (
  <div
    className="col-sm-5 text-center"
  >
    <div className="profileUserImage mt-5 mx-auto">
      <img
        style={{ width: '100%', height: '100%' }}
        src={
          user.firstname === 'yourfirstname'
          && user.lastname === 'yourlastname'
            ? `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
              user.username
            }`
            : `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
              user.firstname
            }+${user.lastname}`
        }
        className="rounded mx-auto"
        alt="some"
      />
    </div>
    <h1 className="profileName mt-3">{(user.username) ? user.username : 'User'}</h1>
    <p className="h6 text-muted mt-2 profileSub">{(user.email) ? user.email : 'provide an email'}</p>
    <p className="h6 mt-2 text-muted profileSub">{(user.registered) ? `Joined questioner on  ' ${dateFormatter2(user.registered)} '` : user.registered}</p>
  </div>
);

export default ProfileUserCard;

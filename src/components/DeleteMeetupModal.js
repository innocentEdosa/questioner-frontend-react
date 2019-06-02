import React from 'react';
import PropTypes from 'prop-types';

const DeleteMeetupModal = ({
  openDeleteModal,
  meetup,
  cancelDelete,
  deleteMeetup,
  deletingMeetup
}) => (
  <div className="container">
    <div
      className={
        openDeleteModal ? 'modal modal-bg show-it fade' : 'modal modal-bg fade'
      }
      id="ModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-center">
          <div className="modal-header text-center">
            <h5
              style={{ marginLeft: '18%', color: 'red' }}
              className="heading-primary mt-3 text-center"
              id="ModalCenterTitle"
            >
              Do you really want to delete this meetup
            </h5>
            <button
              type="button"
              onClick={cancelDelete}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {meetup.topic ? meetup.topic : 'which meetup are we talking about'}
          </div>
          <div className="modal-footer">
            {deletingMeetup ? (
              <span
                className="spinner-border mx-auto text-dark"
                role="status"
              />
            ) : (
              <div className="mx-auto">
                <button
                  onClick={cancelDelete}
                  type="button"
                  className="btn mx-2 adminEditBtn "
                  data-dismiss="modal"
                >
                  Go back
                </button>
                <button
                  onClick={() => deleteMeetup(meetup.id)}
                  type="button"
                  className="btn mx-2 adminDeleteBtn"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

DeleteMeetupModal.propTypes = {
  openDeleteModal: PropTypes.bool.isRequired,
  meetup: PropTypes.shape({}).isRequired,
  cancelDelete: PropTypes.func.isRequired,
  deletingMeetup: PropTypes.bool.isRequired,
  deleteMeetup: PropTypes.func.isRequired
};

export default DeleteMeetupModal;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const CreateMeetupModal = ({ openModal, closeModal }) => (
  <div>
    <div
      className={
        openModal ? 'modal show-it modal-bg  fade' : 'modal modal-bg fade '
      }
      id="ModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog mt-5  modal-dialog-centered  "
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title text-center base-color"
              id="ModalCenterTitle"
            >
              Create Meetup
            </h5>
            <button
              onClick={closeModal}
              type="button"
              className="close base-color closeModal"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form-wrapper">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Topic
                  {' '}
                  <span className="text-muted">(Title of Meetup)</span>
                </label>
                <input
                  name="title"
                  type="text"
                  className="form-control form-control-lg "
                  id="title"
                  placeholder="Pick a topic"
                />
              </div>

              <div className="form-row">
                <div className="col-md-6 ">
                  <label className="form-label" htmlFor="inputDate">
                    Date of Meetup
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="inputDate"
                    className="py-4 mb-3 form-control form-control-lg sub-font"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label text-muted "
                    htmlFor="meetupPicture"
                  >
                    Meetup Picture
                  </label>
                  <input
                    type="file"
                    id="meetupPicture"
                    name="image"
                    className="form-control form-control-lg sub-font sub-padding-b "
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  name="location"
                  type="text"
                  className="form-control form-control-lg "
                  id="location"
                  placeholder="Pick a topic"
                />
              </div>
              <div className="form-group">
                <label htmlFor="FormControlTextarea1" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  id="FormControlTextarea1"
                  rows="6"
                />
              </div>
              <div style={{ padding: '0rem 10%' }}>
                <button
                  className="btn form-btn btn-lg btn-block "
                  type="submit"
                >
                  Create meetup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

CreateMeetupModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default CreateMeetupModal;

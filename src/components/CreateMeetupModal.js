/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import formatServerError from '../helper/formatServerResponse';


const CreateMeetupModal = ({
  openModal,
  closeModal,
  onChange,
  onBlur,
  values,
  submit,
  creatingMeetup,
  serverError,
}) => {
  const { formError } = values;
  const formattedServerError = formatServerError(serverError);
  return (
    <div>
      <div
        className={
          openModal ? 'modal show-it modal-bg fade' : 'modal modal-bg fade '
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
                disabled={creatingMeetup}
                onBlur={onBlur}
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
              <form onSubmit={submit} className="form-wrapper">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Topic
                    {' '}
                    <span className="text-muted">(Title of Meetup)</span>
                  </label>
                  <input
                    disabled={creatingMeetup}
                    required
                    value={values.title}
                    onBlur={onBlur}
                    onChange={onChange}
                    name="title"
                    type="text"
                    className="form-control form-control-lg "
                    id="title"
                    placeholder="Pick a topic"
                  />
                  {formError.title ? (
                    <p className="mt-1 text-danger font-weight-lighter">
                      {formError.title}
                    </p>
                  ) : null}
                </div>

                <div className="form-row">
                  <div className="col-md-6 ">
                    <label className="form-label" htmlFor="inputDate">
                      Date of Meetup
                    </label>
                    <input
                      disabled={creatingMeetup}
                      value={values.date}
                      onBlur={onBlur}
                      onChange={onChange}
                      type="date"
                      name="date"
                      id="inputDate"
                      className="py-4 mb-3 form-control form-control-lg sub-font"
                      placeholder=""
                      required
                    />
                    {formError.date ? (
                      <p className="mt-1 text-danger font-weight-lighter">
                        {formError.date}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label text-muted "
                      htmlFor="meetupPicture"
                    >
                      Meetup Picture
                    </label>
                    <input
                      value={values.image}
                      disabled={creatingMeetup}
                      onBlur={onBlur}
                      onChange={onChange}
                      type="file"
                      id="meetupPicture"
                      name="image"
                      className="form-control form-control-lg sub-font sub-padding-b "
                      placeholder=""
                    />
                    {formError.image ? (
                      <p className="mt-1 text-danger font-weight-lighter">
                        {formError.image}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    disabled={creatingMeetup}
                    required
                    value={values.location}
                    onBlur={onBlur}
                    onChange={onChange}
                    name="location"
                    type="text"
                    className="form-control form-control-lg "
                    id="location"
                    placeholder="Pick a topic"
                  />
                  {formError.location ? (
                    <p className="mt-1 text-danger font-weight-lighter">
                      {formError.location}
                    </p>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="FormControlTextarea1" className="form-label">
                    Description
                  </label>
                  <textarea
                    disabled={creatingMeetup}
                    value={values.description}
                    onBlur={onBlur}
                    onChange={onChange}
                    name="description"
                    className="form-control"
                    id="FormControlTextarea1"
                    rows="6"
                    required
                  />
                  {formError.description ? (
                    <p className="mt-1 text-danger font-weight-lighter">
                      {formError.description}
                    </p>
                  ) : null}
                </div>
                {formattedServerError ? (
                  <div className="alert alert-danger" role="alert">
                    {formattedServerError}
                  </div>
                ) : null}
                <div style={{ padding: '0rem 10%' }}>
                  <button
                    disabled={creatingMeetup}
                    className="btn form-btn btn-lg btn-block "
                    type="submit"
                  >
                    {creatingMeetup ? (
                      <span
                        className="spinner-border text-light"
                        role="status"
                      />
                    ) : (
                      'Create Meetup'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateMeetupModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
  submit: PropTypes.func.isRequired,
  creatingMeetup: PropTypes.bool.isRequired,
  serverError: PropTypes.oneOf([null || PropTypes.shape({})]).isRequired,
};

export default CreateMeetupModal;

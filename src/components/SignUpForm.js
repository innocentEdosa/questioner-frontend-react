/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatServerError from '../helper/formatServerResponse';


const SignUpForm = ({
  blur,
  submit,
  values,
  changed,
  loading,
  serverError,
  onNavClick
}) => {
  const { formError } = values;

  const formattedServerError = formatServerError(serverError);


  return (
    <div className="page-bg">
      <div className=" form-wrapper">
        <form onSubmit={submit} className="form-signup needs-validation">
          <div className="text-center mb-4">
            <Link to="/">
              {' '}
              <img
                className="mb-4"
                src="assets/img/logo1.png"
                alt=""
                width="55"
                height="55"
              />
            </Link>
            <h1 className="h3 mb-3 font-weight-bold">Join Questioner</h1>
            <p className="text-muted">
              ...you could be the first to ask the right questions
            </p>
          </div>
          <div className="form-label-group">
            <label className="form-label" htmlFor="inputUsername">
              Username
            </label>
            <input
              onBlur={blur}
              onChange={changed}
              type="text"
              id="inputUsername"
              name="username"
              className="py-4 mb-3 form-control form-control-lg"
              placeholder="Pick a username"
              value={values.username}
              required
            />
            {formError.username ? (
              <p className="mt-n2 text-danger font-weight-lighter">
                {formError.username}
              </p>
            ) : null}
          </div>
          <div className="form-label-group">
            <label className="form-label" htmlFor="inputEmail">
              Email address
            </label>
            <input
              onBlur={blur}
              onChange={changed}
              type="email"
              id="inputEmail"
              name="email"
              value={values.email}
              className="py-4 mb-3 form-control form-control-lg"
              placeholder="You@example.com"
              required
            />
            {formError.email ? (
              <p className="mt-n2 text-danger font-weight-lighter">
                {formError.email}
              </p>
            ) : null}
          </div>
          <div className="form-row">
            <div className="col-md-6 ">
              <label className="form-label" htmlFor="inputPassword">
                Password
              </label>
              <input
                onBlur={blur}
                onChange={changed}
                type="password"
                name="password"
                id="inputPassword"
                className="py-4 mb-3 form-control form-control-lg"
                placeholder="Create a password"
                value={values.password}
                required
              />
              {formError.password ? (
                <p className="mt-n2 text-danger font-weight-lighter">
                  {formError.password}
                </p>
              ) : null}
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                onBlur={blur}
                onChange={changed}
                type="password"
                id="confirmPassword"
                value={values.confirmPassword}
                name="password confirmation"
                className="py-4 mb-3 form-control form-control-lg"
                placeholder="Create a password"
                required
              />
              {formError['password confirmation'] ? (
                <p className="mt-n2 text-danger font-weight-lighter">
                  {formError['password confirmation']}
                </p>
              ) : null}
            </div>
          </div>
          {formattedServerError ? (
            <div className="alert alert-danger" role="alert">
              {formattedServerError}
            </div>
          ) : null}
          <button className="btn form-btn btn-lg btn-block " type="submit">
            {loading ? (
              <span className="spinner-border text-light" role="status" />
            ) : (
              'SIGN UP FOR QUESTIONER'
            )}
          </button>
          <p className="mt-5 mb-3 text-muted text-center">
            Already have an account?
            <Link to="/Auth" onClick={() => onNavClick('login')} className="ml-1 form-btn-sub btn btn-outline-success text-success ">
             Log in
              {' '}
            </Link>

          </p>
        </form>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  blur: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  serverError: PropTypes.oneOf([null, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  onNavClick: PropTypes.func.isRequired
};
export default SignUpForm;

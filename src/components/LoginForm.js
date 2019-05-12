/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatServerError from '../helper/formatServerResponse';

const LoginForm = ({
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
            <h1 className="h3 mb-3 font-weight-bold">Welcome back</h1>
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
              className="py-4 mb-3 form-control"
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
            <div className="col-md-12 ">
              <label className="form-label" htmlFor="inputPassword">
                Password
              </label>
              <input
                onBlur={blur}
                onChange={changed}
                type="password"
                name="password"
                id="inputPassword"
                className="py-4 mb-3 form-control"
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
              'Log in'
            )}
          </button>
          <p className="mt-5 mb-3 text-muted text-center">
            Yet to have an account?
            <Link to="/Auth" onClick={() => onNavClick('signup')} className="ml-1 form-btn-sub btn btn-outline-success text-success ">
             Sign up
              {' '}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  blur: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  serverError: PropTypes.oneOf([null, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  onNavClick: PropTypes.func.isRequired
};
export default LoginForm;

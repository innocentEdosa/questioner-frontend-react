/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => (
  <div className="page-bg">
    <div className=" form-wrapper">
      <form className="form-signup">
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
            type="text"
            id="inputUsername"
            className="py-4 mb-3 form-control"
            placeholder="Pick a username"
            required
          />
        </div>
        <div className="form-label-group">
          <label className="form-label" htmlFor="inputEmail">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="py-4 mb-3 form-control"
            placeholder="You@example.com"
            required
          />
        </div>
        <div className="form-row">
          <div className="col-md-6 ">
            <label className="form-label" htmlFor="inputPassword">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              className="py-4 mb-3 form-control"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="py-4 mb-3 form-control"
              placeholder="Create a password"
              required
            />
          </div>
        </div>
        <button className="btn form-btn btn-lg btn-block" type="submit">
          SIGN UP FOR QUESTIONER
        </button>
        <p className="mt-5 mb-3 text-muted text-center">
          Already have an account?
          {' '}
          <Link
            to="/Login"
            className="ml-1 form-btn-sub btn btn-outline-success text-success"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  </div>
);

export default SignUpForm;

import React from 'react';
import { Link } from 'react-router';

export default () =>
<div>
  <h3 className="col-md-12 text-center">Or sign up using your email</h3>
  <div className="col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
    <form name="userForm" className="signin" noValidate autoComplete="off">
      <fieldset>
        <div className="form-group" show-errors>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text" id="firstName" name="firstName"
            className="form-control" placeholder="First Name" required
          />
        </div>
        <div className="form-group" show-errors>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text" id="lastName" name="lastName"
            className="form-control" placeholder="Last Name" required
          />
        </div>
        <div className="form-group" show-errors>
          <label htmlFor="email">Email</label>
          <input
            type="email" id="email" name="email" className="form-control"
            placeholder="Email" lowercase required
          />
        </div>
        <div className="form-group" show-errors>
          <label htmlFor="username">Username</label>
          <input
            type="text" id="username" name="username" className="form-control"
            placeholder="Username" lowercase required
          />
        </div>
        <div className="form-group" show-errors>
          <label htmlFor="password">Password</label>
          <input
            type="password" id="password" name="password" className="form-control"
            placeholder="Password" required
          />
        </div>
        <div className="text-center form-group">
          <button type="submit" className="btn btn-primary">Sign up</button>
          &nbsp; or&nbsp;
          <Link to="/signin" className="show-signup">Sign in</Link>
        </div>
      </fieldset>
    </form>
  </div>
</div>;

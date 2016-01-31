import React from 'react';
import { Link } from 'react-router';

export default () =>
<div>
  <h3 className="col-md-12 text-center">Or with your account</h3>
  <div className="col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
    <form name="userForm" className="signin" noValidate autoComplete="off">
      <fieldset>
        <div className="form-group" show-errors>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className="form-control"
            placeholder="Username" lowercase required
          />
        </div>
        <div className="form-group" show-errors>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-control"
            placeholder="Password" required
          />
        </div>
        <div className="text-center form-group">
          <button type="submit" className="btn btn-primary">Sign in</button>
          &nbsp; or&nbsp;
          <Link to="/signup">Sign up</Link>
        </div>
        <div className="text-center forgot-password">
          <Link to="/forgot">Forgot your password?</Link>
        </div>
      </fieldset>
    </form>
  </div>
</div>;

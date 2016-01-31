import React from 'react';
import { Link } from 'react-router';

export default () =>
  <div className="navbar-header">
    <button className="navbar-toggle" type="button">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
    <Link to="/" className="navbar-brand">CodingBox.IO</Link>
  </div>;

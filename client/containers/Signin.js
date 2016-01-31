import React from 'react';
import Transmit from 'react-transmit';

import Header from '../components/Header';
import SigninForm from '../components/SigninForm';

class Signin extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="main-container container" style={{ marginTop: '50px' }}>
          <SigninForm />
        </div>
      </div>
    );
  }
}

/**
 * Use Transmit to query and return GitHub stargazers as a Promise.
 */
export default Transmit.createContainer(Signin, {
  initialVariables: {
  },
  fragments: {

  },
});

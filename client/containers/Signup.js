import React from 'react';
import Transmit from 'react-transmit';

import Header from '../components/Header';

class Signup extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="main-container container" style={{ marginTop: '50px' }}>
          <p>Signup</p>
        </div>
      </div>
    );
  }
}

/**
 * Use Transmit to query and return GitHub stargazers as a Promise.
 */
export default Transmit.createContainer(Signup, {
  initialVariables: {
  },
  fragments: {

  },
});

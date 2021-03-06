import React from 'react';
import Transmit from 'react-transmit';

import Header from '../components/Header';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="main-container container" style={{ marginTop: '50px' }}>
          <p>Main</p>
        </div>
      </div>
    );
  }
}

/**
 * Use Transmit to query and return GitHub stargazers as a Promise.
 */
export default Transmit.createContainer(Main, {
  initialVariables: {
  },
  fragments: {

  },
});

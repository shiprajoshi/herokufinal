import React from 'react';
import Transmit from 'react-transmit';

class ErrorNotFound extends React.Component {
  render() {
    return (
      <p>404!</p>
    );
  }
}

/**
 * Use Transmit to query and return GitHub stargazers as a Promise.
 */
export default Transmit.createContainer(ErrorNotFound, {
  initialVariables: {
  },
  fragments: {

  },
});

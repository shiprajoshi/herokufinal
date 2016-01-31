import React from 'react';
import Transmit from 'react-transmit';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: 2,
    };

    this.incClicks = this.incClicks.bind(this);
  }

  incClicks() {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  render() {
    return (
      <p onClick={this.incClicks}>test {this.state.clicks}</p>
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

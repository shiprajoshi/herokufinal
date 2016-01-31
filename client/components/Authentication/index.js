import React from 'react';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.callOauthProviderFacebook = this.callOauthProvider.bind(this, '/api/auth/facebook');

    this.callOauthProviderTwitter = this.callOauthProvider.bind(this, '/api/auth/twitter');

    this.callOauthProviderGoogle = this.callOauthProvider.bind(this, '/api/auth/google');

    this.callOauthProviderLinkedIn = this.callOauthProvider.bind(this, '/api/auth/linkedin');

    this.callOauthProviderGithub = this.callOauthProvider.bind(this, '/api/auth/github');

    this.callOauthProviderPaypal = this.callOauthProvider.bind(this, '/api/auth/paypal');
  }

  callOauthProvider(url) {
    window.location.href = `${url}?redirect_to=/`;
  }

  render() {
    return (<section className="row">
      <h3 className="col-md-12 text-center">Sign in using your social accounts</h3>
      <div className="col-md-12 text-center">
        <img
          onClick={this.callOauthProviderFacebook}
          src="/img/buttons/facebook.png"
        />
        <img
          onClick={this.callOauthProviderTwitter}
          src="/img/buttons/twitter.png"
        />
        <img
          onClick={this.callOauthProviderGoogle}
          src="/img/buttons/google.png"
        />
        <img
          onClick={this.callOauthProviderLinkedIn}
          src="/img/buttons/linkedin.png"
        />
        <img
          onClick={this.callOauthProviderGithub}
          src="/img/buttons/github.png"
        />
        <img
          onClick={this.callOauthProviderPaypal}
          src="/img/buttons/paypal.png"
        />
      </div>
      <div ui-view></div>
    </section>);
  }
}

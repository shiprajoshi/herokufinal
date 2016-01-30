import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import users from '../../server/controllers/users.controller';

module.exports = (config) => {
  // Use facebook strategy
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    function generateUsername(profile) { // eslint-disable-line
      let username = '';

      if (profile.emails) {
        username = profile.emails[0].value.split('@')[0];
      } else if (profile.name) {
        username = profile.name.givenName[0] + profile.name.familyName;
      }

      return username.toLowerCase() || undefined;
    }

    // Set the provider data and include tokens
    const providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    // Create the user OAuth profile
    const providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: profile.displayName,
      email: profile.emails ? profile.emails[0].value : undefined,
      username: profile.username || generateUsername(profile),
      profileImageURL: (profile.id)
        ? `//graph.facebook.com/${profile.id}/picture?type=large` : undefined,
      provider: 'facebook',
      providerIdentifierField: 'id',
      providerData,
    };

    // Save the user OAuth profile
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};

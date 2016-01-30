import passport from 'passport';
import mongoose from 'mongoose';
import path from 'path';
import config from '../config';

const User = mongoose.model('User');

/**
 * Module init function.
 */
module.exports = function initPassport() {
  // Serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id,
    }, '-salt -password', (err, user) => {
      done(err, user);
    });
  });

  // Initialize strategies
  config.utils.getGlobbedPaths('./config/strategies/**/*.js').forEach((strategy) => {
    require(path.resolve(strategy))(config);
  });
};

import config from '../../../config/config';
import errorHandler from '../../helpers/errors.helper';
import mongoose from 'mongoose';
import async from 'async';
import crypto from 'crypto';
import path from 'path';
import nodemailer from 'nodemailer';

const User = mongoose.model('User');

const smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = function forgot(req, res, next) {
  async.waterfall([
    // Generate random token
    (done) => {
      crypto.randomBytes(20, (err, buffer) => {
        const token = buffer.toString('hex');
        done(err, token);
      });
    },
    // Lookup user by username
    (token, done) => {
      if (req.body.username) {
        User.findOne({
          username: req.body.username.toLowerCase(),
        }, '-salt -password', (err, user) => {
          if (!user) {
            return res.status(400).send({
              message: 'No account with that username has been found',
            });
          } else if (user.provider !== 'local') {
            return res.status(400).send({
              message: `It seems like you signed up using your ${user.provider} account`,
            });
          }

          /* eslint-disable */
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          /* eslint-enable */

          user.save((err) => { // eslint-disable-line
            done(err, token, user);
          });
        });
      } else {
        return res.status(400).send({
          message: 'Username field must not be blank',
        });
      }
    },
    (token, user, done) => {
      let httpTransport = 'http://';

      if (config.secure && config.secure.ssl === true) {
        httpTransport = 'https://';
      }

      res.render(path.resolve('modules/users/server/templates/reset-password-email'), {
        name: user.displayName,
        appName: config.app.title,
        url: `${httpTransport}${req.headers.host}/api/auth/reset/${token}`,
      }, (err, emailHTML) => {
        done(err, emailHTML, user);
      });
    },
    // If valid email, send reset email using service
    (emailHTML, user, done) => {
      const mailOptions = {
        to: user.email,
        from: config.mailer.from,
        subject: 'Password Reset',
        html: emailHTML,
      };

      smtpTransport.sendMail(mailOptions, (err) => {
        if (!err) {
          res.send({
            message: 'An email has been sent to the provided email with further instructions.',
          });
        } else {
          return res.status(400).send({
            message: 'Failure sending email',
          });
        }

        done(err);
      });
    },
  ], (err) => {
    if (err) {
      return next(err);
    }
  });
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function validateResetToken(req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  }, (err, user) => {
    if (!user) {
      return res.redirect('/password/reset/invalid');
    }

    res.redirect(`/password/reset/${req.params.token}`);
  });
};

/**
 * Reset password POST from email token
 */
exports.reset = function reset(req, res, next) {
  // Init Variables
  const passwordDetails = req.body;

  async.waterfall([
    (done) => {
      User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      }, (err, user) => {
        if (!err && user) {
          if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
            /* eslint-disable */
            user.password = passwordDetails.newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            /* eslint-enable */

            user.save((err) => { // eslint-disable-line
              if (err) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err),
                });
              }

              req.login(user, (err) => { // eslint-disable-line
                if (err) {
                  res.status(400).send(err);
                } else {
                  // Remove sensitive data before return authenticated user
                  /* eslint-disable */
                  user.password = undefined;
                  user.salt = undefined;
                  /* eslint-enable */

                  res.json(user);

                  done(err, user);
                }
              });
            });
          } else {
            return res.status(400).send({
              message: 'Passwords do not match',
            });
          }
        } else {
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.',
          });
        }
      });
    },
    (user, done) => {
      res.render('modules/users/server/templates/reset-password-confirm-email', {
        name: user.displayName,
        appName: config.app.title,
      }, (err, emailHTML) => {
        done(err, emailHTML, user);
      });
    },
    // If valid email, send reset email using service
    (emailHTML, user, done) => {
      const mailOptions = {
        to: user.email,
        from: config.mailer.from,
        subject: 'Your password has been changed',
        html: emailHTML,
      };

      smtpTransport.sendMail(mailOptions, (err) => {
        done(err, 'done');
      });
    },
  ], (err) => {
    if (err) {
      return next(err);
    }
  });
};

/**
 * Change Password
 */
exports.changePassword = function changePassword(req, res, next) { // eslint-disable-line
  // Init Variables
  const passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.newPassword) {
      User.findById(req.user.id, (err, user) => {
        if (!err && user) {
          if (user.authenticate(passwordDetails.currentPassword)) {
            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
              user.password = passwordDetails.newPassword; // eslint-disable-line

              user.save((err) => { // eslint-disable-line
                if (err) {
                  return res.status(400).send({
                    message: errorHandler.getErrorMessage(err),
                  });
                }

                req.login(user, (err) => { // eslint-disable-line
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    res.send({
                      message: 'Password changed successfully',
                    });
                  }
                });
              });
            } else {
              res.status(400).send({
                message: 'Passwords do not match',
              });
            }
          } else {
            res.status(400).send({
              message: 'Current password is incorrect',
            });
          }
        } else {
          res.status(400).send({
            message: 'User is not found',
          });
        }
      });
    } else {
      res.status(400).send({
        message: 'Please provide a new password',
      });
    }
  } else {
    res.status(400).send({
      message: 'User is not signed in',
    });
  }
};
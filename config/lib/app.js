import config from '../config';
import mongoose from './mongoose';
import express from './express';
import chalk from 'chalk';
import seed from './seed';

function seedDB() {
  if (config.seedDB && config.seedDB.seed) {
    console.log(chalk.bold.red('Warning:  Database seeding is turned on')); // eslint-disable-line
    seed.start();
  }
}

// Initialize Models
mongoose.loadModels(seedDB);

export default {
  loadModels() {
    mongoose.loadModels();
  },

  init(callback) {
    mongoose.connect((db) => {
      // Initialize express
      const app = express.init(db);

      require('./passport')();

      if (callback) {
        callback(app, db, config);
      }
    });
  },

  start(callback) {
    this.init((app, db, _config) => {
      // Start the app by listening on <port> at <host>
      app.listen(_config.port, _config.host, () => {
        // Create server URL
        const server = `${(process.env.NODE_ENV === 'secure' ? 'https://' : 'http://')}${_config.host}:${_config.port}`;

        // Logging initialization
        /* eslint-disable */
        console.log('--');
        console.log(chalk.green(_config.app.title));
        console.log();
        console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
        console.log(chalk.green('Server:          ' + server));
        console.log(chalk.green('Database:        ' + _config.db.uri));
        console.log(chalk.green('App version:     ' + config.codingbox.version));
        if (config.codingbox['codingbox-version'])
          console.log(chalk.green('CodingBox.IO version: ' + config.codingbox['codingbox-version']));
        console.log('--');
        /* eslint-enable */

        if (callback) {
          callback(app, db, _config);
        }
      });
    });
  },
};

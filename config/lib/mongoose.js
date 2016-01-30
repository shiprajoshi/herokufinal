import config from '../config';
import chalk from 'chalk';
import path from 'path';
import mongoose from 'mongoose';

export default {
  loadModels(callback) {
    // Globbing model files
    config.utils.getGlobbedPaths('./server/models/**/*.js').forEach((modelPath) => {
      require(path.resolve(modelPath));
    });

    // config.files.server.models.forEach((modelPath) => {
    //   require(path.resolve(modelPath));
    // });

    if (callback) {
      callback();
    }
  },
  connect(cb) {
    const db = mongoose.connect(config.db.uri, config.db.options, (err) => {
      if (err) {
        /* eslint-disable */
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(err);
        /* eslint-enable */
      } else {
        mongoose.set('debug', config.db.debug);

        // Call callback FN
        if (cb) {
          cb(db);
        }
      }
    });
  },
  disconnect(cb) {
    mongoose.disconnect((err) => {
      console.info(chalk.yellow('Disconnected from MongoDB.')); // eslint-disable-line

      cb(err);
    });
  },
};

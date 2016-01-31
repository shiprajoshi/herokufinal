import _ from 'lodash';
import chalk from 'chalk';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

/**
 * Get files by glob patterns
 */
const getGlobbedPaths = function getGlobbedPaths(globPatterns, excludes) {
  // URL paths regex
  const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  let output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach((globPattern) => {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map((file) => {
          /* eslint-disable */
          if (_.isArray(excludes)) {
            for (const i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          /* eslint-enable */
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
};

/**
 * Validate NODE_ENV existence
 */
const validateEnvironmentVariable = function validateEnvironmentVariable() {
  const environmentFiles = glob.sync(`./config/env/${process.env.NODE_ENV}.js`);
  console.log(); // eslint-disable-line
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      /* eslint-disable */
      console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
      /* eslint-enable */
    } else {
      /* eslint-disable */
      console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
      /* eslint-enable */
    }
    process.env.NODE_ENV = 'development';
  }
  // Reset console color
  console.log(chalk.white('')); // eslint-disable-line
};

/**
 * Validate Secure=true parameter can actually be turned on
 * because it requires certs and key files to be available
 */
const validateSecureMode = function validateSecureMode(config) {
  if (!config.secure || config.secure.ssl !== true) {
    return true;
  }

  const privateKey = fs.existsSync(path.resolve(config.secure.privateKey));
  const certificate = fs.existsSync(path.resolve(config.secure.certificate));

  if (!privateKey || !certificate) {
    /* eslint-disable */
    console.log(chalk.red('+ Error: Certificate file or key file is missing, falling back to non-SSL mode'));
    console.log(chalk.red('  To create them, simply run the following from your shell: sh ./scripts/generate-ssl-certs.sh'));
    console.log();
    config.secure.ssl = false;
    /* eslint-enable */
  }
};

/**
 * Validate Session Secret parameter is not set to default in production
 */
const validateSessionSecret = function validateSessionSecret(config, testing) {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  if (config.sessionSecret === 'CODINGBOX') {
    if (!testing) {
      /* eslint-disable */
      console.log(chalk.red('+ WARNING: It is strongly recommended that you change sessionSecret config while running in production!'));
      console.log(chalk.red('  Please add `sessionSecret: process.env.SESSION_SECRET || \'super amazing secret\'` to '));
      console.log(chalk.red('  `config/env/production.js` or `config/env/local.js`'));
      console.log();
      /* eslint-enable */
    }
    return false;
  }

  return true;
};

/**
 * Initialize global configuration files
 */
const initGlobalConfigFiles = function initGlobalConfigFiles(config, assets) {
  /* eslint-disable */
  // Appending files
  config.files = {
    server: {},
    client: {}
  };

  // Setting Globbed model files
  config.files.server.models = getGlobbedPaths(assets.server.models);

  // Setting Globbed route files
  config.files.server.routes = getGlobbedPaths(assets.server.routes);

  // Setting Globbed config files
  config.files.server.configs = getGlobbedPaths(assets.server.config);

  // Setting Globbed socket files
  config.files.server.sockets = getGlobbedPaths(assets.server.sockets);

  // Setting Globbed policies files
  config.files.server.policies = getGlobbedPaths(assets.server.policies);

  // Setting Globbed js files
  config.files.client.js = getGlobbedPaths(assets.client.lib.js, 'public/').concat(getGlobbedPaths(assets.client.js, ['public/']));

  // Setting Globbed css files
  //config.files.client.css = getGlobbedPaths(assets.client.lib.css, 'public/').concat(getGlobbedPaths(assets.client.css, ['public/']));
  config.files.client.css = assets.client.lib.css;

  // Setting Globbed test files
  config.files.client.tests = getGlobbedPaths(assets.client.tests);
  /* eslint-enable */
};

/**
 * Initialize global configuration files
 */
const initGlobalConfigFolders = function initGlobalConfigFolders(config) {
  // Appending files
  config.folders = { // eslint-disable-line
    server: {},
    client: {},
  };

  // Setting globbed client paths
  config.folders.client = getGlobbedPaths( // eslint-disable-line
    path.join(process.cwd(), 'modules/*/client/'),
    process.cwd().replace(new RegExp(/\\/g), '/')
  );
};

/**
 * Initialize global configuration
 */
const initGlobalConfig = function initGlobalConfig() {
  // Validate NODE_ENV existence
  validateEnvironmentVariable();

  // Reading .env if we are on development environment
  // Heroku has its own .env, so this is not needed for herokuapp
  try {
    require('dotenv').config();
  } catch (e) {
    // Ignore
  }

  // Get the default assets
  const defaultAssets = require(path.join(process.cwd(), 'config/assets/default'));

  // Get the current assets
  const environmentAssets =
    require(path.join(process.cwd(), 'config/assets/', process.env.NODE_ENV)) || {};

  // Merge assets
  const assets = _.merge(defaultAssets, environmentAssets);

  // Get the default config
  const defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

  // Get the current config
  const environmentConfig =
    require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

  // Merge config files
  let config = _.merge(defaultConfig, environmentConfig);

  // read package.json for CodingBox.IO project information
  const pkg = require(path.resolve('./package.json'));
  config.codingbox = pkg;

  // Extend the config object with the local-NODE_ENV.js custom/local environment.
  // This will override any settings present in the local configuration.
  config = _.merge( // eslint-disable-line
    config,
    (
      fs.existsSync(
        path.join(process.cwd(), `config/env/local-${process.env.NODE_ENV}.js`)) &&
        require(path.join(process.cwd(), `config/env/local-${process.env.NODE_ENV}.js`)
      )
    ) || {});

  // Initialize global globbed files
  initGlobalConfigFiles(config, assets);

  // Initialize global globbed folders
  initGlobalConfigFolders(config);

  // Validate Secure SSL mode can be used
  validateSecureMode(config);

  // Validate session secret
  validateSessionSecret(config);

  // Expose configuration utilities
  config.utils = {
    getGlobbedPaths,
    validateSessionSecret,
  };

  return config;
};

/**
 * Set configuration object
 *
 * Don't replace with export default because they're doing different stuff here
 */
const config = initGlobalConfig();

export default config;
